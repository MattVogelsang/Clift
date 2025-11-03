import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By creating an account, purchasing a subscription, or otherwise using any services from CareerLift ("we," "us," or "Company"), 
                you agree to these Terms of Service (the "Terms"). If you do not agree, do not use the services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Our Service; No Employment Guarantee</h2>
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-yellow-900 mb-2">⚠️ IMPORTANT:</p>
                <p className="text-yellow-900 mb-2">
                  We provide career-assistance services (resume review, AI job-matching, coaching, templates, and related tools). 
                  <strong> We do not guarantee job placement, interviews, offers, or salaries.</strong> All examples are illustrative only.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payment and Refunds</h2>
              <p className="text-gray-700 mb-4">
                All fees are non-refundable except as expressly stated in our Refund Policy. Promotional or trial offers are subject to their 
                specific terms. Payments are processed through Stripe. By subscribing, you authorize us to charge your payment method on a recurring 
                basis. You can cancel your subscription at any time through your account settings or Stripe customer portal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 mb-2">You represent that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>All information you provide is accurate and lawful</li>
                <li>You will not upload defamatory, fraudulent, or illegal content</li>
                <li>You will use the services responsibly</li>
                <li>You will not use the Service for any illegal purposes</li>
                <li>You will not attempt to reverse engineer or compromise the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability (6-Month Cap)</h2>
              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-red-900 mb-2">⚠️ READ CAREFULLY:</p>
                <p className="text-red-900 mb-4">
                  To the fullest extent permitted by law:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-red-900">
                  <li>
                    Our total liability for any claim arising from the services shall not exceed the total amount of fees you actually paid 
                    to the Company in the <strong>six (6) months</strong> immediately preceding the event giving rise to the claim.
                  </li>
                  <li>
                    <strong>IN NO EVENT WILL THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY 
                    DAMAGES</strong> (INCLUDING LOSS OF PROFITS, BUSINESS, GOODWILL, OR DATA), EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </li>
                </ol>
                <p className="text-red-900 mt-4 text-sm">
                  Some jurisdictions do not allow limitations on liability for gross negligence, willful misconduct, or fraud; nothing here limits 
                  liability that cannot lawfully be limited.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Release and Waiver</h2>
              <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-orange-900 mb-2">RELEASE OF CLAIMS:</p>
                <p className="text-orange-900">
                  By paying for and using our services, you release the Company and its affiliates from any claims to the maximum extent permitted 
                  by law. This release does not apply to claims arising from the Company's intentional misconduct or gross negligence where 
                  prohibited by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Dispute Resolution; Arbitration and Class Waiver</h2>
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-blue-900 mb-2">ARBITRATION AGREEMENT:</p>
                <p className="text-blue-900 mb-2">
                  Any dispute arising out of or relating to these Terms will be resolved by final and binding arbitration under the rules of the 
                  American Arbitration Association (AAA). Either party may seek interim injunctive relief in a Florida court of competent jurisdiction.
                </p>
                <p className="text-blue-900 mb-2">
                  You and the Company waive any right to participate in a class action, class arbitration, or representative action.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to defend, indemnify, and hold harmless the Company, its officers, employees, and agents from any claims or losses 
                arising from your breach of these Terms or misuse of the services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Governing Law and Jurisdiction (Florida Worldwide)</h2>
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-4">
                <p className="font-bold text-green-900 mb-2">JURISDICTION:</p>
                <p className="text-green-900 mb-2">
                  These Terms are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to 
                  its conflict of law principles. Any dispute not subject to arbitration shall be resolved exclusively in the state or federal 
                  courts located in Broward County, Florida, and you consent to those courts' jurisdiction.
                </p>
                <p className="text-green-900 text-sm mt-2">
                  If you access our services from outside the United States, you do so at your own risk and are responsible for complying with 
                  local laws. Nothing in these Terms limits any consumer-protection rights that cannot be waived by contract under the laws of 
                  your country of residence.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these Terms from time to time. Continued use after any update constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
              <p className="text-gray-700 mb-4">
                Questions about these Terms? Email us at:{' '}
                <a href="mailto:legal@careerlift.ai" className="text-primary-600 hover:text-primary-700 font-semibold">legal@careerlift.ai</a>
              </p>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                BY USING THIS SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE, INCLUDING 
                THE LIMITATION OF LIABILITY (6-MONTH CAP), RELEASE, AND ARBITRATION PROVISIONS SET FORTH ABOVE.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                These Terms include important limitations on our liability and your right to sue. Please read them carefully before using the Service.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


