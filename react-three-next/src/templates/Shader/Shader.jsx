'use client'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const CoastalShaderMaterial = shaderMaterial(
  {
    time: 0,
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
  // Fragment shader
  `
   precision mediump float;
    varying vec2 vUv;
    uniform sampler2D videoTexture;
    uniform float uSeaLevel;
    uniform float time;

    void main() {
      // Create distortion effect
      vec2 distortedUV = vUv;
      distortedUV.x += sin(vUv.y * 10.0 + time) * 0.02 * uSeaLevel;
      distortedUV.y += cos(vUv.x * 10.0 + time) * 0.02 * uSeaLevel;

      // Sample textures
      vec4 original = texture2D(videoTexture, vUv);
      vec4 distorted = texture2D(videoTexture, distortedUV);

      // Calculate dissolve effect
      float dissolve = smoothstep(0.0, 1.0, uSeaLevel);

      // Final color mix
      gl_FragColor = mix(
        original,
        vec4(distorted.rgb * (1.0 - dissolve), original.a),
        dissolve
      );
    }
  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
