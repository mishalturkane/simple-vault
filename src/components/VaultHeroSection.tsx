import React from 'react';
import { FiGithub, FiExternalLink, FiUsers, FiCode, FiLock, FiDollarSign, FiShield, FiBookOpen } from 'react-icons/fi';
import { SiSolana } from 'react-icons/si';

const VaultHeroSection = () => {
  // Mock data for stats
  const vaultStats = {
    totalVaults: 1289,
    totalSOL: 4520,
    activeUsers: 856,
    transactions: 12450
  };

  const vaultFunctions = [
    {
      name: "initialize_vault",
      description: "Creates a new vault with owner address",
      params: "owner: Pubkey",
      returns: "VaultAccount"
    },
    {
      name: "deposit",
      description: "Deposit SOL into existing vault",
      params: "vault_id: Pubkey, amount: u64",
      returns: "TransactionResult"
    },
    {
      name: "withdraw",
      description: "Withdraw SOL from vault with checks",
      params: "vault_id: Pubkey, amount: u64",
      returns: "TransactionResult"
    },
    {
      name: "close_vault",
      description: "Closes vault and returns remaining SOL",
      params: "vault_id: Pubkey",
      returns: "TransactionResult"
    }
  ];

  const learningPath = [
    "Clone the repository and set up local environment",
    "Study the Solana smart contract structure in Anchor",
    "Deploy the contract to Solana devnet",
    "Build the frontend integration with wallet adapter",
    "Test all four functions locally",
    "Deploy your own version and customize features"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      
      {/* Main Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                <SiSolana className="mr-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Solana Decentralized Application
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Master Solana Development with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Vault DApp
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                A comprehensive learning-focused vault application on Solana blockchain. 
                Perfect for developers starting their Web3 journey. Deploy, test, and 
                understand real-world Solana smart contracts.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-black dark:text-white">{vaultStats.totalVaults.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vaults Created</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-black dark:text-white">{vaultStats.totalSOL} SOL</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Value Locked</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-black dark:text-white">{vaultStats.activeUsers}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Developers</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-black dark:text-white">{vaultStats.transactions.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Transactions</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/mishalturkane/vault-dapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <FiGithub /> View GitHub
                </a>
                <a 
                  href="https://vault-xdapp.vercel.app/vault" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <FiExternalLink /> Launch Vault DApp
                </a>
                <a 
                  href="#how-it-works" 
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <FiBookOpen /> Learn More
                </a>
              </div>
            </div>
            
            {/* Right Content - Code Preview */}
            <div className="lg:w-1/2">
              <div className="bg-gray-900 dark:bg-black rounded-2xl p-6 border border-gray-800 dark:border-gray-700 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400">vault_dapp.rs</div>
                </div>
                
                <pre className="text-sm font-mono overflow-x-auto text-gray-300">
                  <code>
{`// Solana Vault Smart Contract
pub mod vault_dapp {
    use anchor_lang::prelude::*;
    
    // Initialize a new vault
    pub fn initialize_vault(ctx: Context<Initialize>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.owner = ctx.accounts.user.key();
        vault.balance = 0;
        vault.is_active = true;
        Ok(())
    }
    
    // Deposit SOL into vault
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        // Transfer logic
        **ctx.accounts.vault.to_account_info().try_borrow_mut_lamports()? += amount;
        **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? -= amount;
        Ok(())
    }
    
    // Withdraw from vault
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        require!(vault.balance >= amount, ErrorCode::InsufficientFunds);
        // Withdraw logic
        Ok(())
    }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Vault DApp Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A step-by-step guide to understanding the complete flow of the Solana Vault DApp
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <FiLock className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Initialize Vault</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a secure vault on Solana blockchain with your wallet address as owner.
                Each vault gets a unique PDA address.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <FiDollarSign className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Deposit SOL</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transfer SOL from your wallet to the vault. All deposits are recorded on-chain
                with transaction signatures.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <FiShield className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Withdraw Assets</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Securely withdraw SOL from your vault. Smart contract validates ownership
                and balance before processing.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <FiCode className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. Close Vault</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Finalize and close your vault. All remaining SOL is returned to the owner
                and vault state is cleared.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Complete Architecture Flow</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h4 className="font-bold mb-2">Frontend (Next.js + React)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    User interface built with TypeScript, Tailwind CSS, and @solana/web3.js.
                    Integrates with Phantom wallet using wallet adapter.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h4 className="font-bold mb-2">Smart Contract (Anchor + Rust)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Solana program written in Rust using Anchor framework.
                    Handles vault logic, ownership checks, and SOL transfers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h4 className="font-bold mb-2">Testing (Mocha + Chai)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive test suite for smart contract functions.
                    Tests deployment, initialization, deposits, withdrawals, and edge cases.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <div>
                  <h4 className="font-bold mb-2">Backend Services</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Optional backend for advanced features like transaction history,
                    analytics, and real-time updates via Solana RPC nodes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Learning Path Section */}
      <section className="px-4 py-16 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Path for Developers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow this structured path to master Solana development using this Vault DApp
            </p>
          </div>
          
          <div className="grid md:grid-cols-2  gap-12 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Step-by-Step Guide</h3>
              <div className="space-y-6">
                {learningPath.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Who's Using Vault DApp?</h3>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <div className="flex items-center mb-4">
                    <FiUsers className="text-2xl text-purple-600 dark:text-purple-400 mr-3" />
                    <h4 className="text-xl font-bold">Web3 Bootcamp Students</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Over 500+ students from various Web3 bootcamps use this project as 
                    their first hands-on Solana development experience.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <div className="flex items-center mb-4">
                    <FiCode className="text-2xl text-blue-600 dark:text-blue-400 mr-3" />
                    <h4 className="text-xl font-bold">Solana Hackathon Teams</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Multiple hackathon teams have forked and extended this codebase to 
                    build their own DeFi applications on Solana.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                  <div className="flex items-center mb-4">
                    <FiBookOpen className="text-2xl text-green-600 dark:text-green-400 mr-3" />
                    <h4 className="text-xl font-bold">University Courses</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Blockchain courses at universities worldwide use this project as 
                    practical coursework for teaching smart contract development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
         {/* Technology Stack - Clean Design */}
<div className="mt-12">
  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Built With</h3>
  <div className="flex flex-wrap justify-center gap-3">
    {[
      { name: "Solana", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" },
      { name: "Anchor", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" },
      { name: "Next.js", color: "bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-300" },
      { name: "React", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300" },
      { name: "TypeScript", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" },
      { name: "Tailwind", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300" },
      { name: "Rust", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
      { name: "Mocha", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
      { name: "Chai", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
      { name: "Web3.js", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" },
      { name: "Wallet Adapter", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
      { name: "Vercel", color: "bg-gray-200 dark:bg-gray-700/30 text-gray-800 dark:text-gray-300" },
    ].map((tech, index) => (
      <div 
        key={index} 
        className={`${tech.color} px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-current transition-colors`}
      >
        {tech.name}
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Solana Development Journey Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of developers who learned Solana by building this practical Vault DApp
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/mishalturkane/vault-dapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FiGithub className="text-xl" /> 
              <span className="text-lg">Star on GitHub</span>
            </a>
            <a 
              href="https://vault-xdapp.vercel.app/vault" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FiExternalLink className="text-xl" />
              <span className="text-lg">Try Live Demo</span>
            </a>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg">
              Read Documentation
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h4 className="font-bold text-lg mb-2">Project Statistics</h4>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold">{vaultStats.activeUsers}+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Open Source</div>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h4 className="font-bold text-lg mb-2">Perfect For</h4>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li>• Solana Beginners</li>
                  <li>• Web3 Bootcamp Projects</li>
                  <li>• Smart Contract Learning</li>
                  <li>• Portfolio Projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VaultHeroSection;