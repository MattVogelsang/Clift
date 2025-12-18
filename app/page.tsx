import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { PricingSection } from '@/components/marketing/PricingSection'
import { Testimonials } from '@/components/marketing/Testimonials'
import { ComparisonTable } from '@/components/marketing/ComparisonTable'
import { FAQ } from '@/components/marketing/FAQ'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar />
      
      {/* Hero Section - Premium Design with Gradients */}
      <section className="relative pt-32 pb-32 px-6 md:px-8 overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-purple-950/30 to-background-dark pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-block mb-8 animate-slide-down">
              <span className="badge-primary text-sm font-semibold tracking-wide uppercase px-5 py-2.5">
                AI-Powered Job Search Automation
              </span>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="mb-8 leading-[1.1] animate-slide-up">
              <span className="block text-white mb-2">Stop Applying.</span>
              <span className="block text-gradient">Start Getting Hired.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-2xl md:text-3xl text-neutral-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Our AI continuously finds and applies to relevant job openings for you, 24/7. 
              Wake up to job applications sent instead of endless manual work.
            </p>
            
            <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Upload your resume, set your preferences, and let AI do the work. 
              We'll apply to hundreds of jobs while you focus on your career goals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/signup" className="btn-primary text-lg">
                Start Your Job Search
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-lg">
                How It Works
              </Link>
            </div>
            
            {/* Premium Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="card-glass group">
                <div className="text-5xl font-bold text-gradient-primary mb-2">10K+</div>
                <p className="text-neutral-400 text-sm font-medium">Applications Sent</p>
              </div>
              <div className="card-glass group">
                <div className="text-5xl font-bold text-gradient-primary mb-2">2.5K+</div>
                <p className="text-neutral-400 text-sm font-medium">Users Hired</p>
              </div>
              <div className="card-glass group">
                <div className="text-5xl font-bold text-gradient-primary mb-2">92%</div>
                <p className="text-neutral-400 text-sm font-medium">Match Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Premium Grid */}
      <section id="how-it-works" className="relative py-32 px-6 md:px-8 bg-gradient-to-b from-background-dark to-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              <span className="text-white">How It</span>{' '}
              <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Four simple steps to automate your job search and land your next role
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="card-premium text-center group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="badge-primary mb-4">STEP 1</div>
              <h3 className="text-xl font-bold text-white mb-4">Upload Your Resume</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our AI instantly extracts your skills, experience, and qualifications to create your profile.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-premium text-center group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div className="badge-primary mb-4">STEP 2</div>
              <h3 className="text-xl font-bold text-white mb-4">Set Your Preferences</h3>
              <p className="text-neutral-400 leading-relaxed">
                Define your ideal role, salary range, location, and target industries in minutes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card-premium text-center group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="badge-primary mb-4">STEP 3</div>
              <h3 className="text-xl font-bold text-white mb-4">AI Applies Automatically</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our system continuously scans job boards and submits tailored applications 24/7.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card-premium text-center group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="badge-primary mb-4">STEP 4</div>
              <h3 className="text-xl font-bold text-white mb-4">Land Your Role</h3>
              <p className="text-neutral-400 leading-relaxed">
                Get instant notifications for responses and track all your applications in one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Premium Grid */}
      <section className="relative py-32 px-6 md:px-8 bg-background-dark border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              <span className="text-white">Everything You Need to</span>{' '}
              <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Powerful automation tools designed to accelerate your job search
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligent Job Matching</h3>
              <p className="text-neutral-400 leading-relaxed">
                Advanced AI algorithms analyze your profile and match you with positions that align perfectly with your skills and career goals.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Cover Letters</h3>
              <p className="text-neutral-400 leading-relaxed">
                Every application includes a tailored cover letter, professionally written and optimized for each specific role and company.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Round-the-Clock Automation</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our platform works 24/7, applying to new postings within minutes and ensuring you never miss an opportunity.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Comprehensive Tracking</h3>
              <p className="text-neutral-400 leading-relaxed">
                Monitor all applications in a unified dashboard with real-time status updates and response tracking.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Notifications</h3>
              <p className="text-neutral-400 leading-relaxed">
                Receive timely email updates with new job matches and application statuses, keeping you informed without overwhelming you.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="card-premium group">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Platform Coverage</h3>
              <p className="text-neutral-400 leading-relaxed">
                Access opportunities across Indeed, LinkedIn, Glassdoor, and dozens of other job boards from a single, unified platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium Cards */}
      <section className="relative py-32 px-6 md:px-8 bg-gradient-to-b from-neutral-900 to-background-dark border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              <span className="text-white">Why CareerLift</span>{' '}
              <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Our users get hired 3x faster than traditional job seekers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card-premium text-center group">
              <div className="text-6xl font-bold mb-3 text-gradient-primary">200+</div>
              <p className="text-neutral-400 font-medium">Applications per month per user</p>
            </div>
            <div className="card-premium text-center group">
              <div className="text-6xl font-bold mb-3 text-gradient-primary">15x</div>
              <p className="text-neutral-400 font-medium">More applications than manual search</p>
            </div>
            <div className="card-premium text-center group">
              <div className="text-6xl font-bold mb-3 text-gradient-primary">60 days</div>
              <p className="text-neutral-400 font-medium">Average time to job offer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 px-6 md:px-8 bg-background-dark border-t border-neutral-800">
        <PricingSection />
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Disclaimer Section */}
      <section className="py-12 px-6 md:px-8 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-neutral-200 mb-3 text-center">⚠️ Important Disclaimer</h3>
          <p className="text-sm text-neutral-400 text-center leading-relaxed">
            CareerLift is an automated job application service. While we strive for accuracy, 
            we cannot guarantee job placement or responses. You are responsible for 
            reviewing applications submitted on your behalf. Results may vary based on your 
            qualifications, job market conditions, and other factors. This service automates 
            applications but does not guarantee employment outcomes.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-8 bg-gradient-to-b from-background-dark to-neutral-900 border-t border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="mb-6">
            <span className="text-white">Ready to Land Your</span>{' '}
            <span className="text-gradient">Dream Job?</span>
          </h2>
          <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
            Join thousands of job seekers who've automated their way to success
          </p>
          <Link href="/signup" className="btn-primary text-lg inline-block">
            Get Started Today
          </Link>
          <p className="text-neutral-400 text-sm mt-6">
            Money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
