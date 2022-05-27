import { useFrame } from "@react-three/fiber";
import { Select, Selection, EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useRef, useState, useContext } from "react";
import { EnvContext } from "./EnvContext";
import PlanetTexture from "./PlanetTextures";
import { getEllipse } from "./HelperFunctions";

const Planet = (props) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hover and active state
  // const [hover, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  const semimajoraxis = props.planetDetails.semimajoraxis[0] * 0.001;
  const period = props.planetDetails.period[0];
  const eccentricity = props.planetDetails.eccentricity[0];
  const inclination = props.planetDetails.inclination[0];
  const periastron = props.planetDetails.periastron[0];
  const ellipse = getEllipse(semimajoraxis, eccentricity);
  const speed = 100;


  console.log({semimajoraxis})
  console.log({ellipse});

  useFrame((state, delta) => {
    
    meshRef.current.rotation.y += 0.001;
    
    meshRef.current.position.x += ellipse.xRadius * Math.cos((period) * speed);
    meshRef.current.position.y += ellipse.yRadius * Math.sin((period) * speed);
    // console.log(meshRef.current.position.x);
    // planet.mesh.rotation.y = Math.PI * 0.005 * elapsedTime;

  });
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

  // mesh.current && props.refs.current.push(mesh);

  let radius;
  if (props.planetDetails.hasOwnProperty("radius")) {
    if (props.planetDetails.radius.hasOwnProperty("_")) {
      radius = parseFloat(props.planetDetails.radius._);
    }
    else{
      radius = parseFloat(props.planetDetails.radius);
    }
  }
  let mass;
  if (props.planetDetails.hasOwnProperty("mass")) {
    if (Array.isArray(props.planetDetails.mass)) {
      // console.log("is array");
      if (props.planetDetails.mass[0].hasOwnProperty("_")) {
        mass = parseFloat(props.planetDetails.mass[0]._);
      }
    }
    if (props.planetDetails.mass.hasOwnProperty("_")) {
      mass = parseFloat(props.planetDetails.mass._);
    }
  }

  let scale = 1;

  if (radius) {
    scale = radius;
  }
  if (mass) {
    scale = mass;
  }

  // scale = scale / constants.mass.jupiter;

  const planetTexture = PlanetTexture(mass, radius, props.name);

  // props.refs.push(meshRef);


  let position = [semimajoraxis, 0, 0];

  // console.log(meshRef.position)

  return (
   
    <Selection>
       {/* <EffectComposer>
          <SelectiveBloom
            height={600}
            intensity={1} // The bloom intensity.
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
          />
        </EffectComposer> */}
      <Select>
      <mesh
      position={position}
      {...props}
      ref={meshRef}
      name={props.name}
      // scale={active ? 1.5 : 1}
      // onClick={(event) => setActive(!active)}
      onClick={(e) => {
        props.setCameraPosition([meshRef.current.position.x,meshRef.current.position.y,meshRef.current.position.z]);
        props.setFocus(meshRef);
        console.log("clicked mesh", meshRef);
        console.log(meshRef.current.position);
        // console.log("context from planet", constants.distance.au);
        // console.log("planet scale", scale);
      }}
      // castShadow={true}
      // receiveShadow={true}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[scale, 256, 256]} />
      <meshStandardMaterial
        map={planetTexture}
        // color={hover ? "#FFEEEE" : "white"}
      />
    </mesh>
      </Select>
    </Selection>
  );
};

export default Planet;
