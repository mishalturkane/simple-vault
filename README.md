# 🏦 Vault DApp — Solana Learning Project

A **learning-focused Solana Vault DApp** built with **Anchor, Rust, Next.js, and Wallet Adapter**.  
This project demonstrates how to design, deploy, and interact with a secure SOL vault using real-world Solana development patterns.

The goal is simple but powerful:  
**learn Solana by building something real**.

---

## 🚀 Live Demo & Source Code

- 🌐 Live App: https://vault-xdapp.vercel.app/vault  
- ⭐ GitHub Repo: https://github.com/mishalturkane/vault-dapp  

---

## 🧠 What This Project Teaches

This project is designed for developers who want **hands-on Solana experience**, not just theory.

You will learn:
- How Program Derived Addresses (PDAs) work
- How SOL transfers happen inside programs
- Vault-style account ownership patterns
- Anchor-based program architecture
- Wallet integration using Solana Wallet Adapter
- End-to-end flow: frontend → program → chain

---

## 🏗️ Core Vault Features

The Solana program exposes **four core instructions**:

### 1️⃣ initialize_vault
Creates a new vault account owned by the caller.

**Concepts covered**
- PDA creation
- Account initialization
- Ownership assignment

---

### 2️⃣ deposit
Deposits SOL from the user wallet into the vault.

**Concepts covered**
- Lamports transfer
- CPI-safe balance updates
- On-chain accounting

---

### 3️⃣ withdraw
Withdraws SOL from the vault back to the owner.

**Concepts covered**
- Ownership checks
- Balance validation
- Secure fund movement

---

### 4️⃣ close_vault
Closes the vault and returns remaining SOL to the owner.

**Concepts covered**
- Account closing
- Rent reclamation
- State cleanup

---


# simple-vault
