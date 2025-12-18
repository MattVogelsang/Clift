'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: "How does CareerLift work?",
      answer: "CareerLift uses advanced AI algorithms to scan job boards like Indeed, LinkedIn, and Glassdoor 24/7. When it finds jobs matching your profile and preferences, it automatically generates a customized cover letter and submits your application. You can track everything in your dashboard."
    },
    {
      question: "Is using automated job applications legal?",
      answer: "Yes! CareerLift works within the terms of service of all major job boards. We use the same application process as a human would, just faster and more efficiently. You remain fully responsible for the applications sent on your behalf."
    },
    {
      question: "Will employers know I used automation?",
      answer: "No. Your applications look exactly like manual applications. Each cover letter is uniquely generated using AI to match the specific job requirements. Employers see a professional, personalized application."
    },
    {
      question: "What if I don't like a job you applied to?",
      answer: "You have full control! Review jobs before we apply in your dashboard. You can skip jobs you don't want, and we'll learn from your preferences. We also provide daily summaries of where we applied."
    },
    {
      question: "How quickly will I get results?",
      answer: "Most users see responses within 1-2 weeks. On average, our users get hired in 60 days. Results depend on your qualifications, job market, and the number of applications sent."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! Cancel anytime with one click. No long-term contracts. Plus, we offer a 14-day money-back guarantee if you're not satisfied for any reason."
    },
    {
      question: "Do you guarantee I'll get hired?",
      answer: "While we can't guarantee job placement (no one can!), we do guarantee we'll apply to hundreds of relevant jobs on your behalf. Our users have a 15x higher application rate than manual job seekers."
    },
    {
      question: "What job boards do you search?",
      answer: "We search LinkedIn, Indeed, Glassdoor, ZipRecruiter, Monster, CareerBuilder, and dozens of industry-specific job boards. We're constantly adding new sources to maximize your reach."
    },
    {
      question: "How do you match me with jobs?",
      answer: "Our AI analyzes your resume, skills, experience, and preferences. It uses natural language processing to understand job descriptions and match you with positions where you're a strong fit (typically 85%+ match score)."
    },
    {
      question: "What if I need help or have questions?",
      answer: "We're here for you! Professional plan users get priority email support (24-hour response time). Premium users get a dedicated success manager who can help optimize your job search strategy."
    }
  ]

  return (
    <section className="relative py-32 px-6 md:px-8 bg-background-dark border-t border-neutral-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            <span className="text-white">Frequently Asked</span>{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-neutral-300 leading-relaxed">
            Everything you need to know about CareerLift
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-neutral-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-neutral-800/30 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <span className={`text-xl text-primary-400 transform transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ↓
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-5 bg-neutral-900/30 border-t border-neutral-800 animate-fade-in">
                  <p className="text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div id="faq" className="mt-12 text-center p-8 card-premium">
          <h3 className="text-2xl font-bold text-white mb-3">
            <span className="text-white">Still have</span>{' '}
            <span className="text-gradient">questions?</span>
          </h3>
          <p className="text-neutral-300 mb-6">
            Our team is here to help you succeed in your job search
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  )
}

