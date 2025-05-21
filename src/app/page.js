'use client'

import { useRouter } from 'next/navigation'
import HeroSection from '@/components/Hero'
import AboutSection from '@/components/About'
import FeaturesSection from '@/components/Features'
import TestimonialsSection from '@/components/Testimonials'

export default function LandingPage() {
  const router = useRouter()

  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
      <HeroSection onActionClick={() => router.push('/generate')} />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  )
}
