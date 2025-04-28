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
    precision highp float;

    uniform float uTime;
    uniform float uSeaLevel;
    attribute vec3 velocity;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;

      vec3 displacedPosition = position;

      displacedPosition.x += sin(uTime + velocity.x * 10.0) * 0.02;
      displacedPosition.y += cos(uTime + velocity.y * 10.0) * 0.02;

      // Spread based on scroll
      displacedPosition += velocity * uSeaLevel * 3.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
      gl_PointSize = 1.2 + uSeaLevel * 1.5;
    }
  `,
  // Fragment Shader
  `
    precision highp float;

    uniform sampler2D videoTexture;
    uniform float uSeaLevel;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec4 color = texture2D(videoTexture, vUv);

      // Keep the video readable
      float brightness = 1.0;
      color.rgb *= brightness;

      // Add very soft tint based on scroll
      vec3 tintColor = vec3(0.8, 0.6, 1.0);
      float tintStrength = uSeaLevel * 0.2;
      color.rgb = mix(color.rgb, tintColor, tintStrength);

      gl_FragColor = color;
    }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
