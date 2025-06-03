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
        className="p-8 shadow-sm border border-gray-200 max-w-md mx-auto md:mx-0"
        style={{
          background: '#FAF8F4',
          color: '#222222',
          borderRadius: '22px',
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        }}
      >
        {/* Age Label */}
        <div className={alignment === "left" ? "mb-2 text-right md:text-right" : "mb-2 text-left md:text-left"}>
          <span className="text-base font-medium tracking-wide" style={{ color: '#222222' }}>
            Age: <span style={{ color: '#EE8838' }}>{age}</span>
          </span>
        </div>

        {/* Year */}
        <p className="text-gray-500 text-sm mb-4 font-medium" style={{ color: '#888888' }}>{year}</p>

        {/* Connection Quote */}
        <blockquote className="font-serif italic text-lg leading-relaxed mb-6" style={{ color: '#222222' }}>
          "{connection}"
        </blockquote>

        {/* Original Headline */}
        <p className="text-sm leading-relaxed" style={{ color: '#444444' }}>
          <a href={headline.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 transition-colors" style={{ color: '#222222' }}>
            {headline.headline}
          </a>
        </p>
      </motion.div>

      {/* Connection dot to timeline */}
      {/* Removed gray dot as requested */}
    </motion.div>
  )
}
