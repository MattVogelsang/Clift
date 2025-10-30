import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              We're on a Mission to
              <span className="block bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mt-2">
                Transform Job Searching Forever
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              CareerLift was born from a simple frustration: job searching is broken. 
              We're fixing it with AI automation that works while you sleep.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                In 2024, our founder spent 6 months searching for a job after a layoff. Despite having 
                15 years of experience, the endless cycle of applications felt like a full-time job itself. 
                After manually applying to over 300 positions and getting only a handful of responses, 
                they realized something had to change.
              </p>
              
              <p>
                That's when CareerLift was born. We asked a simple question: 
                <strong> "What if AI could do the tedious work of applying to jobs, 
                so talented people could focus on their career goals?"</strong>
              </p>
              
              <p>
                Today, CareerLift has helped over 2,500 professionals land their dream jobs. 
                We've automated over 10,000 applications and counting, saving our users thousands 
                of hours they can invest in what really matters: advancing their careers 
                and negotiating better offers.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Speed & Efficiency</h3>
                <p className="text-gray-600">
                  We believe your time is valuable. Our automation works 24/7 so you can 
                  focus on what humans do best: building relationships and showcasing your skills.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency & Trust</h3>
                <p className="text-gray-600">
                  Every application we send is visible in your dashboard. You have full control 
                  and can review, approve, or skip any job match. No hidden actions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Over Quantity</h3>
                <p className="text-gray-600">
                  We don't spam applications. Our AI carefully matches you with relevant positions 
                  where you're a strong fit, maximizing your response rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  10,000+
                </div>
                <p className="text-gray-600">Applications Automated</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  2,500+
                </div>
                <p className="text-gray-600">People Hired</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  92%
                </div>
                <p className="text-gray-600">Match Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  60 Days
                </div>
                <p className="text-gray-600">Avg. Time to Hire</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              We use cutting-edge technology to deliver the best job search experience
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Matching Engine</h3>
                <p className="text-gray-600">
                  Our proprietary algorithms analyze thousands of data points to match you with 
                  jobs where you'll excel, not just jobs that contain your keywords.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Language Processing</h3>
                <p className="text-gray-600">
                  Advanced NLP understands job descriptions and your resume like a human recruiter, 
                  ensuring perfect alignment between your skills and role requirements.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Intelligent Automation</h3>
                <p className="text-gray-600">
                  Smart automation that adapts to different job board formats, handles complex 
                  application forms, and personalizes every submission.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Compliant</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with Supabase, encrypted data storage, and full 
                  compliance with privacy regulations and job board policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who've automated their way to success
            </p>
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 inline-block">
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}


