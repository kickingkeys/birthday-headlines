"use client"

import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DateInput from "@/components/date-input"
import TimelineLoader from "@/components/timeline-loader"
import InteractiveTimeline from "@/components/interactive-timeline"
import { findHeadlinesForExactDate, findHeadlinesInDateRange, getRandomHeadline } from '../services/headlines';
import { getBestHeadlines } from '../services/headline-filter';
import { generateConnection } from '../services/ai';

// Mock data for testing
const mockMilestones = [
  {
    age: 0,
    year: 1995,
    connection: "While you took your first breath, Windows 95 gave computers their first user-friendly face",
    headline: "Windows 95 Launches to Massive Crowds",
  },
  {
    age: 5,
    year: 2000,
    connection: "As you learned to tie your shoes, the world untangled its Y2K fears",
    headline: "Y2K Bug Passes Without Major Incidents",
  },
  {
    age: 10,
    year: 2005,
    connection: "While you discovered your favorite games, the world discovered a new way to connect",
    headline: "YouTube Founded, Changing How We Share Videos",
  },
  {
    age: 16,
    year: 2011,
    connection: "While you found your independence, a revolutionary lost his final battle",
    headline: "Steve Jobs Dies at 56",
  },
  {
    age: 21,
    year: 2016,
    connection: "As you came of age, democracy faced its greatest test in decades",
    headline: "Brexit Vote Shocks Global Markets",
  },
  {
    age: 25,
    year: 2020,
    connection: "While you built your career, the world learned to work from home",
    headline: "COVID-19 Pandemic Changes Everything",
  },
]

type AppState = "input" | "loading" | "timeline" | "error"

interface Headline {
  headline: string;
  url: string;
  pub_date: string;
  year: number;
}

interface Milestone {
  age: number;
  year: number;
  label: string;
  headline: Headline;
  connection: string;
}

export default function BirthdayHeadlines() {
  const [appState, setAppState] = useState<AppState>("input")
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [error, setError] = useState<string>("")

  const handleDateSubmit = async (date: Date) => {
    setBirthDate(date)
    setAppState("loading")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3500))

      // In a real app, this would fetch actual headlines and generate connections
      const processedMilestones = await generateMilestones(date)
      setMilestones(processedMilestones)
      setAppState("timeline")
    } catch (err) {
      setError("Unable to load your timeline. Please try again.")
      setAppState("error")
    }
  }

  const generateMilestones = async (birthDate: Date): Promise<Milestone[]> => {
    console.log(`[App] Generating milestones for ${birthDate.toISOString()}`);
    const birthYear = birthDate.getFullYear();
    const milestones = [];

    // For birthdate (age 0), find headlines for exact date
    console.log(`[App] Finding headlines for birthdate`);
    const birthHeadlines = findHeadlinesForExactDate(birthDate);
    const bestBirthHeadlines = getBestHeadlines(birthHeadlines, 3);
    
    if (bestBirthHeadlines.length > 0) {
      console.log(`[App] Found ${bestBirthHeadlines.length} good headlines for birthdate`);
      const connection = await generateConnection(
        { age: 0, year: birthYear, label: "When you were born" },
        bestBirthHeadlines
      );
      
      milestones.push({
        age: 0,
        year: birthYear,
        label: "When you were born",
        headline: bestBirthHeadlines[0],
        connection
      });
    }

    // For other milestones, find headlines within a date range
    const milestoneAges = [5, 10, 16, 18, 21];
    for (const age of milestoneAges) {
      console.log(`[App] Processing milestone age ${age}`);
      const milestoneDate = new Date(birthYear + age, birthDate.getMonth(), birthDate.getDate());
      const startDate = new Date(milestoneDate);
      startDate.setDate(startDate.getDate() - 60);
      const endDate = new Date(milestoneDate);
      endDate.setDate(endDate.getDate() + 60);
      
      const milestoneHeadlines = findHeadlinesInDateRange(startDate, endDate);
      const bestMilestoneHeadlines = getBestHeadlines(milestoneHeadlines, 3);
      
      if (bestMilestoneHeadlines.length > 0) {
        console.log(`[App] Found ${bestMilestoneHeadlines.length} good headlines for age ${age}`);
        const connection = await generateConnection(
          { age, year: birthYear + age, label: `When you turned ${age}` },
          bestMilestoneHeadlines
        );
        
        milestones.push({
          age,
          year: birthYear + age,
          label: `When you turned ${age}`,
          headline: bestMilestoneHeadlines[0],
          connection
        });
      }
    }

    console.log(`[App] Generated ${milestones.length} milestones`);
    return milestones;
  }

  const resetApp = () => {
    setAppState("input")
    setBirthDate(null)
    setMilestones([])
    setError("")
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F4', color: '#222222' }}>
      <AnimatePresence mode="wait">
        {appState === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DateInput onSubmit={handleDateSubmit} />
          </motion.div>
        )}

        {appState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TimelineLoader birthDate={birthDate} />
          </motion.div>
        )}

        {appState === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveTimeline milestones={milestones} onReset={resetApp} />
          </motion.div>
        )}

        {appState === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <p className="text-gray-600 text-lg mb-6 text-center">{error}</p>
            <button onClick={resetApp} className="text-black hover:text-gray-600 transition-colors underline">
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
