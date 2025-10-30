'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'

export function ResumeUpload() {
  const [uploading, setUploading] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)
  const user = useAuthStore((state) => state.user)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!resumeFile || !user) return

    setUploading(true)
    setSuccess(false)

    // Simulate upload - replace with actual API call
    setTimeout(() => {
      setUploading(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">📄 Upload Your Resume</h2>
      <p className="text-gray-600 mb-6">
        Upload your resume and we'll extract your skills, experience, and qualifications automatically.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="text-6xl mb-4">📎</div>
          {resumeFile ? (
            <div>
              <p className="text-lg font-semibold text-primary-600 mb-2">
                {resumeFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(resumeFile.size / 1024).toFixed(0)} KB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, or DOCX (Max 10MB)
              </p>
            </div>
          )}
        </label>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg mb-4">
          ✓ Resume uploaded successfully! We're analyzing your profile...
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!resumeFile || uploading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Analyzing Resume...' : 'Upload Resume'}
      </button>

      <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-semibold mb-1">AI Skills Extraction</h3>
          <p className="text-gray-600">We automatically identify your key skills and experience</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold mb-1">Secure Storage</h3>
          <p className="text-gray-600">Your resume is encrypted and never shared</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-semibold mb-1">Optimization Tips</h3>
          <p className="text-gray-600">Get suggestions to improve your resume</p>
        </div>
      </div>
    </div>
  )
}


