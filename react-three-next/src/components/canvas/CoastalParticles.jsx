import * as THREE from 'three'
import { useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import useScrollStore from '@/stores/scrollStore'
import CoastalShaderMaterial from '@/templates/Shader/Shader'

function CoastalParticles() {
  const shaderRef = useRef()
  const { seaLevel } = useScrollStore()

  const videoTexture = useVideoTexture('/videos/coastal.mp4', {
    autoplay: true,
    loop: true,
    muted: true,
  })

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.getElapsedTime()
      shaderRef.current.uniforms.uSeaLevel.value = seaLevel
    }
  })

  return (
    <mesh scale={[3, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <coastalShaderMaterial
        ref={shaderRef}
        key={CoastalShaderMaterial.key}
        transparent
        depthWrite={false}
        uniforms-videoTexture-value={videoTexture}
        uniforms-uSeaLevel-value={seaLevel}
        uniforms-time-value={0}
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
