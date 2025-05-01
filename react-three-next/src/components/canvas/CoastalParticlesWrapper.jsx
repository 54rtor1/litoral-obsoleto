import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CoastalParticles from './CoastalParticles'

const videoSources = [
  '/videos/coastal1.1.mp4',
  '/videos/Coastal1.2.mp4',
  '/videos/Coastal1.3.mp4',
  '/videos/Coastal1.4.mp4',
  '/videos/Coastal1.5.mp4',
  '/videos/Coastal1.6.mp4',
  '/videos/coastal1.1.mp4',
  '/videos/Coastal1.2.mp4',

]

const MAX_VISIBLE = 8

export default function CoastalParticlesWrapper() {
  return (
    <Suspense fallback={null}>
      {videoSources.slice(0, MAX_VISIBLE).map((src, i) => {
        const randomX = (Math.random() - 0.5) * 10
        const randomY = (Math.random() - 0.5) * 6
        const randomZ = (Math.random() - 0.5) * 4

        return (
          <CoastalParticles
            key={i}
            videoUrl={src}
            index={i}
            position={[randomX, randomY, randomZ]}
          />
        )
      })}
      {/* <EffectComposer disableNormalPass>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer> */}
    </Suspense>
  )
}
