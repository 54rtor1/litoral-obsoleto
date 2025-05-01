'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Scroll from '@/components/dom/Scroll'
import YearCounter from '@/components/dom/YearCounter'
import ScenarioSelector from '@/components/dom/ScenarioSelector'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const [scrollY, setScrollY] = useState(0)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
      <Scroll>
        {children}
      </Scroll>
      <Scene
        scrollY={scrollY}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
      <YearCounter
        scrollY={scrollY}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
      <ScenarioSelector
        scrollY={scrollY}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />

    </div>
  )
}

export { Layout }
