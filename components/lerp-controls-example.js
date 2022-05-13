import * as THREE from 'three'
import { useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import randomColor from 'randomcolor'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })
const randomPos = (min = 5, max = -5) => Math.random() * (max - min) + min

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

function Cloud({ momentsData, zoomToView }) {
  return momentsData.map(({ position, color }, i) => (
    <mesh key={i} position={position} onClick={(e) => zoomToView(e.object.position)}>
      <boxGeometry args={[0.1, 0.08, 0.003]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ))
}

export default function App() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const momentsArray = useMemo(() => Array.from({ length: 500 }, () => ({ color: randomColor(), position: [randomPos(), randomPos(), randomPos()] })), [])
  return (
    <Canvas linear camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
      <Cloud momentsData={momentsArray} zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))} />
      <Controls zoom={zoom} focus={focus} />
    </Canvas>
  )
}
