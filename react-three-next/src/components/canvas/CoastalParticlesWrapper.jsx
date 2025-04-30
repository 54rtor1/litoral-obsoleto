import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CoastalParticles from './CoastalParticles'

const videoSources = [
  '/videos/coastal.mp4',
  '/videos/Coastal2.mp4',
]

export default function CoastalParticlesWrapper() {
  return (
    <Suspense fallback={null}>
      {videoSources.map((src, i) => {
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
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.0}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Suspense>
  )
}
