// import Head from "next/head";
import Nav from "../components/Nav";
import * as THREE from 'three'
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { Canvas, useFrame } from "@react-three/fiber";

import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";


const Controls = ({cameraPosition}) => {
  const ref = useRef();
  // useFrame(() => (ref.target = cameraPosition));
  // useFrame((state) => console.log(cameraPosition));
  // THREE.MathUtils.lerp(ref.target, cameraPosition, 0.1)

  return <OrbitControls ref={ref} makeDefault target={cameraPosition}/>;
};


const Camera = ({cameraPosition}) => {
  const ref = useRef();
  // useFrame(() => (cameraRef.position = cameraPosition));
  // useFrame((state) => console.log(cameraPosition));
  return <PerspectiveCamera ref={ref} makeDefault fov={50} near={0.1} far={100000000} position={[0, 0, 5]} />;
};

export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);



  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && <SystemNav systemData={systemData} />}
      <div id="canvas-container">
          <Canvas
            dpr={[1, 2]}
          >
            {useMemo(() => <SkyBox />,[])}
            
            <ambientLight color={"0xffffff"} intensity={0.01} />

            {systemData && (<CreateSystem
              systemData={systemData}
              setCameraPosition={setCameraPosition}
            />)}
            <Controls cameraPosition={cameraPosition} />
            {/* <Camera cameraPosition={cameraPosition}/> */}
            <PerspectiveCamera makeDefault fov={50} near={0.1} far={100000000} />
          </Canvas>
        
      </div>
    </>
  );
}
