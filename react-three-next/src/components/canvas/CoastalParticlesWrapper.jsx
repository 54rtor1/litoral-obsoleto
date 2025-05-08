import { Suspense, useMemo } from 'react'
import CoastalParticles from './CoastalParticles'

const videoSources = [
  '/videos/converted/coastal1.1_converted.mp4',
  '/videos/converted/coastal1.2_converted.mp4',
  '/videos/converted/coastal1.3_converted.mp4',
  '/videos/converted/coastal1.4_converted.mp4',
  '/videos/converted/coastal1.5_converted.mp4',
  '/videos/converted/coastal1.6_converted.mp4',
  '/videos/converted/coastal1.7_converted.mp4',
  '/videos/converted/coastal1.8_converted.mp4',
  '/videos/converted/coastal1.9_converted.mp4',
  '/videos/converted/coastal1.10_converted.mp4',
  '/videos/converted/coastal1.11_converted.mp4',
  '/videos/converted/coastal1.12_converted.mp4',
  '/videos/converted/coastal1.13_converted.mp4',
  '/videos/converted/coastal1.14_converted.mp4',
  '/videos/converted/coastal1.15_converted.mp4',
  '/videos/converted/coastal1.16_converted.mp4',
  '/videos/converted/coastal1.17_converted.mp4',
  '/videos/converted/coastal1.18_converted.mp4',
  '/videos/converted/coastal1.19_converted.mp4',
  '/videos/converted/coastal1.20_converted.mp4',
  '/videos/converted/coastal1.21_converted.mp4',
  '/videos/converted/coastal1.22_converted.mp4',
  '/videos/converted/coastal1.23_converted.mp4',
]

const MAX_VISIBLE = 8

export default function CoastalParticlesWrapper() {
  const particleConfigs = useMemo(() => {
    return videoSources.slice(0, MAX_VISIBLE).map((src, i) => {
      const randomX = (Math.random() - 0.5) * 10
      const randomY = (Math.random() - 0.5) * 6
      const randomZ = (Math.random() - 0.5) * 4

      return {
        videoUrl: src,
        index: i,
        position: [randomX, randomY, randomZ],
      }
    })
  }, [])

  return (
    <Suspense fallback={null}>
      {particleConfigs.map((config, i) => (
        <CoastalParticles key={i} {...config} />
      ))}
    </Suspense>
  )
}
