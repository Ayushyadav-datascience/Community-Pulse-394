"use client"

import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>
    </div>
  )
} 