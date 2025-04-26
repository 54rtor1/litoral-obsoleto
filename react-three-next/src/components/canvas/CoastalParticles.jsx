import * as THREE from 'three'
import { useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
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

  // Generate particles positions and uvs
  // Generate particles positions, uvs, and random velocities
  const particles = useMemo(() => {
    const count = 512 * 512
    const positions = new Float32Array(count * 3)
    const uvs = new Float32Array(count * 2)
    const velocities = new Float32Array(count * 3)

    let i3 = 0
    let i2 = 0
    for (let i = 0; i < 512; i++) {
      for (let j = 0; j < 512; j++) {
        positions[i3] = (i / 512) * 2 - 1
        positions[i3 + 1] = (j / 512) * 2 - 1
        positions[i3 + 2] = 0

        uvs[i2] = i / 512
        uvs[i2 + 1] = j / 512

        // random velocity direction (small values)
        velocities[i3] = (Math.random() - 0.5) * 2.0
        velocities[i3 + 1] = (Math.random() - 0.5) * 2.0
        velocities[i3 + 2] = (Math.random() - 0.5) * 2.0

        i3 += 3
        i2 += 2
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    return geometry
  }, [])


  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uSeaLevel.value = seaLevel
    }
  })

  return (
    <points geometry={particles}>
      <coastalShaderMaterial
        ref={shaderRef}
        key={CoastalShaderMaterial.key}
        transparent
        depthWrite={false}
        uniforms-videoTexture-value={videoTexture}
        uniforms-uSeaLevel-value={seaLevel}
      />
    </points>
  )
}

export default function CoastalParticlesWrapper() {
  return (
    <Suspense fallback={null}>
      <CoastalParticles />
    </Suspense>
  )
}
