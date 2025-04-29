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
        state.scene.background = new THREE.Color(0x000000) // <<< important
      }}
    >
      <CoastalParticles scrollY={scrollY} />
      <Preload all />
    </Canvas>
  )
}
