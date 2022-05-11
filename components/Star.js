import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState } from 'react'
import Planet from './Planet'

const Star = (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    const group = useRef()
    // Set up state for the hover and active state
    // const [hover, setHover] = useState(false)
    // const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
    // Return view, these are regular three.js elements expressed in JSX
    const starNormalTexture = useLoader(TextureLoader, "/textures/8k_sun.jpeg");
    
    // console.log("props", props.starSystemData);

    const Planets = props.starSystemData.planet && props.starSystemData.planet.map((planet) => {

      let x = Math.random() * 6 - 1;
      let y = Math.random() * 6 - 1;
      let z = Math.random() * 6 - 1;

      return <Planet key={planet.name[0]} position={[x,y,z]} name={planet.name[0]} />  
    });

    console.log("group mesh", group);
    console.log("star mesh", mesh);

    console.log("star position", props.position);

    console.log(props);

    return (
      <group ref={group} name={props.starSystemData.name[0]}> 
        <mesh
          {...props}
          ref={mesh}
          name={props.starSystemData.name[0]}
          // scale={active ? 1.5 : 1}
          // onClick={(event) => setActive(!active)}
          onClick={() => props.setCameraPosition(props.position)}
          // onPointerOver={(event) => setHover(true)}
          // onPointerOut={(event) => setHover(false)}
          >
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial map={starNormalTexture} />
          {/* <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} /> */}
        </mesh>
        {Planets}
      </group>
    )
}

export default Star;
  