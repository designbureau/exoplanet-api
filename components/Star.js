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
  const camera = useThree((state) => state.camera);

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.00015;
    noise.current.scale += Math.sin(delta * 0.5) * 0.1;
    glow.current.quaternion.setFromRotationMatrix(camera.matrix);
  });
  // Return view, these are regular three.js elements expressed in JSX
  const starNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_sun_bw2.jpg"
  );
  starNormalTexture.encoding = THREE.sRGBEncoding;

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

  const lightRef = useRef();
  // console.log(chroma.temperature(temperature));

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
              intensity={1.75}
              power={2}
              bias={0.1}
            />
            {/* <Noise ref={noise2} mapping={"local"} scale={1} type={"curl"} mode={"multiply"} alpha={0.2} /> */}
            <Noise
              ref={noise}
              mapping={"local"}
              scale={scale * (scale / 25)}
              type={"perlin"}
              mode={"multiply"}
              alpha={0.25}
            />
          </LayerMaterial>
        </mesh>
      </Select>
      <Select>{useMemo(() => Planets, [Planets])}</Select>
      <sprite
        position={[
          props.position[0],
          props.position[1],
          props.position[2] + 0.1,
        ]}
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
            colorB="black"
            alpha={1}
            mode="normal"
            near={-2 * scale}
            far={1.5 * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={0.5}
            mode="add"
            near={-40 * scale}
            far={1.5 * 1.2 * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-15 * scale}
            far={1.5 * 0.7 * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-10 * scale}
            far={1.5 * 0.68 * scale}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </sprite>

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
