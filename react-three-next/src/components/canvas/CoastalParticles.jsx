import { useVideoTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import ShaderImpl from '@/templates/Shader/Shader'
import useScrollStore from '@/stores/scrollStore'

function CoastalParticles() {
  const shaderRef = useRef()
  const { viewport } = useThree()
  const { seaLevel } = useScrollStore()

  const videoTexture = useVideoTexture('/videos/coastal.mp4', {
    autoplay: true,
    loop: true,
    muted: true,
  })

  useFrame(() => {
    if (shaderRef.current) {
      // Use values directly from Zustand store
      shaderRef.current.uniforms.uSeaLevel.value = seaLevel
      shaderRef.current.uniforms.uOpacity.value = Math.min(1, seaLevel)
      shaderRef.current.uniforms.time.value += 0.005
    }
  })

  const aspect = viewport.width / viewport.height

  return (
    <mesh scale={[3, 2, 1]}>
      <planeGeometry />
      <shaderImpl
        ref={shaderRef}
        uniforms={{
          videoTexture: { value: videoTexture },
          uSeaLevel: { value: 0 },
          uOpacity: { value: 1 },
          time: { value: 0 },
        }}
      />
    </mesh>
  )
}

export default function CoastalParticlesWrapper() {
  return (
    <Suspense fallback={null}>
      <CoastalParticles />
    </Suspense>
  )
}
