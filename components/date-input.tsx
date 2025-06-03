"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DateInputProps {
  onSubmit: (date: Date) => void
}

export default function DateInput({ onSubmit }: DateInputProps) {
  const [value, setValue] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-focus the input
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Blinking cursor animation
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Parse date in DD/MM/YYYY format
    const parts = value.split("/")
    if (parts.length === 3) {
      const day = Number.parseInt(parts[0])
      const month = Number.parseInt(parts[1]) - 1 // Month is 0-indexed
      const year = Number.parseInt(parts[2])

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day)
        if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
          onSubmit(date)
          return
        }
      }
    }

    // Invalid date - could add error handling here
    alert("Please enter a valid date in DD/MM/YYYY format")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "") // Remove non-digits

    // Format as DD/MM/YYYY
    if (inputValue.length >= 2) {
      inputValue = inputValue.substring(0, 2) + "/" + inputValue.substring(2)
    }
    if (inputValue.length >= 5) {
      inputValue = inputValue.substring(0, 5) + "/" + inputValue.substring(5, 9)
    }

    setValue(inputValue)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ color: '#222222', background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
        style={{ marginTop: "-20vh" }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl md:text-3xl font-light mb-12 font-serif"
          style={{ color: '#222222' }}
        >
          Date of Birth
        </motion.h1>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative inline-block">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              placeholder=""
              maxLength={10}
              className="text-3xl md:text-4xl font-light text-center bg-transparent border-none outline-none tracking-wider caret-transparent"
              style={{
                width: "280px",
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: "8px",
                color: '#222222',
                background: 'transparent',
              }}
            />

            {/* Custom placeholder with blinking cursor */}
            {value === "" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl md:text-4xl font-light tracking-wider flex items-center" style={{ color: '#B0B0B0' }}>
                  DD/MM/YYYY
                  <span
                    className={`inline-block w-0.5 h-8 bg-gray-400 ml-2 transition-opacity duration-100 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}
