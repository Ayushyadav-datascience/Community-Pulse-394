"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('userData')
        
        if (token && userData) {
          // Try to verify token with backend
          try {
            const response = await fetch('/api/auth/verify', {
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            
            if (response.ok) {
              const data = await response.json()
              setUser(data.user || JSON.parse(userData))
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('authToken')
              localStorage.removeItem('userData')
            }
          } catch (error) {
            // Backend not available, use stored data
            console.log('Backend not available, using stored user data')
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Try backend login first
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          localStorage.setItem('authToken', data.token)
          localStorage.setItem('userData', JSON.stringify(data.user))
          return true
        } else {
          const error = await response.json()
          console.error('Login failed:', error.message)
          return false
        }
      } catch (error) {
        // Backend not available, use mock login for demo
        console.log('Backend not available, using mock login')
        
        // Simple mock authentication for demo
        if (email && password) {
          const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email: email,
            role: 'user'
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now()
          
          setUser(mockUser)
          localStorage.setItem('authToken', mockToken)
          localStorage.setItem('userData', JSON.stringify(mockUser))
          return true
        }
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    
    // Force page refresh to update all components
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
