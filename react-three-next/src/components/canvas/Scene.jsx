/* eslint-disable no-console */
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
        state.gl.toneMappingExposure = 1.2
        state.gl.physicallyCorrectLights = true
        state.gl.outputColorSpace = THREE.SRGBColorSpace

        if (useImageBackground) {
          const imagePaths = [
            '/background1.png',
            '/background2.png',
            '/background3.png',
            '/background4.png'
          ]

          const chosenImage = imagePaths[Math.floor(Math.random() * imagePaths.length)]

          const textureLoader = new THREE.TextureLoader()
          textureLoader.setCrossOrigin('anonymous')

          textureLoader.load(
            chosenImage,
            (texture) => {
              texture.colorSpace = THREE.SRGBColorSpace
              texture.minFilter = THREE.LinearFilter
              state.scene.background = texture
            },
            undefined,
            (err) => {
              console.error('Background load failed:', err)
              state.scene.background = new THREE.Color(0x000000)
            }
          )
        } else {
          state.scene.background = new THREE.Color(0x000000)
        }
      }
      }
    >
      <CoastalParticlesWrapper />
      <Preload all />
    </Canvas>
  )
}
