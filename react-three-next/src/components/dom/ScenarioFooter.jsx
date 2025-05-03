'use client'

import ScenarioInfo from './ScenarioInfo'
import YearCounter from './YearCounter'

export default function ScenarioFooter() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-4 bg-black px-4 py-2 text-cyan-200">
      <ScenarioInfo />
      <YearCounter />
    </div>
  )
}
