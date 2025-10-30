'use client'

import { useState } from 'react'

import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  rating: number
  text: string
  result: string
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechVision Solutions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "CareerLift changed my life! I was manually applying to 5-10 jobs per day. With CareerLift, I had 150+ applications out in the first week. Got multiple responses and landed my dream job!",
      result: "Hired in 18 days"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "CloudScale Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "The AI matching is incredibly accurate. Every job it applied to was actually relevant to my skills. No more wasting time on irrelevant positions. Got 3 offers and negotiated a 40% salary increase!",
      result: "3 job offers"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "UX Designer",
      company: "Design Studio Pro",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "As a career switcher, I was struggling to get responses. CareerLift's cover letter generation highlighted my transferable skills perfectly. Within 3 weeks, I had multiple responses!",
      result: "Career change success"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Data Scientist",
      company: "DataWorks Analytics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "I was skeptical about automation, but this works! The quality of applications was high, and the tracking dashboard kept me organized. Landed a Senior Data Scientist role in less than a month.",
      result: "Senior position in 60 days"
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "GrowthPath Marketing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "The time I saved with CareerLift allowed me to focus on my career goals instead of endless applications. The ROI was incredible - $79/month for a $95k salary increase!",
      result: "$95k salary increase"
    },
    {
      id: 6,
      name: "Alex Turner",
      role: "Full Stack Developer",
      company: "Innovate Labs",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      text: "Best investment in my career! Applied to 200+ jobs automatically while I was sleeping. Woke up to job applications sent. The success rate was way higher than manual applications.",
      result: "200+ applications sent"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Trusted by 10,000+ Job Seekers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real People. Real Results.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who landed their dream jobs with CareerLift
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
                <div className="text-green-800 font-bold text-center">
                  ✓ {testimonial.result}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600 font-semibold">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">92%</div>
            <div className="text-sm text-gray-600">Average Match Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3x</div>
            <div className="text-sm text-gray-600">Faster Application Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💼</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2,500+</div>
            <div className="text-sm text-gray-600">People Hired</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⭐</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
            <div className="text-sm text-gray-600">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

