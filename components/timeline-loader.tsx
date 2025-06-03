"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineLoaderProps {
  birthDate: Date | null
}

export default function TimelineLoader({ birthDate }: TimelineLoaderProps) {
  const [currentPhase, setCurrentPhase] = useState(0)

  const formatDate = (date: Date | null) => {
    if (!date) return "your birth"
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const phases = [
    `Finding headlines from ${formatDate(birthDate)}...`,
    "Connecting moments across time...",
    "Building your story...",
  ]

  useEffect(() => {
    const intervals = [1200, 1200, 1000] // Duration for each phase
    let timeoutId: NodeJS.Timeout

    const nextPhase = () => {
      if (currentPhase < phases.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentPhase((prev) => prev + 1)
        }, intervals[currentPhase])
      }
    }

    nextPhase()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhase, phases.length])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl font-serif text-gray-700 italic"
          >
            {phases[currentPhase]}
          </motion.p>
        </AnimatePresence>

        {/* Subtle loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
