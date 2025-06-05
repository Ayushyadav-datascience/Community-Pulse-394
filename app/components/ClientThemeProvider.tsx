"use client"

import { ReactNode } from "react"
import ThemeProvider from "../context/ThemeContext"
import ThemeToggle from "./ThemeToggle"

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <ThemeToggle />
        {children}
      </div>
    </ThemeProvider>
  )
} 