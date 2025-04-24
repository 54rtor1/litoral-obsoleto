'use client'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const CoastalShaderMaterial = shaderMaterial(
  {
    uSeaLevel: 0,
    videoTexture: new THREE.Texture(),
  },
  // Vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Simplified fragment shader
  `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D videoTexture;
  uniform float uSeaLevel;

  void main() {
    vec4 texColor = texture2D(videoTexture, vUv);
    // Directly control opacity with sea level
    texColor.a = 1.0 - uSeaLevel;
    gl_FragColor = texColor;
  }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
