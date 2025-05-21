
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#features' },
        { text: 'Pricing', href: '#' },
        { text: 'Testimonials', href: '#testimonials' },
        { text: 'FAQ', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: '#' },
        { text: 'Career Guide', href: '#' },
        { text: 'Support', href: '#' },
        { text: 'Documentation', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '#about' },
        { text: 'Careers', href: '#' },
        { text: 'Contact', href: '#' },
        { text: 'Privacy Policy', href: '#' },
      ]
    }
  ]

  const socialLinks = [
    { 
      name: 'Twitter',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    { 
      name: 'GitHub',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">NextLeap</span>
              </Link>
              <p className="mt-4 text-gray-400 text-sm">
                Empowering professionals with AI-driven career roadmaps 
                to reach their full potential.
              </p>
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    className="text-gray-400 hover:text-gray-300 transition"
                    whileHover={{ scale: 1.1 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {footerLinks.map((column, columnIndex) => (
            <div key={column.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * columnIndex }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-gray-300 transition text-sm"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-500 text-sm"
          >
            &copy; {new Date().getFullYear()} NextLeap. All rights reserved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex space-x-6 mt-4 md:mt-0"
          >
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}