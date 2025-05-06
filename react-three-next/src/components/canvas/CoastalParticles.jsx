/* eslint-disable no-console */
import * as THREE from 'three'
import { useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import useScrollStore from '@/stores/scrollStore'
import CoastalShaderMaterial from '@/templates/Shader/Shader.jsx'

function CoastalParticles({ videoUrl, index = 0, position = [0, 0, 0] }) {
  const shaderRef = useRef()
  const { seaLevel } = useScrollStore()

  const videoTexture = useVideoTexture(videoUrl, {
    loop: true,
    muted: true,
    start: true,
    crossOrigin: 'anonymous',
    playsInline: true,
  })

  useEffect(() => {
    if (videoTexture?.image) {
      const video = videoTexture.image

      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.generateMipmaps = false
      videoTexture.colorSpace = THREE.SRGBColorSpace
    }
  }, [videoTexture])

  const particles = useMemo(() => {
    const count = 128 * 128
    const positions = new Float32Array(count * 3)
    const uvs = new Float32Array(count * 2)
    const velocities = new Float32Array(count * 3)

    const aspectRatio = videoTexture?.image
      ? videoTexture.image.videoWidth / videoTexture.image.videoHeight
      : 1

    let i3 = 0
    let i2 = 0
    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 128; j++) {
        const baseX = ((i / 128) * 2 - 1) * aspectRatio
        const baseY = (j / 128) * 2 - 1

        positions[i3] = baseX
        positions[i3 + 1] = baseY
        positions[i3 + 2] = 0

        uvs[i2] = i / 128
        uvs[i2 + 1] = j / 128

        velocities[i3] = (Math.random() - 0.5) * 0.5
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.5
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.5

        i3 += 3
        i2 += 2
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    return geometry
  }, [videoTexture])

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime
      shaderRef.current.uniforms.uSeaLevel.value = seaLevel
    }
  })

  return (
    <points geometry={particles} position={position}>
      <coastalShaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        videoTexture={videoTexture}
        uSeaLevel={seaLevel}
        uTime={0}
      />
    </points>
  )
}

export default CoastalParticles
