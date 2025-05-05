'use client'

import { Canvas } from '@react-three/fiber'

export function View({ children, ...props }) {
  return (
    <Canvas
      frameloop="demand"
      performance={{ min: 0.5, max: 1 }}
      dpr={[1, 2]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: true
      }}
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5]
      }}
      {...props}
    >
      {children}
    </Canvas>
  )
  )
}
