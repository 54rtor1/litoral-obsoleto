'use client'

import { Canvas } from '@react-three/fiber'

export function View({ children, ...props }) {
  return (
    <Canvas {...props}>
      {children}
    </Canvas>
  )
}
