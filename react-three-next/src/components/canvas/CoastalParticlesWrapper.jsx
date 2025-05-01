import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CoastalParticles from './CoastalParticles'

const videoSources = [
  '/videos/coastal.mp4',
  '/videos/Coastal2.mp4',
]

const MAX_VISIBLE = 10

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
      <EffectComposer disableNormalPass>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </Suspense>
  )
}
