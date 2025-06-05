"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  User,
  CreditCard,
  TrendingUp,
  Flag,
} from "lucide-react"

// Mock data for the event
const eventData = {
  id: 1,
  title: "Live Music Festival",
  description:
    "Join us for an amazing night of live music featuring local bands and artists. This outdoor festival will showcase the best of our local music scene with multiple stages, food vendors, and activities for all ages.",
  fullDescription: `The main event is big road show/concert, is related event with potholes, making it dangerous and difficult to travel on.

Event Details:
• Multiple stages with different music genres
• Local food vendors and craft beer
• Family-friendly activities and games
• Professional sound and lighting setup
• Free parking available

For additional information, please contact us.`,
  image: "/placeholder.svg?height=400&width=600",
  date: "Dec 09, 2024",
  time: "10:30 AM",
  location: "Central Park",
  address: "123 Park Avenue, Downtown",
  attendees: 27,
  category: "Music",
  organizer: {
    name: "Music Events Co.",
    avatar: "/placeholder.svg?height=40&width=40",
    totalEvents: 15,
    followers: 234,
  },
  registrationStart: "Dec 01, 2024",
  registrationEnd: "Dec 08, 2024",
  isPaid: true,
  ticketTiers: [
    { name: "Standard", price: 25, description: "General admission" },
    { name: "Gold", price: 50, description: "Premium seating + refreshments" },
    { name: "Platinum", price: 100, description: "VIP experience + meet & greet" },
  ],
  maxAttendees: 100,
  tags: ["Music", "Outdoor", "Family-friendly", "Local Artists"],
  upvotes: 15,
  distance: 1.2,
  status: "upcoming",
}

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "registered for this event",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "upvoted this event",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Emily Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "shared this event",
    time: "6 hours ago",
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [selectedTier, setSelectedTier] = useState(eventData.ticketTiers[0])
  const [showPayment, setShowPayment] = useState(false)

  const handleRegister = () => {
    if (eventData.isPaid && !showPayment) {
      setShowPayment(true)
    } else {
      setIsRegistered(!isRegistered)
      setShowPayment(false)
    }
  }

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </Link>
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">Community Pulse</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <Image
                src={eventData.image || "/placeholder.svg"}
                alt={eventData.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {eventData.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full ${isLiked ? "bg-red-500 text-white" : "bg-white/80 text-gray-600"} hover:bg-red-500 hover:text-white transition-colors`}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white/80 rounded-full hover:bg-white text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white/80 rounded-full hover:bg-white text-gray-600">
                  <Flag className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{eventData.title}</h1>
                <button
                  onClick={handleUpvote}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isUpvoted
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">{eventData.upvotes + (isUpvoted ? 1 : 0)}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">{eventData.date}</p>
                    <p className="text-sm">{eventData.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">{eventData.location}</p>
                    <p className="text-sm">
                      {eventData.address} • {eventData.distance}km away
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">{eventData.attendees} attending</p>
                    <p className="text-sm">Max {eventData.maxAttendees} attendees</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Registration</p>
                    <p className="text-sm">Until {eventData.registrationEnd}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">About this event</h3>
                <p className="text-gray-600 whitespace-pre-line">{eventData.fullDescription}</p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Map placeholder - {eventData.address}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {eventData.isPaid ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Ticket</h3>
                  <div className="space-y-3 mb-4">
                    {eventData.ticketTiers.map((tier) => (
                      <label
                        key={tier.name}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="ticket-tier"
                          value={tier.name}
                          checked={selectedTier.name === tier.name}
                          onChange={() => setSelectedTier(tier)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{tier.name}</span>
                            <span className="font-bold text-purple-600">${tier.price}</span>
                          </div>
                          <p className="text-sm text-gray-600">{tier.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {showPayment && (
                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-medium mb-3">Payment Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>{selectedTier.name} Ticket</span>
                          <span>${selectedTier.price}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-2">
                          <span>Total</span>
                          <span>${selectedTier.price}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleRegister}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      isRegistered ? "bg-green-600 text-white hover:bg-green-700" : "btn-primary"
                    }`}
                  >
                    {isRegistered ? (
                      "Registered ✓"
                    ) : showPayment ? (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay ${selectedTier.price}
                      </>
                    ) : (
                      "Select & Pay"
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-900">Free Event</p>
                    <p className="text-gray-600">No payment required</p>
                  </div>

                  <button
                    onClick={handleRegister}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isRegistered ? "bg-green-600 text-white hover:bg-green-700" : "btn-primary"
                    }`}
                  >
                    {isRegistered ? "Registered ✓" : "Register for Event"}
                  </button>
                </div>
              )}

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Registration closes on {eventData.registrationEnd}</p>
              </div>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`w-full mt-3 py-2 px-4 rounded-lg font-medium transition-colors ${
                  isFollowing ? "bg-purple-100 text-purple-700" : "btn-secondary"
                }`}
              >
                {isFollowing ? "Following ✓" : "Follow Event"}
              </button>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Organizer</h3>
              <div className="flex items-center mb-4">
                <Image
                  src={eventData.organizer.avatar || "/placeholder.svg"}
                  alt={eventData.organizer.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">{eventData.organizer.name}</p>
                  <p className="text-sm text-gray-600">{eventData.organizer.totalEvents} events organized</p>
                </div>
              </div>
              <button className="w-full btn-secondary">Follow Organizer</button>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Image
                      src={activity.avatar || "/placeholder.svg"}
                      alt={activity.user}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Event */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Share Event</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Twitter
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <User className="h-4 w-4 mr-2" />
                  Facebook
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
