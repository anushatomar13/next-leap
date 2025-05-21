'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <button
              onClick={onClose}
              className="mb-4 text-sm text-right w-full text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              redirectTo="http://localhost:3000"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
