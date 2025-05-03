'use client'

import { Canvas } from '@react-three/fiber'

export function View({ children, ...props }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      {...props}>
      {children}
    </Canvas>
  )
}
