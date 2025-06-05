"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DarkModeToggle from "./components/DarkModeToggle"

// Easter Egg: Konami Code
function useKonamiCode() {
  useEffect(() => {
    let sequence: any[] = []
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ]

    const handleKeyPress = (e: { code: any }) => {
      sequence.push(e.code)
      if (sequence.length > konamiCode.length) {
        sequence.shift()
      }
      
      if (JSON.stringify(sequence) === JSON.stringify(konamiCode)) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(1deg)'
        document.body.style.transition = 'transform 0.5s ease'
        
        // Show confetti effect
        const confetti = document.createElement('div')
        confetti.innerHTML = '🎉🎊✨🎈🎁'
        confetti.style.position = 'fixed'
        confetti.style.top = '50%'
        confetti.style.left = '50%'
        confetti.style.transform = 'translate(-50%, -50%)'
        confetti.style.fontSize = '3rem'
        confetti.style.zIndex = '9999'
        confetti.style.animation = 'bounce 2s infinite'
        document.body.appendChild(confetti)
        
        setTimeout(() => {
          document.body.style.transform = 'rotate(0deg)'
          document.body.removeChild(confetti)
        }, 3000)
        
        alert('🎉 Easter Egg Found! You discovered the Konami Code!')
        sequence = []
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])
}

