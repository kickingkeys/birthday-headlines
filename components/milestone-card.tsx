"use client"

import { motion } from "framer-motion"

interface MilestoneCardProps {
  age: number
  year: number
  connection: string
  headline: {
    headline: string
    url: string
    pub_date: string
    year: number
  }
  alignment: "left" | "right"
  index: number
}

export default function MilestoneCard({ age, year, connection, headline, alignment, index }: MilestoneCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: alignment === "left" ? -50 : 50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative ${alignment === "left" ? "md:mr-8 md:text-right" : "md:ml-8 md:text-left"}`}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-md mx-auto md:mx-0"
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
      >
        {/* Age Circle */}
        <div className={`flex ${alignment === "right" ? "justify-start" : "justify-end md:justify-start"} mb-4`}>
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-800">{age}</span>
          </div>
        </div>

        {/* Year */}
        <p className="text-gray-500 text-sm mb-6 font-medium">{year}</p>

        {/* Connection Quote */}
        <blockquote className="text-gray-800 font-serif italic text-lg leading-relaxed mb-6">"{connection}"</blockquote>

        {/* Original Headline */}
        <p className="text-gray-500 text-sm leading-relaxed">
          <a href={headline.url} target="_blank" rel="noopener noreferrer" className="underline">
            {headline.headline}
          </a>
        </p>
      </motion.div>

      {/* Connection dot to timeline */}
      <div
        className={`absolute top-16 w-3 h-3 bg-gray-400 rounded-full hidden md:block ${
          alignment === "left" ? "-right-6" : "-left-6"
        }`}
      />
    </motion.div>
  )
}
