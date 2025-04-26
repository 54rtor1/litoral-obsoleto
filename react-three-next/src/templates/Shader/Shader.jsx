'use client'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const CoastalShaderMaterial = shaderMaterial(
  {
    uSeaLevel: 0,
    uTime: 0,
    videoTexture: new THREE.Texture(),
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform float uSeaLevel;
    attribute vec3 velocity;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      vec3 displacedPosition = position;

      // Gently move particles over time
      displacedPosition.x += sin(uTime + velocity.x * 10.0) * 0.01;
      displacedPosition.y += cos(uTime + velocity.y * 10.0) * 0.01;

      // Apply spread based on scroll
      displacedPosition += velocity * uSeaLevel * 2.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
      gl_PointSize = 0.8;
    }
  `,
  // Fragment Shader
  `
    precision mediump float;
    uniform sampler2D videoTexture;
    varying vec2 vUv;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;

      vec4 color = texture2D(videoTexture, vUv);
      gl_FragColor = color;
    }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
