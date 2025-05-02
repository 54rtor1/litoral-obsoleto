'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Scroll from '@/components/dom/Scroll'
import ScenarioFooter from '@/components/dom/ScenarioFooter'
import ScenarioSelector from './ScenarioSelector'
import Info from './Info'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const [scrollY, setScrollY] = useState(0)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
      <ScenarioSelector />
      <Scroll>
        {children}
      </Scroll>
      <Scene
        scrollY={scrollY}
        useImageBackground={true}
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
      <ScenarioFooter />
      <Info />
    </div>
  )
}

export { Layout }
