import { useVideoTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import ShaderImpl from '@/templates/Shader/Shader'

function CoastalParticles() {
  const shaderRef = useRef()
  const { viewport } = useThree()

  // Load video texture
  const videoTexture = useVideoTexture('/videos/coastal.mp4', {
    autoplay: true,
    loop: true,
    muted: true,
  })

  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value += 0.005
      shaderRef.current.uniforms.videoTexture.value = videoTexture
    }
  })

  // Calculate aspect ratio dynamically
  const aspect = viewport.width / viewport.height

  return (
    <mesh scale={[3, 2, 1]}>
      <planeGeometry />
      <shaderImpl ref={shaderRef} />
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
