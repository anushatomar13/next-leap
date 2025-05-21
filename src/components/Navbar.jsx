'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { Menu, X } from 'react-feather'

export default function Navbar({ user, onSignInClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { path: '#about', name: 'About' },
    { path: '#features', name: 'Features' },
    { path: '#testimonials', name: 'Testimonials' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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
        isScrolled 
          ? 'bg-gray-900/90 shadow-lg backdrop-blur-md border-b border-gray-700' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onMouseEnter={() => setIsMobileOpen(false)}
          >
            <motion.span 
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
            >
              NextLeap
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className="text-lg ml-5 font-bold text-gray-300 hover:text-white  tracking-wide transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-sm text-gray-400">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition"
                >
                  Sign out
                </button>
              </motion.div>
            ) : (
              <motion.button
                onClick={onSignInClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm px-5 py-2 rounded-md shadow-md hover:opacity-90 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In / Sign Up
              </motion.button>
            )}
          </div>
        </div>

        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-3 border-t border-gray-700 mt-2"
          >
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/40 rounded transition"
                onClick={() => setIsMobileOpen(false)}
              >
                {name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-700">
              {user ? (
                <div className="flex flex-col gap-3 px-4">
                  <span className="text-sm text-gray-400">
                    Signed in as {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-red-400 text-sm hover:bg-red-500/10 px-3 py-2 rounded transition"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={onSignInClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
