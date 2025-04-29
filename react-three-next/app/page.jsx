'use client'

import { Suspense } from 'react'
import { View } from '@/components/canvas/View'
import CoastalParticlesWrapper from '@/components/canvas/CoastalParticlesWrapper'
import YearCounter from '@/components/dom/YearCounter'

export default function Page() {
  return (
    <>
      <View>
        <Suspense fallback={null}>
          <CoastalParticlesWrapper />
        </Suspense>
      </View>
      <YearCounter />
    </>
  )
}
