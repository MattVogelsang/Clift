import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: October 8, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                This Privacy Policy explains how we collect, use, store, and protect your personal information when you use 
                our AI-powered web application (the "Service").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Account Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Email address</li>
                <li>Password (encrypted)</li>
                <li>Account creation date</li>
                <li>Subscription status and tier</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>AI prompts and generated responses</li>
                <li>Number of requests and tokens used</li>
                <li>Timestamps of service usage</li>
                <li>Device and browser information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3 Payment Information</h3>
              <p className="text-gray-700 mb-4">
                Payment information is collected and processed by Stripe, our third-party payment processor. We do NOT store 
                your credit card information on our servers. We only receive a Stripe customer ID for subscription management.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide and maintain the Service</li>
                <li>To process your AI requests and generate responses</li>
                <li>To manage your subscription and billing</li>
                <li>To send service-related notifications</li>
                <li>To improve and optimize the Service</li>
                <li>To prevent fraud and ensure security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Storage with Supabase</h2>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-4">
                <p className="font-bold text-blue-900 mb-2">🔒 Secure Storage:</p>
                <p className="text-blue-900 mb-2">
                  All user data is stored with Supabase, a secure backend-as-a-service platform that provides:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-blue-900">
                  <li>Encryption at rest and in transit</li>
                  <li>PostgreSQL database with row-level security</li>
                  <li>Regular security audits and updates</li>
                  <li>GDPR and SOC 2 compliance</li>
                  <li>Data backups and disaster recovery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
              <h3 className="text-xl font-semibold mb-3">5.1 Stripe (Payment Processing)</h3>
              <p className="text-gray-700 mb-4">
                We use Stripe to process payments. Stripe may collect and process your payment information, billing address, 
                and transaction history. Stripe's use of your data is governed by their Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.2 Supabase (Data Storage)</h3>
              <p className="text-gray-700 mb-4">
                We use Supabase for authentication, database storage, and API hosting. Supabase has access to the data stored 
                in our database but is bound by their own privacy policy and data protection agreements.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.3 AI Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may use OpenAI API or other AI service providers to generate responses. Your prompts may be sent to these 
                services for processing. These providers have their own data retention and usage policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-2">We do NOT sell your personal information. We may share your data only:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>With Stripe for payment processing</li>
                <li>With Supabase for data storage and authentication</li>
                <li>With AI service providers for generating responses</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Encrypted password storage</li>
                <li>Secure authentication with Supabase</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
              </ul>
              <p className="text-gray-700 mt-4">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Cancel your subscription at any time</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us at [your-email@example.com] or use your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your data for as long as your account is active or as needed to provide the Service. 
                If you delete your account, we will delete your personal data within 30 days, except where we are 
                required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                The Service is not intended for users under 18 years of age. We do not knowingly collect personal 
                information from children. If you believe we have collected data from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. International Users</h2>
              <p className="text-gray-700 mb-4">
                Your data may be transferred to and processed in countries other than your own. By using the Service, 
                you consent to the transfer of your data to the United States or other countries where Supabase and our 
                service providers operate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
                "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>[Your Company Name]</strong><br />
                  Email: [your-email@example.com]<br />
                  Address: [Your Business Address]
                </p>
              </div>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                BY USING THIS SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


