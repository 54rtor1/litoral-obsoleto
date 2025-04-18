'use client'

import { useGLTF } from '@react-three/drei'


export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}
