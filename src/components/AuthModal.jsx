'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase/client'

export default function AuthModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <button onClick={onClose} className="mb-4 text-sm text-right w-full text-gray-600 hover:text-gray-800">Close</button>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']} // You can also use ['email'] or both
          redirectTo="http://localhost:3000"
        />
      </div>
    </div>
  )
}
