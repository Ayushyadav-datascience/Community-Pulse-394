"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar, Users, Heart, Share2, Map, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  "All Events",
  "Music",
  "Sports",
  "Food & Drink",
  "Arts & Culture",
  "Community",
  "Business",
  "Health & Wellness",
  "Lost & Found",
]

const events = [
  {
    id: 1,
    title: "Live Music Festival",
    description: "Join us for an amazing night of live music featuring local bands and artists.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 09, 2024",
    time: "10:30 AM",
    location: "Central Park",
    attendees: 27,
    category: "Music",
    organizer: "Music Events Co.",
    isFeatured: true,
    isPaid: true,
    ticketTiers: [
      { name: "Standard", price: 25, description: "General admission" },
      { name: "Gold", price: 50, description: "Premium seating + refreshments" },
      { name: "Platinum", price: 100, description: "VIP experience + meet & greet" },
    ],
    distance: 1.2,
    status: "upcoming",
    upvotes: 15,
    isUrgent: false,
  },
  {
    id: 2,
    title: "Lost Golden Retriever - Max",
    description:
      "Missing since yesterday evening near Riverside Park. Friendly dog, responds to 'Max'. Please contact if seen.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 08, 2024",
    time: "6:00 PM",
    location: "Riverside Park Area",
    attendees: 0,
    category: "Lost & Found",
    organizer: "Sarah Johnson",
    isFeatured: false,
    isPaid: false,
    distance: 0.8,
    status: "urgent",
    upvotes: 23,
    isUrgent: true,
  },
  {
    id: 3,
    title: "Community Cleanup Drive",
    description: "Help make our neighborhood cleaner and more beautiful. Free refreshments provided.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 12, 2024",
    time: "9:00 AM",
    location: "Riverside Park",
    attendees: 15,
    category: "Community",
    organizer: "Green Initiative",
    isFeatured: false,
    isPaid: false,
    distance: 2.1,
    status: "upcoming",
    upvotes: 8,
    isUrgent: false,
  },
  {
    id: 4,
    title: "Food Truck Rally",
    description: "Taste amazing food from local food trucks and vendors.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 15, 2024",
    time: "12:00 PM",
    location: "Downtown Square",
    attendees: 42,
    category: "Food & Drink",
    organizer: "Foodie Events",
    isFeatured: false,
    isPaid: false,
    distance: 3.2,
    status: "upcoming",
    upvotes: 12,
    isUrgent: false,
  },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Events")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [distanceFilter, setDistanceFilter] = useState("5")
  const [dateFilter, setDateFilter] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending")

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
        },
        (error) => {
          console.error("Location access denied:", error)
          setLocationPermission("denied")
        },
      )
    }
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All Events" || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistance = Number.parseFloat(distanceFilter) >= event.distance

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = event.date === "Dec 09, 2024" // Today's date
    } else if (dateFilter === "tomorrow") {
      matchesDate = event.date === "Dec 10, 2024"
    } else if (dateFilter === "week") {
      // Events within this week
      matchesDate = true
    }

    return matchesCategory && matchesSearch && matchesDistance && matchesDate
  })

  // Sort events: urgent first, then by upvotes
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1
    if (!a.isUrgent && b.isUrgent) return 1
    return b.upvotes - a.upvotes
  })

  const getStatusBadge = (event: any) => {
    const now = new Date()
    const eventDate = new Date(event.date + " " + event.time)

    if (event.isUrgent) {
      return (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">URGENT</span>
      )
    }

    const timeDiff = eventDate.getTime() - now.getTime()
    const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60))

    if (hoursUntil < 0) {
      return <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">Event Ended</span>
    } else if (hoursUntil < 2) {
      return <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Happening Now</span>
    } else if (hoursUntil < 24) {
      return (
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Starts in {hoursUntil}h
        </span>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">Community Pulse</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-purple-600 font-medium">
                Events
              </Link>
              <Link href="/issues" className="text-gray-500 hover:text-purple-600">
                Issues
              </Link>
              <Link href="/add-event" className="text-gray-500 hover:text-purple-600">
                Add Event
              </Link>
              <Link href="/report-issue" className="text-gray-500 hover:text-purple-600">
                Report Issue
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Location Banner */}
      {locationPermission === "denied" && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Location access is required to show nearby events. Please enable location services or enter your
                  address manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Discover Local Events & Issues</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Connect with your community within 5km radius</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search events and issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none"
              />
              <button className="btn-primary m-2">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center gap-4">
              {/* Distance Filter */}
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="1">Within 1km</option>
                <option value="3">Within 3km</option>
                <option value="5">Within 5km</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "map" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  <Map className="h-4 w-4 inline mr-1" />
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All Events" ? "Nearby Events" : selectedCategory}
            </h3>
            <span className="text-gray-500">{sortedEvents.length} events found</span>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <Link key={event.id} href={`/event/${event.id}`}>
                  <div className="event-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">{getStatusBadge(event)}</div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.category === "Lost & Found"
                              ? "bg-red-100 text-red-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {event.category}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-3 right-3 flex space-x-2">
                        <button className="p-1.5 bg-white/80 rounded-full hover:bg-white">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 bg-white/80 rounded-full hover:bg-white">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">{event.upvotes} upvotes</span>
                        </div>
                        <span className="text-sm text-gray-500">{event.distance}km away</span>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} • {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        {event.category !== "Lost & Found" && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees} attending
                          </div>
                        )}
                      </div>

                      {/* Pricing Info */}
                      {event.isPaid && event.ticketTiers && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Paid Event</span>
                            <span className="text-sm text-purple-600 font-medium">
                              From ${Math.min(...event.ticketTiers.map((tier) => tier.price))}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Map View */
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Map View</p>
                  <p className="text-gray-400 text-sm">
                    Showing {sortedEvents.length} events within {distanceFilter}km
                  </p>
                </div>
              </div>
            </div>
          )}

          {sortedEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-2">
            <button className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center text-sm font-medium">
              2
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center text-sm font-medium">
              3
            </button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center text-sm font-medium">
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
