"use client"

import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600">
        <span className="inline-block h-4 w-4 transform rounded-full bg-white"></span>
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}>
        <span className="absolute inset-0 flex items-center justify-center text-xs">
          {theme === 'dark' ? (
            <Sun className="h-3 w-3 text-yellow-500" />
          ) : (
            <Moon className="h-3 w-3 text-gray-600" />
          )}
        </span>
      </span>
    </button>
  )
}
