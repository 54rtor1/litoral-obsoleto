'use client'

import { useEffect, useState } from 'react'
import useScenarioStore from '@/stores/scenarioStore'
import { AnimatePresence, motion } from 'framer-motion'

export default function ScenarioInfo() {
  const { metadata } = useScenarioStore()
  const [text, setText] = useState('')

  useEffect(() => {
    setText(`${metadata.title} — ${metadata.description}`)
  }, [metadata])

  return (
    <div className="text-center text-sm text-cyan-200">
      <AnimatePresence mode="wait">
        <motion.p
          key={text}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          <strong>{metadata.description}</strong> — {metadata.info}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
