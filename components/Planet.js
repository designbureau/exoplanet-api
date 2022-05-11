import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState } from 'react'

const Planet = (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hover and active state
    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
    // Return view, these are regular three.js elements expressed in JSX
    const planetNormalTexture = useLoader(TextureLoader, "/textures/2k_neptune.jpeg");
    

    console.log(mesh);

    return (
      <mesh
        {...props}
        ref={mesh}
        name={props.name}
        // scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[.1, 64, 64]} />
        <meshBasicMaterial map={planetNormalTexture} color={hover ? 'hotpink' : 'white'} />
      </mesh>
    )
}

export default Planet;
  