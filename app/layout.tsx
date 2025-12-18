import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerLift - Get Hired While You Sleep',
  description: 'AI-powered job search automation that continuously finds and applies to relevant jobs until you\'re hired. Stop applying manually, start getting hired automatically.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FF6B35"/><stop offset="100%" stop-color="%236B5FFF"/></linearGradient></defs><circle cx="20" cy="20" r="18" fill="url(%23g)"/><path d="M20 8 L26 22 L23 22 L23 28 L17 28 L17 22 L14 22 Z" fill="white"/><circle cx="20" cy="16" r="2.5" fill="%23FF6B35"/></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

