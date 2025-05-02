'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'


export default function Info() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-6 top-6 z-50" >
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="About this app"
        className={`text-4xl transition duration-200 ${isOpen ? 'scale-110 text-white' : 'text-cyan-300'
          }`}
      >
        𓎫
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="info-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute right-0 mt-2 w-72 max-w-sm p-4 text-sm text-cyan-200"
          >
            <p className="mb-2">
              Scenarios (SSP) are pathways for humanity’s dance with the climate. Today, we drift between fading light and uncharted depths.
            </p>
            <p className="opacity-80">
              Use the icons on the left to toggle between these climate pathways. As you scroll, time moves forward. Watch sea levels respond — slowly at first, then with growing urgency. <br />
              This visualization uses median projections from NASA's Sea Level Projection Tool for Recife.
            </p>
            <p className="mt-2 opacity-80">
              Videos and images are sourced from public archives in the Paraíba region of Brazil.
            </p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
