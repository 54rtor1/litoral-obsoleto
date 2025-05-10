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

    // Keep contrast the same across all scenarios
    float contrast = 1.6;

    // Scenario 1: Optimistic (more saturated, warmer, purplish tones)
    float satOptimistic = 2.2 - 0.2 * uVariant; // Higher saturation, more purplish
    float brightnessOptimistic = 1.2 + 0.5 * sin(uVariant * 1.57); // More brightness

    // Scenario 2: Pessimistic (less saturated, cooler, purplish tones)
    float satPessimistic = 1.5 + 0.2 * uVariant; // Slightly less saturated, cooler tones
    float brightnessPessimistic = 1.0 + 0.1 * sin(uVariant * 1.57); // Slightly less bright

    // Scenario 3: Default (slightly more faded, purplish, less saturated)
    float satDefault = 1.2 - 0.4 * uVariant; // Decreased saturation for more faded look
    float brightnessDefault = 1.05 + 0.05 * sin(uVariant * 1.57); // Slightly faded brightness

    // Color enhancement based on scenarios
    vec3 enhancedColor;
    if (uVariant < 1.0) {
      enhancedColor = enhanceColor(texColor.rgb, satOptimistic, contrast, brightnessOptimistic); // Optimistic
    } else if (uVariant < 2.0) {
      enhancedColor = enhanceColor(texColor.rgb, satPessimistic, contrast, brightnessPessimistic); // Pessimistic
    } else {
      enhancedColor = enhanceColor(texColor.rgb, satDefault, contrast, brightnessDefault); // Default
    }

    // Purple-leaning color tints
    vec3 scenarioTints[3];
    scenarioTints[0] = vec3(0.6, 0.8, 1.0); // Optimistic: purplish tones
    scenarioTints[1] = vec3(0.6, 0.7, 1.0); // Pessimistic: cooler purplish tones
    scenarioTints[2] = vec3(0.7, 0.5, 0.9); // Default: purplish but more faded

    // Applying the tint based on the scenario
    vec3 tint = scenarioTints[int(mod(uVariant, 3.0))];

    enhancedColor = mix(enhancedColor, tint, 0.3 + 0.5 * uSeaLevel);

    // Additional gradient effect
    float distanceFromCenter = length(vPosition.xy);
    float colorMixStrength = smoothstep(0.0, 1.0, distanceFromCenter * 0.1);
    vec3 gradientColor = mix(vec3(0.2, 0.6, 0.9), vec3(0.5, 0.5, 0.7), colorMixStrength);

    enhancedColor = mix(enhancedColor, gradientColor, colorMixStrength * 0.4);

    float opacity = 1.0 - smoothstep(0.0, 1.0, distanceFromCenter * 0.5);
    float blurFactor = pow(uSeaLevel, 2.5) * 0.5;

    gl_FragColor = vec4(enhancedColor + blurFactor, opacity);
  }`
)

extend({ CoastalShaderMaterial })
export default CoastalShaderMaterial
