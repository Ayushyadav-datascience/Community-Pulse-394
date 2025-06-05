"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DarkModeToggle from "../components/DarkModeToggle"

interface HeaderProps {
  title?: string
  showBackButton?: boolean
  backHref?: string
  backText?: string
}

export default function Header({ 
  title = "Community Pulse", 
  showBackButton = false, 
  backHref = "/", 
  backText = "Back" 
}: HeaderProps) {
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
