import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    videoTexture: new THREE.Texture(),
  },
  vertex,
  fragment
)

extend({ ShaderImpl })

export default ShaderImpl
