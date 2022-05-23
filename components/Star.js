import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useState, useMemo, useContext } from "react";
import Planet from "./Planet";
import { EnvContext } from "./EnvContext";
import chroma from "chroma-js";
import {
  EffectComposer,
  SelectiveBloom,
  Selection,
  Select,
} from "@react-three/postprocessing";
import { Color, Noise, Texture } from "lamina";
// import { Billboard } from "@react-three/drei";
import {
  LayerMaterial,
  Depth,
  Base,
  Fresnel,
  Displace,
  Gradient,
} from "lamina";
import { Billboard } from "@react-three/drei";

const Star = (props) => {
  const constants = useContext(EnvContext);
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const layerMaterial = useRef();
  const glow = useRef();
  const group = useRef();
  const noise = useRef();
  const noise2 = useRef();
  const noise3 = useRef();
  const displace = useRef();
  const camera = useThree((state) => state.camera);

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.00015;
    noise.current.scale += Math.sin(delta * 0.025);
    noise2.current.scale += Math.sin(delta * 0.03);
    noise3.current.scale += Math.sin(delta * 0.025);
    // displace.current.scale += Math.sin(delta * 0.05);

    mesh.current.rotation.x += 0.00005;

    // glow.current.quaternion.setFromRotationMatrix(camera.matrix);
  });
  // Return view, these are regular three.js elements expressed in JSX
  const starNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_sun_bw2.jpg"
  );
  starNormalTexture.encoding = THREE.sRGBEncoding;

  // console.log("star system props", props.starSystemData);

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
  console.log("light", color_light, "dark", color_dark);

  const lightRef = useRef();
  // console.log(chroma.temperature(temperature));

  // const SphereGeometry = useMemo((scale) => , []);

  let transformScale = Math.log(scale) + 20;
  // console.log(transformScale);
  // if( scale < 2){
  //   transformScale = scale * 50;
  // }

  return (
    <group ref={group} name={props.starSystemData.name[0]}>
      <EffectComposer>
        {/* <SelectiveBloom
            lights={lightRef}
            height={500}
            intensity={2} // The bloom intensity.
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.9} // smoothness of the luminance threshold. Range is [0, 1]
          /> */}
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
            // setCurrentFocus(mesh);
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
            {/* <Displace ref={displsace} strength={0.1} scale={transformScale * 0.7} type={"perlin"} /> */}
          </LayerMaterial>
        </mesh>
      </Select>
      <Select>{useMemo(() => Planets, [Planets])}</Select>
      {/* <sprite
        position={[
          props.position[0],
          props.position[1],
          props.position[2] + 0.1,
        ]}
        ref={glow}
      >
        <circleGeometry args={[.8 * scale, 128]} />
        <LayerMaterial
          transparent
          depthWrite={false}
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendSrc={THREE.SrcAlphaFactor}
          blendDst={THREE.DstAlphaFactor}
        >
          //<Displace ref={displace} strength={10} scale={scale * 0.7} type={"perlin"} />
          <Depth
            colorA={color}
            colorB={"black"}
            alpha={1}
            mode="normal"
            near={-2 * scale}
            far={1.5 * scale}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </sprite> */}

      <pointLight
        ref={lightRef}
        position={props.position}
        color={color}
        intensity={0.7}
        distance={1000}
        castShadow
      />
    </group>
  );
};

export default Star;
