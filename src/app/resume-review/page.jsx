'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadDropzone } from '@uploadthing/react'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { CheckCircle, UploadCloud } from 'react-feather'

export default function ResumeReviewPage() {
  const [resumeUrl, setResumeUrl] = useState(null)
  const [aiFeedback, setAiFeedback] = useState(null)
  const [loadingReview, setLoadingReview] = useState(false)

  const handleUploadComplete = async (res) => {
    if (!res || res.length === 0) return
    const uploadedFileUrl = res[0].url
    setResumeUrl(uploadedFileUrl)

    // Call AI API with resume URL here
    setLoadingReview(true)
    try {
      const response = await fetch('/api/review-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: uploadedFileUrl })
      })
      const data = await response.json()
      setAiFeedback(data.feedback)
    } catch (err) {
      console.error('Error during AI review:', err)
      setAiFeedback('There was an error processing your resume.')
    } finally {
      setLoadingReview(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16 text-gray-100">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Resume Review
        </h1>
        <p className="mb-6 text-gray-300">
          Upload your resume (PDF only), and get instant AI-powered feedback to improve your chances!
        </p>

        {!resumeUrl && (
          <UploadDropzone
            endpoint="resumeUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(e) => alert(`Upload error: ${e.message}`)}
            config={ourFileRouter}
            className="ut-label:text-gray-400 ut-button:bg-gradient-to-r ut-button:from-blue-500 ut-button:to-purple-600 ut-button:text-white ut-button:rounded-md ut-button:hover:opacity-90"
          />
        )}

        {resumeUrl && !aiFeedback && loadingReview && (
          <div className="mt-8 flex items-center space-x-3 text-blue-400">
            <UploadCloud className="animate-spin" size={20} />
            <span>Reviewing your resume with AI...</span>
          </div>
        )}

        {aiFeedback && (
          <div className="mt-10 bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-400" />
              <h2 className="text-lg font-semibold text-white">AI Feedback</h2>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{aiFeedback}</p>
          </div>
        )}
      </motion.div>
    </main>
  )
}
