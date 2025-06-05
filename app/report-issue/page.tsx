"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, MapPin, Camera, AlertTriangle } from "lucide-react"
import DarkModeToggle from "../components/DarkModeToggle"

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    address: "",
    isAnonymous: false,
    images: [] as File[],
    guidelines: false,
  })

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Roads", "Lighting", "Water Supply", "Cleanliness", "Public Safety", "Obstructions", "Other"]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.images.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert("Some files are larger than 10MB. Please choose smaller files.")
      return
    }

    const newImages = [...formData.images, ...files]
    setFormData({ ...formData, images: newImages })

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category', formData.category)
      submitData.append('location', formData.location)
      submitData.append('address', formData.address)
      submitData.append('isAnonymous', formData.isAnonymous.toString())
      
      formData.images.forEach((image, index) => {
        submitData.append(`image_${index}`, image)
      })

      console.log("Issue report:", formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        address: "",
        isAnonymous: false,
        images: [],
        guidelines: false,
      })
      setImagePreviews([])
      
      alert("Issue reported successfully!")
      
    } catch (error) {
      console.error("Error submitting report:", error)
      alert("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveDraft = () => {
    localStorage.setItem('issueReportDraft', JSON.stringify({
      ...formData,
      images: [],
      imagePreviews: []
    }))
    alert("Draft saved successfully!")
  }

  useEffect(() => {
    const draft = localStorage.getItem('issueReportDraft')
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft)
        setFormData(prev => ({ ...prev, ...parsedDraft }))
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }, [])

  return (
    // FIXED: Complete overlay to prevent background content
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-[9999] overflow-y-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[10000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/issues" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Issues
              </Link>
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
                Community Pulse
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Events
              </Link>
              <Link href="/issues" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Issues
              </Link>
              <Link href="/add-event" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Add Event
              </Link>
              <Link href="/report-issue" className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
                Report Issue
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Link href="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 min-h-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="event-card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Report Community Issue</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Help improve your neighborhood by reporting civic issues</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Issue Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Brief description of the issue"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Provide detailed information about the issue..."
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formData.description.length}/1000 characters</p>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location Name *
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., Main Street, Central Park"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specific Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Full address or nearest landmark"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Camera className="inline h-4 w-4 mr-1" />
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <div className="mt-4">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">Upload photos</span>
                        <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB each (max 5 photos)
                        </span>
                      </label>
                      <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={formData.images.length >= 5}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Anonymous Reporting */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reporting Options</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Choose how you want to submit this report</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">Report Anonymously</span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {formData.isAnonymous
                    ? "Your identity will be kept private. You won't receive status updates."
                    : "Your name will be visible to administrators. You'll receive updates on this issue."}
                </p>
              </div>

              {/* Guidelines */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  <AlertTriangle className="inline h-5 w-5 mr-2 text-orange-500" />
                  Reporting Guidelines
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <p>• Only report legitimate civic issues that affect the community</p>
                  <p>• Provide accurate location and description information</p>
                  <p>• Do not report personal disputes or private property issues</p>
                  <p>• Avoid duplicate reports - check if the issue has already been reported</p>
                  <p>• Include clear photos when possible to help authorities understand the issue</p>
                  <p>• Reports flagged as spam or inappropriate will be removed</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    checked={formData.guidelines}
                    onChange={(e) => setFormData({ ...formData, guidelines: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">
                    I understand and agree to follow the reporting guidelines *
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={saveDraft}
                  className="btn-secondary flex-1"
                  disabled={isSubmitting}
                >
                  Save as Draft
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
