import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState } from 'react'

const Star = (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hover and active state
    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
    // Return view, these are regular three.js elements expressed in JSX
    const starNormalTexture = useLoader(TextureLoader, "/textures/8k_sun.jpeg");
    
    return (
      <mesh
        {...props}
        ref={mesh}
        // scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={starNormalTexture} color={active ? 'blue' : 'white'} />
        {/* <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} /> */}
      </mesh>
    )
}

export default Star;
  