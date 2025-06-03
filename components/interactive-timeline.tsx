"use client"

import { motion } from "framer-motion"
import MilestoneCard from "./milestone-card"

interface Milestone {
  age: number
  year: number
  connection: string
  headline: {
    headline: string
    url: string
    pub_date: string
    year: number
  }
}

interface InteractiveTimelineProps {
  milestones: Milestone[]
  onReset: () => void
}

export default function InteractiveTimeline({ milestones, onReset }: InteractiveTimelineProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 pb-12 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Your Life in Headlines</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Every moment of your life has unfolded alongside history. Here are the headlines that shaped the world as you
          grew.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 hidden md:block"
          style={{ height: `${milestones.length * 300}px` }}
        />

        {/* Mobile Timeline Line */}
        <div
          className="absolute left-8 w-0.5 bg-gray-300 md:hidden"
          style={{ height: `${milestones.length * 200}px` }}
        />

        {/* Milestone Cards */}
        <div className="space-y-24 md:space-y-32">
          {milestones.map((milestone, index) => (
            <div key={`${milestone.age}-${milestone.year}`} className="relative">
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:ml-auto md:pl-16" : "md:mr-auto md:pr-16"}`}>
                <MilestoneCard
                  age={milestone.age}
                  year={milestone.year}
                  connection={milestone.connection}
                  headline={milestone.headline}
                  alignment={index % 2 === 0 ? "right" : "left"}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-12 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-6">Want to explore a different timeline?</p>
          <button onClick={onReset} className="text-black hover:text-gray-600 transition-colors underline text-lg">
            Start over
          </button>
        </motion.div>
      </div>
    </div>
  )
}
