import * as THREE from 'three'
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useState, useMemo, useContext } from "react";
import Planet from "./Planet";
import { EnvContext } from "./EnvContext";
import chroma from "chroma-js";
// import BloomEffect from './BloomPass';
import { EffectComposer, SelectiveBloom, Noise, Selection, Select } from '@react-three/postprocessing'




const Star = (props) => {
  const constants = useContext(EnvContext);
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const group = useRef();
  // Set up state for the hover and active state
  const [hover, setHover] = useState(false);
  // const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += 0.001));
  // Return view, these are regular three.js elements expressed in JSX
  const starNormalTexture = useLoader(TextureLoader, "/textures/8k_sun_bw2.jpg");
  starNormalTexture.encoding= THREE.sRGBEncoding;

  console.log("star system props", props.starSystemData);

  //TODO: nest planet refs in array under star. Forwardrefs?
  const planetsArray = [];
  
  const Planets =
    props.starSystemData.planet &&
    props.starSystemData.planet.map((planet) => {
      let x = Math.random() * 50 - 1;
      let y = Math.random() * 50 - 1;
      let z = Math.random() * 50 - 1;

      return (
        <Planet
          key={planet.name[0]}
          position={[x, y, z]}
          name={planet.name[0]}
          setCameraPosition={props.setCameraPosition}
          setFocus={props.setFocus}
          planetDetails={planet}
          refs={props.refs}
        />
      );
    });

  // console.log("group mesh", group);
  // console.log("star mesh", mesh);
  // console.log("star position", props.position);
  // console.log(props);

  // {items.map(item => (
  //  <p key={item} ref={(element) => itemEls.current.push(element)}>{item}</p>
  // console.log("starrefs", props.starRefs);

  // props.refs.current.push(mesh);






  
  let radius;
  if (props.starSystemData.hasOwnProperty("radius")) {
    if (props.starSystemData.radius.hasOwnProperty("_")) {
      radius = parseFloat(props.planetDetails.radius._);
    }
  }
  let mass;
  if (props.starSystemData.hasOwnProperty("mass")) {
    if (Array.isArray(props.starSystemData.mass)) {
      // console.log("is array");
      if (props.starSystemData.mass[0].hasOwnProperty("_")) {
        mass = parseFloat(props.starSystemData.mass[0]._);
      }
    }
    if (props.starSystemData.mass.hasOwnProperty("_")) {
      mass = parseFloat(props.starSystemData.mass._);
    }
  }

  let scale = 1;
  if (radius) {
    scale = radius;
  }
  if (mass) {
    scale = mass;
  }
  scale = scale * constants.radius.sol * 100;

  let temperature = 6500;
  let spectraltype;


  if (props.starSystemData.hasOwnProperty("temperature")) {
    if (Array.isArray(props.starSystemData.temperature)) {
      // console.log("is array");
      if (props.starSystemData.temperature[0].hasOwnProperty("_")) {
        temperature = parseFloat(props.starSystemData.temperature[0]._);
      }
    }
    if (props.starSystemData.temperature.hasOwnProperty("_")) {
      temperature = parseFloat(props.starSystemData.temperature._);
    }
  } else if (props.starSystemData.hasOwnProperty("spectraltype")) {
    spectraltype = props.starSystemData.spectraltype[0][0];
    // console.log("spectraltype", spectraltype);
    switch (spectraltype) {
      case "M":
        temperature = 3000;
        break;
      case "K":
        temperature = 4500;
        break;
      case "G":
        temperature = 5500;
        break;
      case "F":
        temperature = 6500;
        break;
      case "A":
        temperature = 8000;
        break;
      case "B":
        temperature = 20000;
        break;
      case "O":
        temperature = 40000;
        break;
      default:
        temperature = 6500;
        break;
    }
  }

  let spectraltypeFull;
  if (props.starSystemData.hasOwnProperty("spectraltype")) {
    spectraltypeFull = props.starSystemData.spectraltype[0];
  }

  let color = chroma.temperature(temperature).hex("rgb");
  // color.convertGammaToLinear( 2.2 );
  // console.log("temperature", temperature);
  // console.log("chroma", color);
  const lightRef = useRef();


  return (
    <group ref={group} name={props.starSystemData.name[0]}>

      <Selection>
        <EffectComposer>
        <SelectiveBloom lights={lightRef} luminanceThreshold={0} luminanceSmoothing={0.9} height={400} />
        {/* <Noise opacity={0.02} /> */}
      </EffectComposer>
        <Select enabled>
          <mesh
            {...props}
            ref={mesh}
            name={props.starSystemData.name[0]}
            // scale={active ? 1.5 : 1}
            // onClick={(event) => setActive(!active)}
            onClick={(e) => {
              props.setCameraPosition(props.position);
              props.setFocus(mesh);
              console.log("clicked mesh", mesh);
              console.log("clicked mesh group", group);
              // console.log("context from star", constants.distance.au);
              console.log("star scale", scale);
              console.log("temperature", temperature);
              console.log("chroma", color);
              console.log("spectraltype", spectraltypeFull);
            }}
            // onPointerOver={(event) => setHover(true)}
            // onPointerOut={(event) => setHover(false)}
          >
            {useMemo(() => <sphereGeometry args={[scale, 256, 256]} />, [])}
            {useMemo(() => <meshBasicMaterial
              map={starNormalTexture}
              color={hover ? "#CCAAAA" : color}
            />, [])}
          </mesh>
          <pointLight ref={lightRef}
            position={props.position}
            color={color}
            intensity={0.7}
            distance={1000}
            castShadow
          />

        </Select>
        <Select>
         {useMemo(() => Planets, [Planets])}
        </Select>
      </Selection>  


        
    </group>
  );
};

export default Star;
