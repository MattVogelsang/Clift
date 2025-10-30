import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-gray-400">
              AI-powered job search automation. Apply to hundreds of jobs automatically.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CareerLift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

