// components/JoinEventButton.tsx
"use client"

import { useState } from "react"

export default function JoinEventButton({ eventId }: { eventId: string }) {
  const [isJoined, setIsJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleJoinEvent = async () => {
    setLoading(true)
    try {
      // API call to join event
      const response = await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        setIsJoined(!isJoined)
      }
    } catch (error) {
      console.error('Error joining event:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleJoinEvent}
      disabled={loading}
      className="btn-primary disabled:opacity-50"
      type="button"
    >
      {loading ? "Loading..." : isJoined ? "Leave Event" : "Join Event"}
    </button>
  )
}
