"use client";
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthModal from "@/components/AuthModal"
import { useEffect, useState } from "react"
import { getUserData } from "@/lib/supabase/client"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })


export default function RootLayout({ children }) {
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData()
      setUser(data)
    }
    fetchUser()
  }, [])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar user={user} onSignInClick={() => setShowAuth(true)} />
        {children}
        <Footer />
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </body>
    </html>
  )
}
