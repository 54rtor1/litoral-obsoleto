import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import CoastalParticles from '@/components/canvas/CoastalParticles'

export default function Scene({ scrollY, ...props }) {
  return (
    <Canvas {...props}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.AgXToneMapping
        state.gl.physicallyCorrectLights = true
      }}
    >
      <CoastalParticles scrollY={scrollY} />
      <Preload all />
    </Canvas>
  )
}
