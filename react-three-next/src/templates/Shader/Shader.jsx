'use client'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const CoastalShaderMaterial = shaderMaterial(
  {
    uSeaLevel: 0,
    videoTexture: new THREE.Texture(),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D videoTexture;
  uniform float uSeaLevel;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 dir = vUv - center;
    float dist = length(dir);

    // Stretch UVs outward
    vec2 distortedUV = vUv + dir * uSeaLevel * 0.5; // heavier distortion

    // Sample base color
    vec4 baseColor = texture2D(videoTexture, distortedUV);

    // Create glow around the edges
    float glow = smoothstep(0.3, 0.7, dist + uSeaLevel * 0.5);

    // Soften color at borders
    vec4 glowColor = vec4(baseColor.rgb, 1.0 - glow);

    // Blend baseColor and glowColor
    vec4 finalColor = mix(glowColor, baseColor, 1.0 - dist);

    // Fade everything out with seaLevel
    finalColor.a *= smoothstep(1.0, 0.0, uSeaLevel);

    gl_FragColor = finalColor;
  }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
