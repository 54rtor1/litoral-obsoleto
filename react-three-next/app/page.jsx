'use client'

import { Suspense } from 'react'
import { View } from '@/components/canvas/View'
import CoastalParticles from '@/components/canvas/CoastalParticles'
import YearCounter from '@/components/dom/YearCounter'

export default function Page() {
  return (
    <>
      <View>
        <Suspense fallback={null}>
          <CoastalParticles />
        </Suspense>
      </View>
      <YearCounter />
    </>
  )
}
