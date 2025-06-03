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
    <div className="min-h-screen" style={{ background: '#FAF8F4' }}>
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
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 hidden md:block"
          style={{
            top: 0,
            bottom: '60px',
            backgroundColor: '#EE8838',
            zIndex: 0,
            borderRadius: '2px',
          }}
        />

        {/* Mobile Timeline Line */}
        <div
          className="absolute left-8 w-0.5 md:hidden"
          style={{
            top: 0,
            bottom: '60px',
            backgroundColor: '#EE8838',
            zIndex: 0,
            borderRadius: '2px',
          }}
        />

        {/* Milestone Cards */}
        <div className="space-y-24 md:space-y-32">
          {milestones.map((milestone, index) => (
            <div key={`${milestone.age}-${milestone.year}`} className="relative">
              {/* Dotted connector from timeline to card */}
              <div
                className={`hidden md:block absolute top-1/2 transform -translate-y-1/2`}
                style={{
                  left: index % 2 === 0 ? '50%' : undefined,
                  right: index % 2 !== 0 ? '50%' : undefined,
                  width: '60px',
                  height: '1px',
                  borderTop: '2px dotted #EE8838',
                  zIndex: 1,
                }}
              />
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

        {/* Bottom CTA - moved to the right of the timeline, gray line removed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 flex justify-center items-start"
        >
          <div style={{ marginLeft: 'calc(50% + 32px)', textAlign: 'left' }}>
            <p className="text-gray-600 mb-2">Want to explore a different timeline?</p>
            <button onClick={onReset} className="text-black hover:text-gray-600 transition-colors underline text-lg">
              Start over
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
