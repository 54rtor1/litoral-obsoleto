'use client'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const CoastalShaderMaterial = shaderMaterial(
  {
    uSeaLevel: 0,
    uTime: 0,
    uVariant: 0,
    videoTexture: new THREE.Texture(),
  },
  /* Vertex Shader */
  `precision highp float;

  uniform float uTime;
  uniform float uSeaLevel;
  uniform float uVariant;
  attribute vec3 velocity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 displacedPosition = position;

    displacedPosition.x += sin(uTime + velocity.x * 10.0 + uVariant) * 0.02;
    displacedPosition.y += cos(uTime + velocity.y * 10.0 + uVariant) * 0.02;

    float visualSeaLevel = pow(uSeaLevel, 0.8);
    displacedPosition += velocity * visualSeaLevel * 10.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    gl_PointSize = 1.2 + uSeaLevel * 1.5;
  }`,
  /* Fragment Shader */
  `precision highp float;

  uniform sampler2D videoTexture;
  uniform float uSeaLevel;
  uniform float uVariant;

  varying vec2 vUv;
  varying vec3 vPosition;

  float starShape(vec2 uv, int spikes, float innerRadius, float outerRadius) {
    vec2 centerUv = uv - 0.5;
    float angle = atan(centerUv.y, centerUv.x);
    float radius = length(centerUv);
    float spike = abs(cos(float(spikes) * angle));
    float starRadius = mix(innerRadius, outerRadius, spike);
    return smoothstep(starRadius, starRadius - 0.02, radius);
  }

  vec3 enhanceColor(vec3 color, float satBoost, float contrast, float brightness) {
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, satBoost);
    color = (color - 0.5) * contrast + 0.5;
    color *= brightness;
    return color;
  }

  void main() {
    float star = starShape(gl_PointCoord, 5, 0.2, 0.8);
    if (star < 0.1) discard;

    vec4 texColor = texture2D(videoTexture, vUv);

    float saturation = 1.4 + 0.2 * uVariant;
    float contrast = 1.2 + 0.1 * mod(uVariant, 2.0);
    float brightness = 1.0 + 0.15 * sin(uVariant * 3.14);

    vec3 enhancedColor = enhanceColor(texColor.rgb, saturation, contrast, brightness);

    vec3 tintA = vec3(0.6 + 0.1 * uVariant, 0.4, 1.0 - 0.1 * uVariant);
    enhancedColor = mix(enhancedColor, tintA, uSeaLevel * 0.7);

    float distanceFromCenter = length(vPosition.xy);
    float colorMixStrength = smoothstep(0.0, 1.0, distanceFromCenter * 0.1);
    vec3 gradientColor = mix(vec3(0.0, 0.8, 1.0), vec3(1.0, 0.2, 0.6), colorMixStrength);

    enhancedColor = mix(enhancedColor, gradientColor, colorMixStrength);

    float opacity = 1.0 - smoothstep(0.0, 1.0, distanceFromCenter * 0.5);
    float blurFactor = pow(uSeaLevel, 2.5) * 0.5;

    gl_FragColor = vec4(enhancedColor + blurFactor, opacity);
  }`
)



extend({ CoastalShaderMaterial })

export default CoastalShaderMaterial
