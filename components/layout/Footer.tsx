import Link from 'next/link'
import { Logo } from '@/components/layout/Logo'

export function Footer() {
  return (
    <footer className="bg-neutral-900/50 backdrop-blur-sm border-t border-neutral-800/50 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <Logo variant="white" />
            </div>
            <p className="text-neutral-400 leading-relaxed">
              AI-powered job search automation. Apply to hundreds of jobs automatically.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Product</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="/#pricing" className="hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors text-sm">Dashboard</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors text-sm">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="/about" className="hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors text-sm">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="/legal/terms" className="hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800/50 pt-8 text-center text-neutral-500 text-sm">
          <p>&copy; 2025 CareerLift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

