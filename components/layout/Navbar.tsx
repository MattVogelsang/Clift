'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'
import { Logo } from '@/components/layout/Logo'

export function Navbar() {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#pricing" className="text-neutral-300 hover:text-white transition-colors font-medium text-sm">
              Pricing
            </Link>
            <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors font-medium text-sm">
              Contact
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-neutral-300 hover:text-white transition-colors font-medium text-sm">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-ghost text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-neutral-300 hover:text-white transition-colors font-medium text-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-sm py-2.5 px-6">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link 
                href="/#pricing" 
                className="text-neutral-300 hover:text-white transition-colors font-medium px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-neutral-300 hover:text-white transition-colors font-medium px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-neutral-300 hover:text-white transition-colors font-medium px-2 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-left text-neutral-300 hover:text-white transition-colors font-medium px-2 py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-neutral-300 hover:text-white transition-colors font-medium px-2 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="btn-primary py-2.5 px-6 mx-2 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

