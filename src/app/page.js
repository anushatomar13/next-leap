'use client'

import { useEffect, useState } from 'react'
import { getUserData } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Header from '@/components/Navbar'
import HeroSection from '@/components/Hero'
import AboutSection from '@/components/About'
import FeaturesSection from '@/components/Features'
import TestimonialsSection from '@/components/Testimonials'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'


export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData()
      setUser(data)
    }
    fetchUser()
  }, [])

  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
     
      
      <HeroSection onActionClick={() => router.push('/generate')} />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
      
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </main>
  )
}