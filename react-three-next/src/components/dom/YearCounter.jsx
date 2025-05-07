'use client'

import { useEffect, useState } from 'react'
import useScrollStore from '@/stores/scrollStore'
import useScenarioStore from '@/stores/scenarioStore'
import { AnimatePresence, motion } from 'framer-motion'

export default function YearCounter() {
  const { year, seaLevelByScenario } = useScrollStore()
  const { scenario } = useScenarioStore()
  const [currentScenario, setCurrentScenario] = useState(scenario)
  const seaLevel = seaLevelByScenario[scenario] || 0

  useEffect(() => {
    setCurrentScenario(scenario)
  }, [scenario])

  return (
    <div className="text-sm text-cyan-200">
      Year: <span className="text-white">{Math.round(year)}</span> | Rise:{' '}
      <span className="text-white">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentScenario}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            {seaLevel.toFixed(2)}m
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}
