'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  const testimonials = [
    {
      quote: "NextLeap gave me clarity on my career path when I was feeling lost. The personalized roadmap helped me focus on the right skills, and within 6 months I landed my dream job!",
      author: "Emily Johnson",
      role: "Software Engineer "
    },
    {
      quote: "As someone switching careers, I was overwhelmed with information. NextLeap's AI narrowed down exactly what I needed to learn, saving me months of misdirected effort.",
      author: "Michael Chang",
      role: "Former Teacher, now Data Analyst"
        },
    {
      quote: "The skill gap analysis was eye-opening. It identified my blind spots and connected me with resources that perfectly addressed my needs. I'm now much more confident in interviews.",
      author: "Sarah Williams",
      role: "Product Manager "
    }
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how NextLeap has transformed careers and helped professionals achieve their goals.
          </p>
        </motion.div>
        
        <div className="relative">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1 relative">
                <svg className="absolute top-0 left-0 h-16 w-16 text-blue-500 opacity-20 transform -translate-x-6 -translate-y-8" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-xl md:text-2xl leading-relaxed text-gray-200 italic">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeTestimonial].author}</p>
                    <p className="text-gray-400 text-sm">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-8 gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-gray-800 rounded-full p-2 text-gray-400 hover:text-white shadow-lg border border-gray-700"
              aria-label="Previous testimonial"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-gray-800 rounded-full p-2 text-gray-400 hover:text-white shadow-lg border border-gray-700"
              aria-label="Next testimonial"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Read More Success Stories
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}