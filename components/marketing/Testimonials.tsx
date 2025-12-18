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
    <section className="relative py-32 px-6 md:px-8 bg-gradient-to-b from-neutral-900 to-background-dark border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="badge-primary text-sm font-semibold">
              ⭐ Trusted by 10,000+ Job Seekers
            </span>
          </div>
          <h2 className="mb-4">
            <span className="text-white">Real People.</span>{' '}
            <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who landed their dream jobs with CareerLift
          </p>
        </div>

        {/* Premium Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="card-premium group"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent-gold text-lg">⭐</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="bg-gradient-primary/10 border border-primary-500/30 rounded-xl p-3 mb-5">
                <div className="text-primary-400 font-bold text-center text-sm">
                  ✓ {testimonial.result}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-neutral-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary-500/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-neutral-400">{testimonial.role}</div>
                  <div className="text-sm text-neutral-300 font-semibold">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

