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

      displacedPosition += velocity * uSeaLevel * 24.0;

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

// Function to create a star shape
float starShape(vec2 uv, int spikes, float innerRadius, float outerRadius) {
  vec2 centerUv = uv - 0.5; // Move (0,0) -> center
  float angle = atan(centerUv.y, centerUv.x);
  float radius = length(centerUv);

  float spike = abs(cos(float(spikes) * angle));
  float starRadius = mix(innerRadius, outerRadius, spike);

  return smoothstep(starRadius, starRadius - 0.02, radius);
}

void main() {
  // Create a star shape mask
  float star = starShape(gl_PointCoord, 5, 0.2, 0.5); // 5 spikes, can tweak

  if (star < 0.1) discard; // Discard outside the star

  vec4 color = texture2D(videoTexture, vUv);

  float brightness = 1.0;
  color.rgb *= brightness;

  vec3 tintColor = vec3(0.8, 0.6, 1.0);
  float tintStrength = uSeaLevel * 0.9;
  color.rgb = mix(color.rgb, tintColor, tintStrength);

  float distanceFromCenter = length(vPosition.xy);
  float colorMixStrength = smoothstep(0.0, 1.0, distanceFromCenter * 0.1);

  vec3 startColor = vec3(0.0, 0.8, 1.0);
  vec3 endColor = vec3(1.0, 0.2, 0.6);
  vec3 gradientColor = mix(startColor, endColor, colorMixStrength);

  color.rgb = mix(color.rgb, gradientColor, colorMixStrength);

  float opacity = 1.0 - smoothstep(0.0, 1.0, distanceFromCenter * 0.5);
  color.a *= opacity;

  float blurFactor = pow(uSeaLevel, 2.5) * 0.5;
  color.rgb += blurFactor;

  gl_FragColor = color;
}

  `
)

extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
