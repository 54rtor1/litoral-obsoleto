import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import CoastalParticles from '@/components/canvas/CoastalParticles'

export default function Scene({ ...props }) {
  return (
    <Canvas {...props}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.AgXToneMapping
        state.gl.physicallyCorrectLights = true
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CoastalParticles />
      <Preload all />
    </Canvas>
  )
}
