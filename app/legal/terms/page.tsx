import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: October 8, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using our AI-powered web application (the "Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                We provide an AI-powered platform for text generation and analysis. The Service uses artificial intelligence models 
                (including but not limited to OpenAI API or our own AI models) to generate and analyze content based on user inputs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. "AS-IS" Service and No Warranties</h2>
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-yellow-900 mb-2">⚠️ IMPORTANT:</p>
                <ul className="list-disc pl-6 space-y-2 text-yellow-900">
                  <li>The Service is provided "AS-IS" without any warranties, express or implied.</li>
                  <li>AI outputs are not guaranteed to be accurate, complete, or reliable.</li>
                  <li>The Service is NOT intended for legal, medical, or financial advice.</li>
                  <li>You use the Service entirely at your own risk.</li>
                  <li>We do not warrant that the Service will be error-free or uninterrupted.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-red-900 mb-2">LIABILITY CAP:</p>
                <p className="text-red-900">
                  Our total liability to you for any claims arising from or related to the Service is LIMITED TO THE AMOUNT 
                  YOU PAID TO US IN THE LAST 30 DAYS. We are not liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 mb-2">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Service for any illegal purposes</li>
                <li>Generate content that is harmful, abusive, or violates others' rights</li>
                <li>Attempt to reverse engineer or compromise the Service</li>
                <li>Use the Service to generate spam or malicious content</li>
                <li>Rely on AI outputs for critical decisions without independent verification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payments and Subscriptions</h2>
              <p className="text-gray-700 mb-4">
                Payments are processed through Stripe. By subscribing, you authorize us to charge your payment method 
                on a recurring basis. Stripe charges 2.9% + 30¢ per transaction. You can cancel your subscription at any time 
                through your account settings or Stripe customer portal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you input into the Service. AI-generated outputs are provided for your use, 
                but we make no warranties regarding their originality or freedom from third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Data Storage and Privacy</h2>
              <p className="text-gray-700 mb-4">
                User data is stored with Supabase, a third-party backend service. Your use of the Service is also governed 
                by our Privacy Policy. We store your email, account information, and usage data securely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your access to the Service at any time, with or without cause, 
                with or without notice. You may terminate your account at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Business Structure</h2>
              <p className="text-gray-700 mb-4">
                This Service is operated by [Your Company Name] as an LLC (or sole proprietorship if not yet formed). 
                The LLC structure provides separation of personal and business liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the Service constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms, please contact us at: [your-email@example.com]
              </p>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                BY USING THIS SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


