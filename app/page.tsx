import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { PricingSection } from '@/components/PricingSection'
import { Testimonials } from '@/components/Testimonials'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section with Animated Light Background */}
      <section className="pt-20 pb-32 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, rgba(107,95,255,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-orange-100 to-purple-100 text-transparent bg-clip-text">
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🚀 AI-Powered Job Search Automation
                </span>
              </span>
            </div>
            
            <div className="mb-4 animate-pulse">
              <span className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Get Hired While You Sleep
              </span>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Applying.
              <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 bg-clip-text text-transparent mt-2 animate-gradient">
                Start Getting Hired.
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Our AI continuously finds and applies to relevant job openings for you, 24/7. 
              Wake up to job applications sent instead of endless manual work.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your resume, set your preferences, and let AI do the work. 
              We'll apply to hundreds of jobs while you focus on your career goals.
            </p>
            
            <div className="flex gap-4 justify-center mb-12">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                Start Your Job Search
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                How It Works
              </Link>
            </div>
            
            {/* Social Proof with Cards */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow">
                <span className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent block">10K+</span>
                <p className="text-gray-600 text-sm">Applications Sent</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow">
                <span className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent block">2.5K+</span>
                <p className="text-gray-600 text-sm">Users Hired</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow">
                <span className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent block">92%</span>
                <p className="text-gray-600 text-sm">Match Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to automate your job search and land your next role
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-orange-600 mb-2">STEP 1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Resume</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI instantly extracts your skills, experience, and qualifications to create your profile.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-orange-500 to-purple-600 opacity-20"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-purple-600 mb-2">STEP 2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Set Your Preferences</h3>
                <p className="text-gray-600 leading-relaxed">
                  Define your ideal role, salary range, location, and target industries in minutes.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-orange-500 to-purple-600 opacity-20"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-orange-600 mb-2">STEP 3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Applies Automatically</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our system continuously scans job boards and submits tailored applications 24/7.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-orange-500 to-purple-600 opacity-20"></div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-purple-600 mb-2">STEP 4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Land Your Role</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant notifications for responses and track all your applications in one dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful automation tools designed to accelerate your job search
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Intelligent Job Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI algorithms analyze your profile and match you with positions that align perfectly with your skills and career goals.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Cover Letters</h3>
              <p className="text-gray-600 leading-relaxed">
                Every application includes a tailored cover letter, professionally written and optimized for each specific role and company.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Round-the-Clock Automation</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform works 24/7, applying to new postings within minutes and ensuring you never miss an opportunity.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor all applications in a unified dashboard with real-time status updates and response tracking.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive timely email updates with new job matches and application statuses, keeping you informed without overwhelming you.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Platform Coverage</h3>
              <p className="text-gray-600 leading-relaxed">
                Access opportunities across Indeed, LinkedIn, Glassdoor, and dozens of other job boards from a single, unified platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Background */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-orange-500 via-primary-600 to-purple-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Circles */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white opacity-30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-white opacity-30 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-white opacity-30 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
          
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Why CareerLift Works
          </h2>
          <p className="text-center text-white/90 mb-16 max-w-2xl mx-auto text-xl">
            Our users get hired 3x faster than traditional job seekers
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <div className="text-6xl font-bold mb-2 text-white">200+</div>
              <p className="text-white/90 text-lg">Applications per month per user</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <div className="text-6xl font-bold mb-2 text-white">15x</div>
              <p className="text-white/90 text-lg">More applications than manual search</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <div className="text-6xl font-bold mb-2 text-white">60 days</div>
              <p className="text-white/90 text-lg">Average time to job offer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <PricingSection />
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Disclaimer Section */}
      <section className="py-12 px-4 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-yellow-900 mb-3 text-center">⚠️ Important Disclaimer</h3>
          <p className="text-sm text-yellow-800 text-center">
            CareerLift is an automated job application service. While we strive for accuracy, 
            we cannot guarantee job placement or responses. You are responsible for 
            reviewing applications submitted on your behalf. Results may vary based on your 
            qualifications, job market conditions, and other factors. This service automates 
            applications but does not guarantee employment outcomes.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of job seekers who've automated their way to success
          </p>
          <Link href="/signup" className="inline-block bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Get Started Today
          </Link>
          <p className="text-primary-100 text-sm mt-4">
            Money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
