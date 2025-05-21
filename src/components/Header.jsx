'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Header({ user, onSignInClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg backdrop-blur-sm bg-opacity-90' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">NextLeap</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link href="#features" className="text-gray-300 hover:text-white transition">Features</Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</Link>
          </nav>

          <div>
            {user ? (
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-sm text-gray-300">Hello, {user.user_metadata?.full_name || user.email}</span>
                <button 
                  onClick={handleSignOut} 
                  className="text-sm text-red-400 hover:text-red-300 transition underline"
                >
                  Sign out
                </button>
              </motion.div>
            ) : (
              <motion.button
                onClick={onSignInClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Sign In / Sign Up
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}