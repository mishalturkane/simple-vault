import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import React from 'react'

import { Space_Grotesk } from 'next/font/google'

// 2. Configure the font
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap', // Best practice for font loading
  variable: '--font-space-grotesk', // Optional: for CSS variable usage
})



export const metadata = {
  title: "vault dapp",
  description: "Secure your digital assets with Vault Daap - the ultimate decentralized application for managing and protecting your cryptocurrency holdings.",
  openGraph: {
    title: "vault dapp",
    description: "Secure your digital assets with Vault Daap - the ultimate decentralized application for managing and protecting your cryptocurrency holdings.",
    url: "https://vault.mishalturkane.xyz",
    siteName: "Vault Daap",
    images: [
      {
        url: "https://vault.mishalturkane.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio OG Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mishal Turkane | Portfolio",
    description: "This is my personal portfolio site.",
    images: ["https://vault.mishalturkane.xyz/og-image.png"],
  },
};

const links: { label: string; path: string }[] = [
  // More links...
  { label: 'Home', path: '/' },
  { label: 'Account', path: '/account' },
  { label: 'Vault', path: '/vault' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body className={`${spaceGrotesk.className} antialiased`}>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
