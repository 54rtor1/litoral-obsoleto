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
  precision mediump float;
  attribute vec3 velocity; // <- Add velocity attribute
  varying vec2 vUv;
  varying vec4 vColor;

  uniform sampler2D videoTexture;
  uniform float uSeaLevel;

  void main() {
    vUv = uv;

    vec4 texColor = texture2D(videoTexture, uv);

    // Move along random velocity direction
    vec3 newPosition = position + velocity * uSeaLevel * 5.0; // (multiplier controls explosion intensity)

    vColor = texColor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 1.5;
  }
  `,
  // Fragment Shader
  `
  precision mediump float;
  varying vec2 vUv;
  varying vec4 vColor;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;

    gl_FragColor = vColor;
  }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
