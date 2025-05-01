import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import CoastalParticlesWrapper from '@/components/canvas/CoastalParticlesWrapper'

export default function Scene({ scrollY, useImageBackground = false, ...props }) {
  return (
    <Canvas
      {...props}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.ACESFilmicToneMapping
        state.gl.physicallyCorrectLights = true

        if (useImageBackground) {
          const textureLoader = new THREE.TextureLoader()
          textureLoader.load('videos/background2.png', (texture) => {
            state.scene.background = texture
          })
        } else {
          state.scene.background = new THREE.Color(0x112233)
        }
      }}
    >
      <CoastalParticlesWrapper />
      <Preload all />
    </Canvas>
  )
}
