/* eslint-disable no-console */
import * as THREE from 'three'
import { useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import useScrollStore from '@/stores/scrollStore'
import { scenarios } from '@/stores/scenarioStore'
import CoastalShaderMaterial from '@/templates/Shader/Shader.jsx'
import useScenarioStore from '@/stores/scenarioStore'


function CoastalParticles({ videoUrl, index = 0, position = [0, 0, 0] }) {
  const shaderRef = useRef()
  const seaLevel = useScrollStore((state) => state.seaLevel);
  const targetSeaLevel = useScrollStore((state) => state.targetSeaLevel);
  const variantRef = useRef(index)
  const { scenario } = useScenarioStore()
  const setYear = useScrollStore((state) => state.setYear);


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

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uVariant.value = Object.keys(scenarios).indexOf(scenario);
      shaderRef.current.uniforms.uSeaLevel.value = targetSeaLevel;
    }
  }, [scenario, targetSeaLevel]);

  const particles = useMemo(() => {
    const count = 512 * 512
    const positions = new Float32Array(count * 3)
    const uvs = new Float32Array(count * 2)
    const velocities = new Float32Array(count * 3)

    const aspectRatio = videoTexture?.image
      ? videoTexture.image.videoWidth / videoTexture.image.videoHeight
      : 1

    let i3 = 0
    let i2 = 0
    for (let i = 0; i < 512; i++) {
      for (let j = 0; j < 512; j++) {
        const baseX = ((i / 512) * 2 - 1) * aspectRatio
        const baseY = (j / 512) * 2 - 1

        positions[i3] = baseX
        positions[i3 + 1] = baseY
        positions[i3 + 2] = 0

        uvs[i2] = i / 512
        uvs[i2 + 1] = j / 512

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

  useFrame(() => {
    useScrollStore.getState().updateSeaLevel();

    if (shaderRef.current) {
      shaderRef.current.uniforms.uSeaLevel.value = useScrollStore.getState().seaLevel;
    }
  });



  return (
    <points geometry={particles} position={position}>
      <coastalShaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        videoTexture={videoTexture}
        uSeaLevel={seaLevel}
        uTime={0}
        uVariant={index}
      />
    </points>
  )
}

export default CoastalParticles
