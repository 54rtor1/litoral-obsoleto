'use client'

import { Suspense } from 'react'
import { View } from '@/components/canvas/View'
import CoastalParticlesWrapper from '@/components/canvas/CoastalParticlesWrapper'
import YearCounter from '@/components/dom/YearCounter'
import ScenarioSelector from '@/components/dom/ScenarioSelector'

export default function Page() {
  return (
    <>
      <ScenarioSelector />
      <View>
        <Suspense fallback={null}>
          <CoastalParticlesWrapper />
        </Suspense>
      </View>
      <YearCounter />
    </>
  )
}
