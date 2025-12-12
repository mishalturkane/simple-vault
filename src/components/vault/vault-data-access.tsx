'use client'

import { getVaultProgram, getVaultProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../use-transaction-toast'
import { toast } from 'sonner'
import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'

// Simple types - no complex Idl definition needed
type VaultStateAccount = {
  vaultBump: number;
  stateBump: number;
};

type AnchorError = {
  message: string;
  logs?: string[];
  txid?: string;
};

type SolanaError = Error & {
  logs?: string[];
  txid?: string;
};

export function useVaultProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const queryClient = useQueryClient()
  
  const programId = useMemo(() => new PublicKey(getVaultProgramId(cluster.network as Cluster)), [cluster])
  const program = useMemo(() => getVaultProgram(provider, programId), [provider, programId])

  // PDA helper function
  const getVaultPDA = (userPublicKey: PublicKey) => {
    const [vaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), userPublicKey.toBuffer()],
      programId
    )
    return vaultPDA
  }

  const getVaultStatePDA = (userPublicKey: PublicKey) => {
    const [vaultStatePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("state"), userPublicKey.toBuffer()],
      programId
    )
    return vaultStatePDA
  }

  // Get program account
  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  // Get user's vault account
  const getVaultAccount = useQuery({
    queryKey: ['vault-account', { cluster, user: provider.wallet.publicKey?.toString() }],
    queryFn: async () => {
      if (!provider.wallet.publicKey) return null
      
      const vaultPDA = getVaultPDA(provider.wallet.publicKey)
      const vaultStatePDA = getVaultStatePDA(provider.wallet.publicKey)
      
      try {
        // Check vault_state account
        let vaultStateAccount: VaultStateAccount | null = null
        try {
          const accountData = await (program.account as any).vaultState.fetch(vaultStatePDA)
          vaultStateAccount = {
            vaultBump: accountData.vaultBump ?? accountData.vault_bump,
            stateBump: accountData.stateBump ?? accountData.state_bump
          }
        } catch {
          vaultStateAccount = null
        }
        
        // Check vault account balance
        const vaultAccountInfo = await connection.getAccountInfo(vaultPDA)
        const balance = vaultAccountInfo ? vaultAccountInfo.lamports / LAMPORTS_PER_SOL : 0
        
        // Vault exists if vault_state account exists
        const vaultExists = vaultStateAccount !== null
        
        return {
          vaultPDA,
          vaultStatePDA,
          vaultAccount: vaultAccountInfo,
          vaultStateAccount,
          balance,
          vaultExists
        }
      } catch (error) {
        console.error('Error fetching vault:', error)
        return null
      }
    },
    enabled: !!provider.wallet.publicKey,
    refetchInterval: 2000,
    retry: 2,
  })

  // Initialize vault
  const initializeVault = useMutation({
    mutationKey: ['vault', 'initialize', { cluster }],
    mutationFn: async () => {
      if (!provider.wallet.publicKey) throw new Error("Wallet not connected")
      
      const vaultPDA = getVaultPDA(provider.wallet.publicKey)
      const vaultStatePDA = getVaultStatePDA(provider.wallet.publicKey)
      
      // Create accounts object
      const accounts = {
        user: provider.wallet.publicKey,
        vault_state: vaultStatePDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      }
      
      // Use program methods with type assertion
      const tx = await (program.methods as any)
        .initialize()
        .accounts(accounts)
        .rpc()
      
      return tx as string
    },
    onSuccess: async (signature: string) => {
      transactionToast(signature)
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')
      
      // Force refetch
      setTimeout(() => {
        queryClient.invalidateQueries({ 
          queryKey: ['vault-account', { cluster, user: provider.wallet.publicKey?.toString() }] 
        })
      }, 1500)
      
      toast.success("Vault initialized successfully! 🎉")
    },
    onError: (error: Error | AnchorError | SolanaError) => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Failed to initialize vault: ${errorMessage}`)
      console.error('Initialize error:', error)
    },
  })

  // Deposit to vault
  const depositToVault = useMutation({
    mutationKey: ['vault', 'deposit', { cluster }],
    mutationFn: async (amount: number) => {
      if (!provider.wallet.publicKey) throw new Error("Wallet not connected")
      
      const vaultPDA = getVaultPDA(provider.wallet.publicKey)
      const vaultStatePDA = getVaultStatePDA(provider.wallet.publicKey)
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL)
      
      const accounts = {
        user: provider.wallet.publicKey,
        vault_state: vaultStatePDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      }
      
      const tx = await (program.methods as any)
        .deposit(new anchor.BN(lamports))
        .accounts(accounts)
        .rpc()
      
      return tx as string
    },
    onSuccess: async (signature: string) => {
      transactionToast(signature)
      await connection.confirmTransaction(signature, 'confirmed')
      
      setTimeout(() => {
        queryClient.invalidateQueries({ 
          queryKey: ['vault-account', { cluster, user: provider.wallet.publicKey?.toString() }] 
        })
      }, 1500)
      
      toast.success("Deposit successful! 💰")
    },
    onError: (error: Error | AnchorError | SolanaError) => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Failed to deposit: ${errorMessage}`)
    },
  })

  // Withdraw from vault
  const withdrawFromVault = useMutation({
    mutationKey: ['vault', 'withdraw', { cluster }],
    mutationFn: async (amount: number) => {
      if (!provider.wallet.publicKey) throw new Error("Wallet not connected")
      
      const vaultPDA = getVaultPDA(provider.wallet.publicKey)
      const vaultStatePDA = getVaultStatePDA(provider.wallet.publicKey)
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL)
      
      const accounts = {
        user: provider.wallet.publicKey,
        vault_state: vaultStatePDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      }
      
      const tx = await (program.methods as any)
        .withdraw(new anchor.BN(lamports))
        .accounts(accounts)
        .rpc()
      
      return tx as string
    },
    onSuccess: async (signature: string) => {
      transactionToast(signature)
      await connection.confirmTransaction(signature, 'confirmed')
      
      setTimeout(() => {
        queryClient.invalidateQueries({ 
          queryKey: ['vault-account', { cluster, user: provider.wallet.publicKey?.toString() }] 
        })
      }, 1500)
      
      toast.success("Withdrawal successful! 💸")
    },
    onError: (error: Error | AnchorError | SolanaError) => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Failed to withdraw: ${errorMessage}`)
    },
  })

  // Close vault
  const closeVault = useMutation({
    mutationKey: ['vault', 'close', { cluster }],
    mutationFn: async () => {
      if (!provider.wallet.publicKey) throw new Error("Wallet not connected")
      
      const vaultPDA = getVaultPDA(provider.wallet.publicKey)
      const vaultStatePDA = getVaultStatePDA(provider.wallet.publicKey)
      
      const accounts = {
        user: provider.wallet.publicKey,
        vault_state: vaultStatePDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      }
      
      const tx = await (program.methods as any)
        .close()
        .accounts(accounts)
        .rpc()
      
      return tx as string
    },
    onSuccess: async (signature: string) => {
      transactionToast(signature)
      await connection.confirmTransaction(signature, 'confirmed')
      
      setTimeout(() => {
        queryClient.invalidateQueries({ 
          queryKey: ['vault-account', { cluster, user: provider.wallet.publicKey?.toString() }] 
        })
      }, 1500)
      
      toast.success("Vault closed successfully! 🔒")
    },
    onError: (error: Error | AnchorError | SolanaError) => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Failed to close vault: ${errorMessage}`)
    },
  })

  return {
    program,
    programId,
    getProgramAccount,
    getVaultAccount,
    initializeVault,
    depositToVault,
    withdrawFromVault,
    closeVault,
    getVaultPDA,
    getVaultStatePDA,
  }
}