import { useFrame } from '@react-three/fiber'
import { useRef, useState, useContext} from 'react'
import { EnvContext } from './EnvContext'
import PlanetTexture from './PlanetTextures'

const Planet = (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hover and active state
    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
    // Return view, these are regular three.js elements expressed in JSX
    // const planetNormalTexture = useLoader(TextureLoader, "/textures/8k_jupiter.jpeg");
    
    const constants = useContext(EnvContext);

    // console.log(mesh);
    console.log("planet details", props.planetDetails);

    // let radius = props.planetDetail.radius._ ? props.planetDetail.radius[0]._ : 0.5;

    // if(mesh){
    //   props.refs.current.push(mesh);
    // }
    // console.log(props.refs)

    mesh.current && props.refs.current.push(mesh)



    let radius;
    if (props.planetDetails.hasOwnProperty("radius")) {
      if (props.planetDetails.radius.hasOwnProperty("_")) {
        radius = parseFloat(props.planetDetails.radius._);
      }
    }
    let mass;
    if (props.planetDetails.hasOwnProperty("mass")) {
      if (Array.isArray(props.planetDetails.mass)) {
        // console.log("is array");
        if(props.planetDetails.mass[0].hasOwnProperty("_")){
          mass = parseFloat(props.planetDetails.mass[0]._);
        }
      }
      if (props.planetDetails.mass.hasOwnProperty("_")) {
        mass = parseFloat(props.planetDetails.mass._);
      }
    }

    let scale = 1;

    if(radius){
        scale = radius;
    }
    if(mass){
        scale = mass;
    }

    // scale = scale / constants.mass.jupiter;


    const planetTexture = PlanetTexture(mass, radius);

    // props.refs.current.push(mesh);


    return (
      <mesh
        {...props}
        ref={mesh}
        name={props.name}
        // scale={active ? 1.5 : 1}
        // onClick={(event) => setActive(!active)}
        onClick={(e) => {
          props.setCameraPosition(props.position)
          props.setFocus(mesh)
          console.log("clicked mesh", mesh);
          console.log("context from planet", constants.distance.au);
          console.log("planet scale", scale);

        }}
        castShadow={true}
        receiveShadow={true}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[(scale), 256, 256]} />
        <meshStandardMaterial map={planetTexture} color={hover ? '#FFEEEE' : 'white'} />
      </mesh>
    )
}

export default Planet;
  