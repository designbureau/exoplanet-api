import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { forwardRef, useRef, createRef, useState, useMemo, useContext } from "react";
import Planet from "./Planet";
import { EnvContext } from "./EnvContext";
import chroma from "chroma-js";
import {
  Noise,
  LayerMaterial,
  Depth,
  Fresnel,
  Displace,
  Gradient,
} from "lamina";
// import { Billboard } from "@react-three/drei";

// const ref = createRef();


// const Star = forwardRef(function Star(props, ref) {

const Star = (props) => {

  const constants = useContext(EnvContext);
  const starRef = useRef();
  // const starRef = useRef(ref);

  const layerMaterial = useRef();
  const glow = useRef();
  const group = useRef();
  const noise = useRef();
  const noise2 = useRef();
  const noise3 = useRef();
  const displace = useRef();
  const noiseSpot = useRef();
  const noiseSpot2 = useRef();
  const noiseSpot3 = useRef();
  const noiseSpot4 = useRef();
  const camera = useThree((state) => state.camera);
  const lightRef = useRef();



  useFrame((state, delta) => {
    starRef.current.rotation.y += 0.00005;
    // noise.current.scale += Math.sin(delta * 0.025);
    // noise2.current.scale += Math.sin(delta * 0.03);
    // noise3.current.scale += Math.sin(delta * 0.025);
    noiseSpot.current.scale += Math.sin(delta * 0.025);
    // noiseSpot2.current.scale += Math.sin(delta * 0.00125);
    // noiseSpot3.current.scale += Math.sin(delta * 0.00125);
    // noiseSpot4.current.scale += Math.sin(delta * 0.00125);
    // displace.current.scale += Math.sin(delta * 0.05);
    // camera.updateProjectionMatrix();
    glow.current.quaternion.setFromRotationMatrix(camera.matrix);

  });
  // Return view, these are regular three.js elements expressed in JSX
  // const starNormalTexture = useLoader(
  //   TextureLoader,
  //   "/textures/8k_sun_bw2.jpg"
  // );
  // starNormalTexture.encoding = THREE.sRGBEncoding;

  // console.log("star system props", props.starSystemData);

  const planetElements = useRef(new Array())

  // const arrLength = props.starSystemData.planet ? props.starSystemData.planet.length : 0;
  // console.log(arrLength);

  const Planets =
    props.starSystemData.planet && props.starSystemData.planet.map((planet) => {
      // let x = Math.random() * 50 - 1;
      // let y = Math.random() * 50 - 1;
      // let z = Math.random() * 50 - 1;

      return (
        <Planet
          key={planet.name[0]}
          // position={[x, y, z]}
          name={planet.name[0]}
          setCameraPosition={props.setCameraPosition}
          setFocus={props.setFocus}
          planetDetails={planet}
          refs={planetElements}
        />
      );
    });

    const system = {};

    system.star = starRef;
    system.planets = planetElements;

    props.refs.system = system;


    // console.log({system});



    
    // console.log({planetElements});
  // console.log("group mesh", group);
  // console.log("star mesh", mesh);
  // console.log("star position", props.position);
  // console.log(props);

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
      if (props.starSystemData.temperature[0].hasOwnProperty("_")) {
        temperature = parseFloat(props.starSystemData.temperature[0]._);
      }
    }
    if (props.starSystemData.temperature.hasOwnProperty("_")) {
      temperature = parseFloat(props.starSystemData.temperature._);
    }
  } else if (props.starSystemData.hasOwnProperty("spectraltype")) {
    spectraltype = props.starSystemData.spectraltype[0][0];
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
  let color_light = chroma
    .temperature(temperature + (temperature / 100) * 50)
    .hex("rgb");
  let color_dark = chroma
    .temperature(temperature - (temperature / 100) * 50)
    .hex("rgb");
  // console.log("light", color_light, "dark", color_dark);

  // console.log(chroma.temperature(temperature));

  // const SphereGeometry = useMemo((scale) => , []);

  let transformScale = Math.log(scale) + 20;
  // console.log(transformScale);
  // if( scale < 2){
  //   transformScale = scale * 50;
  // }
  let worldPosition = new THREE.Vector3();


  return <group ref={group} name={props.starSystemData.name[0]} position={props.position}>
      <pointLight
        ref={lightRef}
        
        color={color}
        intensity={0.7}
        distance={10000}
        castShadow
      />
        
        <group>
          <mesh
          // {...props}
          
          ref={starRef}
          name={props.starSystemData.name[0]}
          // scale={active ? 1.5 : 1}
          // onClick={(event) => setActive(!active)}
          onClick={(e) => {
            
            // setCurrentFocus(mesh);

            
            console.log("clicked mesh", starRef);
            // console.log("current pos", e.object.position)
            // console.log({vector})
            // console.log("world position", vector);

            let vector = new THREE.Vector3();
            e.object.getWorldPosition(vector);
            props.setCameraPosition([vector.x, vector.y , vector.z]);
            props.setFocus(starRef);
            // console.log("mesh position", starRef.current.position);
            // console.log("mesh world position", starRef.getWorldPosition());
            // console.log("clicked mesh group", group);
            // // console.log("context from star", constants.distance.au);
            // console.log("star scale", scale);
            // console.log("temperature", temperature);
            // console.log("chroma", color);
            // console.log("spectraltype", spectraltypeFull);
            e.stopPropagation();
          }}
          // onPointerOver={(event) => setHover(true)}
          // onPointerOut={(event) => setHover(false)}
        >
          <sphereGeometry args={[scale, 256, 256]} />
          <LayerMaterial ref={layerMaterial} color={color}>
            <Fresnel
              mode="softlight"
              color={color_light}
              intensity={3.5}
              power={1.8}
              bias={0.01}
            />
            <Noise
              ref={noise}
              mapping={"local"}
              scale={transformScale * 0.7}
              type={"perlin"}
              mode={"multiply"}
              alpha={0.5}
            />
            <Noise
              ref={noise3}
              mapping={"local"}
              type={"perlin"}
              mode={"subtract"}
              scale={transformScale * 0.08}
              alpha={0.1}
            />
            <Noise
              ref={noise2}
              mapping={"local"}
              scale={transformScale * 0.1}
              type={"perlin"}
              mode={"multiply"}
              alpha={0.25}
            />
             <Noise
              ref={noiseSpot}
              mapping={"local"}
              scale={transformScale * .01}
              type={"perlin"}
              mode={"multiply"}
              alpha={0.5}
            />
             <Noise
              ref={noiseSpot2}
              mapping={"local"}
              scale={transformScale * .1}
              type={"perlin"}
              mode={"subtract"}
              alpha={0.1}
            />
             <Noise
              ref={noiseSpot3}
              mapping={"local"}
              scale={transformScale * .0001}
              type={"perlin"}
              mode={"softlight"}
              alpha={0.25}
            />
            <Noise
              ref={noiseSpot4}
              mapping={"local"}
              scale={transformScale * .0001}
              type={"perlin"}
              mode={"overlay"}
              alpha={0.75}
              colorD={color}
            />
            <Displace ref={displace} strength={0.025} scale={transformScale} type={"perlin"} />
          </LayerMaterial>
        </mesh>
        <sprite
          // position={[
          //   props.position[0],
          //   props.position[1],
          //   props.position[2] + 0.1,
          // ]}
          ref={glow}
        >
          <circleGeometry args={[2 * scale, 128]} />
          <LayerMaterial
            transparent
            depthWrite={false}
            blending={THREE.CustomBlending}
            blendEquation={THREE.AddEquation}
            blendSrc={THREE.SrcAlphaFactor}
            blendDst={THREE.DstAlphaFactor}
          >
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={1}
              mode="normal"
              near={-5 * scale}
              far={1.5 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={1}
              mode="add"
              near={-1 * scale}
              far={1.125 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={0.45}
              mode="add"
              near={-1 * scale}
              far={1.15 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={0.35}
              mode="add"
              near={-1 * scale}
              far={1.25 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={0.25}
              mode="add"
              near={-1 * scale}
              far={1.35 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB={"black"}
              alpha={0.005}
              mode="softlight"
              near={-1 * scale}
              far={1.85 * scale}
              origin={[0, 0, 0]}
            />
          </LayerMaterial>
        </sprite></group>

      {Planets}
      
    </group>

};

export default Star;