// Inline Header Component
function Header({ 
  title = "Community Pulse", 
  showBackButton = false, 
  backHref = "/", 
  backText = "Back" 
}) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[10000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showBackButton && (
              <Link href={backHref} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {backText}
              </Link>
            )}
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => {
                // Easter egg: Click logo 5 times
                const clicks = parseInt(localStorage.getItem('logoClicks') || '0') + 1
                localStorage.setItem('logoClicks', clicks.toString())
                
                if (clicks === 5) {
                  alert('🚀 You found the secret! Welcome to Community Pulse Pro Mode!')
                  document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)'
                  document.body.style.backgroundSize = '400% 400%'
                  document.body.style.animation = 'gradient 15s ease infinite'
                  
                  // Add CSS for gradient animation
                  const style = document.createElement('style')
                  style.textContent = `
                    @keyframes gradient {
                      0% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                      100% { background-position: 0% 50%; }
                    }
                  `
                  document.head.appendChild(style)
                  
                  setTimeout(() => {
                    document.body.style.background = ''
                    document.body.style.animation = ''
                    localStorage.removeItem('logoClicks')
                  }, 10000)
                }
              }}
            >
              {title}
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-purple-600 dark:text-purple-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Events
            </Link>
            <Link 
              href="/issues" 
              className={`transition-colors ${
                isActive('/issues') 
                  ? 'text-purple-600 dark:text-purple-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Issues
            </Link>
            <Link 
              href="/add-event" 
              className={`transition-colors ${
                isActive('/add-event') 
                  ? 'text-purple-600 dark:text-purple-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Add Event
            </Link>
            <Link 
              href="/report-issue" 
              className={`transition-colors ${
                isActive('/report-issue') 
                  ? 'text-purple-600 dark:text-purple-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
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
  )
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Events")
  const [selectedDate, setSelectedDate] = useState("All Dates")
  
  // Activate easter eggs
  useKonamiCode()

  const categories = ["All Events", "Community", "Sports", "Education", "Health", "Arts", "Technology", "Lost & Found"]

  const mockEvents = [
    {
      id: 1,
      title: "Community Clean-up Drive",
      description: "Join us for a neighborhood clean-up initiative to make our community cleaner and greener.",
      category: "Community",
      date: "2025-01-15",
      time: "09:00 AM",
      venue: "Central Park",
      address: "123 Park Avenue, Downtown",
      attendees: 45,
      image: "/api/placeholder/400/200",
      tags: ["Environment", "Volunteer", "Community Service"],
      organizer: "Green Earth Society"
    },
    {
      id: 2,
      title: "Tech Meetup: AI & Machine Learning",
      description: "Explore the latest trends in artificial intelligence and machine learning with industry experts.",
      category: "Technology",
      date: "2025-01-18",
      time: "06:00 PM",
      venue: "Innovation Hub",
      address: "456 Tech Street, Silicon Valley",
      attendees: 120,
      image: "/api/placeholder/400/200",
      tags: ["AI", "Machine Learning", "Networking", "Tech"],
      organizer: "Tech Innovators"
    },
    {
      id: 3,
      title: "Lost: Golden Retriever",
      description: "Missing golden retriever named Max. Last seen near the university campus. Reward offered.",
      category: "Lost & Found",
      date: "2025-01-12",
      time: "All Day",
      venue: "University Campus Area",
      address: "789 University Drive",
      attendees: 0,
      image: "/api/placeholder/400/200",
      tags: ["Lost Pet", "Golden Retriever", "Reward", "Urgent"],
      organizer: "Sarah Johnson"
    },
    {
      id: 4,
      title: "Basketball Tournament",
      description: "Annual community basketball tournament. Teams of all skill levels welcome!",
      category: "Sports",
      date: "2025-01-20",
      time: "10:00 AM",
      venue: "Community Sports Center",
      address: "321 Sports Lane",
      attendees: 80,
      image: "/api/placeholder/400/200",
      tags: ["Basketball", "Tournament", "Sports", "Competition"],
      organizer: "Sports Club"
    },
    {
      id: 5,
      title: "Art Workshop: Watercolor Painting",
      description: "Learn watercolor painting techniques from professional artists. All materials provided.",
      category: "Arts",
      date: "2025-01-22",
      time: "02:00 PM",
      venue: "Art Studio Downtown",
      address: "654 Creative Street",
      attendees: 25,
      image: "/api/placeholder/400/200",
      tags: ["Art", "Workshop", "Painting", "Creative"],
      organizer: "Downtown Art Center"
    },
    {
      id: 6,
      title: "Health & Wellness Fair",
      description: "Free health screenings, wellness tips, and healthy lifestyle demonstrations.",
      category: "Health",
      date: "2025-01-25",
      time: "11:00 AM",
      venue: "Community Center",
      address: "987 Wellness Boulevard",
      attendees: 150,
      image: "/api/placeholder/400/200",
      tags: ["Health", "Wellness", "Free Screening", "Lifestyle"],
      organizer: "Health Department"
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Community": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Technology": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Sports": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Arts": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Health": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Education": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
      case "Lost & Found": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTagColor = (index: number) => {
    const colors = [
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    ]
    return colors[index % colors.length]
  }

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Events" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Community Pulse" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Discover Local Events & Issues</h1>
            <p className="text-xl mb-8">Connect with your community through events and civic engagement</p>
            
            {/* Search Bar with Easter Egg */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  // Easter egg: Type "pulse" in search
                  if (e.target.value.toLowerCase() === 'pulse') {
                    e.target.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
                    e.target.style.color = 'white'
                    setTimeout(() => {
                      e.target.style.background = ''
                      e.target.style.color = ''
                    }, 2000)
                  }
                }}
                placeholder="Search events... (try typing 'pulse')"
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

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option>All Dates</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <Link href="/add-event" className="btn-primary">
              Create Event
            </Link>
          </div>
        </div>

        {/* Events Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
          <span className="text-gray-600 dark:text-gray-400">{filteredEvents.length} events found</span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                {/* Event Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500"></div>
                  
                  {/* Tags in upper right corner */}
                  <div className="absolute top-3 right-3 flex flex-wrap gap-1 max-w-[60%]">
                    {event.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(index)} backdrop-blur-sm bg-opacity-90`}
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 2 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 backdrop-blur-sm bg-opacity-90">
                        +{event.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Category badge in upper left */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)} backdrop-blur-sm bg-opacity-90`}>
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* All Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(index)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.venue}</span>
                    </div>
                    
                    {event.attendees > 0 && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>{event.attendees} attending</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-xs">by {event.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Create an Event</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Organize community events and bring people together</p>
            <Link href="/add-event" className="btn-primary">
              Create Event
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Report an Issue</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Help improve your community by reporting civic issues</p>
            <Link href="/report-issue" className="btn-primary">
              Report Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
