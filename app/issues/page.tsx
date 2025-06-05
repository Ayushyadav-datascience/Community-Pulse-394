"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Header from "../components/Header"

export default function IssuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Issues")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedDistance, setSelectedDistance] = useState("Within 5km")

  const categories = ["All Issues", "Roads", "Lighting", "Water Supply", "Cleanliness", "Public Safety", "Obstructions"]

  const mockIssues = [
    {
      id: 1,
      title: "Broken Manhole Cover",
      category: "Public Safety",
      status: "Reported",
      upvotes: 45,
      distance: "1.5km away",
      description: "Dangerous open manhole without proper barriers",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Overflowing Garbage Bins",
      category: "Cleanliness",
      status: "Resolved",
      upvotes: 31,
      distance: "2.1km away",
      description: "Multiple garbage bins overflowing for several days",
      timeAgo: "1 day ago"
    },
    {
      id: 3,
      title: "Potholes on Main Street",
      category: "Roads",
      status: "In Progress",
      upvotes: 23,
      distance: "0.8km away",
      description: "Dangerous potholes causing traffic issues and vehicle damage",
      timeAgo: "3 days ago"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Public Safety": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Cleanliness": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Roads": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Community Pulse" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Community Issues</h1>
            <p className="text-xl mb-8">Report and track civic issues in your neighborhood</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search issues..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-lg font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option>All Status</option>
                <option>Reported</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option>Within 5km</option>
                <option>Within 10km</option>
                <option>Within 20km</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                Grid
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                Map
              </button>
            </div>
          </div>
        </div>

        {/* Issues Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nearby Issues</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">{mockIssues.length} issues found</span>
            <Link href="/report-issue" className="btn-primary">
              Report Issue
            </Link>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIssues.map((issue) => (
            <div key={issue.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
                    {issue.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {issue.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {issue.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{issue.upvotes} upvotes</span>
                  </div>
                  <span>{issue.distance}</span>
                </div>
                
                <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                  {issue.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
