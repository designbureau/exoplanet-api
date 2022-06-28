import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { forwardRef, useRef, createRef, useState, useMemo, useContext, useEffect, useLayoutEffect } from "react";
import Planet from "./Planet";
import { EnvContext } from "./EnvContext";
import chroma from "chroma-js";
import {
  Noise,
  LayerMaterial,
  Depth,
  Fresnel,
  Displace,
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




  const planetElements = useRef(new Array())

  const Planets =
    props.starSystemData.planet && props.starSystemData.planet.map((planet) => {
      return (
        <Planet
          key={planet.name[0]}
          // position={[x, y, z]}
          name={planet.name[0]}
          setFocus={props.setFocus}
          setClicked={props.setClicked}
          setDragged={props.setDragged}
          planetDetails={planet}
          setViewState={props.setViewState}
          setRefsArray={props.setRefsArray}
          refs={planetElements}
        />
      );
    });

      // const system = {};
      // system.star = starRef;
      // system.planets = planetElements;
      // props.refs.current.push(system);
      // console.log("ref added");


      // Push element at end of object of arrays
      // let specificArrayInObject = theObject.array.slice();
      // specificArrayInObject.push(newValue);
      // const newObj = { ...theObject, [event.target.name]: specificArrayInObject };
      // theObject(newObj);

      //TODO: refactor this so its updating the array correctly.
      // props.setRefsArray(system);

      useEffect(() => {

        const system = {};
        system.star = starRef;
        system.planets = planetElements;
        props.refs.current.push(system);
        console.log("ref added");
        props.setRefsArray(system);

      }, [props]);


  let radius;
  if (props.starSystemData.hasOwnProperty("radius")) {
    if (props.starSystemData.radius.hasOwnProperty("_")) {
      radius = parseFloat(props.starSystemData.radius._);
    }
    if (Array.isArray(props.starSystemData.radius)) {
      if (props.starSystemData.radius[0].hasOwnProperty("_")) {
        radius = parseFloat(props.starSystemData.radius[0]._);
      }
      else{
        radius = parseFloat(props.starSystemData.radius[0]);
      }
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

  if (mass) {
    scale = mass;
    console.log("star mass", mass)
  }

  if (radius) {
    scale = radius;
    console.log("star radius", radius)
  }

  scale = scale * constants.radius.sol * constants.radius.scale;
  // scale = scale * constants.radius.sol;

  console.log("scale final", scale);

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

  // let transformScale = Math.log(scale) + 20;
  let transformScale = scale * 0.01;
  // console.log(transformScale);
  // if( scale < 2){
  //   transformScale = scale * 50;
  // }

  let start, end, delta;


  useFrame((state, delta) => {
    starRef.current.rotation.y += 0.00005;
    const elapsedTime = state.clock.getElapsedTime();
    // noise.current.scale += Math.sin(delta * 0.025);
    // noise2.current.scale += Math.sin(delta * 0.03);
    // noise3.current.scale += Math.sin(delta * 0.025);
    noiseSpot.current.scale = Math.sin(elapsedTime * 0.00125);
    // noiseSpot2.current.scale += Math.sin(delta * 0.00125);
    // noiseSpot3.current.scale += Math.sin(delta * 0.00125);
    // noiseSpot4.current.scale += Math.sin(delta * 0.00125);
    // displace.current.scale += Math.sin(delta * 0.05);
    // camera.updateProjectionMatrix();
    glow.current.quaternion.setFromRotationMatrix(camera.matrix);
  });


  return <group ref={group} name={props.starSystemData.name[0]} position={props.position}>
      <pointLight
        ref={lightRef}
        
        color={color}
        intensity={0.7}
        distance={30000}
      />
        
        <group>
          <mesh
          // {...props}
          
          ref={starRef}
          name={props.starSystemData.name[0]}
          // scale={active ? 1.5 : 1}
          // onClick={(event) => setActive(!active)}
          onPointerDown={(e) => {
            console.log(e)
            start = new Date();
          }}
          onPointerUp={(e) => {
            end = new Date();
            delta = (end - start) / 1000.0;
            console.log(delta);
            if(delta > .3){
              console.log("drag");
              props.setDragged(true);
            }
          }}
          onClick={(e) => {
            console.log("clicked mesh", starRef);
            let vector = new THREE.Vector3();
            e.object.getWorldPosition(vector);
            props.setFocus(starRef);
            props.setClicked(true);
            props.setViewState({
              focus: starRef,
              clicked: true
            });
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
              scale={transformScale * 2}
              type={"perlin"}
              mode={"multiply"}
              alpha={0.25}
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
              alpha={0.25}
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
              scale={transformScale * .00025}
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
            {/* <Displace ref={displace} strength={0.0125} scale={transformScale} type={"perlin"} /> */}
          </LayerMaterial>
        </mesh>
        <sprite ref={glow} >
          {/* <circleGeometry args={[2 * scale, 128]} /> */}
          <ringGeometry args={[scale, 2 * scale, 128]}/>
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
