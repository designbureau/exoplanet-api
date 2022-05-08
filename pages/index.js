import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

import SkyBox from "../components/SkyBox";
import Star from "../components/Star";
import CreateSystem from "../components/CreateSystem";
import CreateBinary from "../components/CreateBinary";

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();2
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};



export default function Home() {
  let dpr = 1;

  useEffect(() => {
    dpr = (Math.min(window.devicePixelRatio), 2);
  },[]);

  const [systemData, setSystemData] = useState(null);
  // systemData && console.log(systemData);

  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && (<SystemNav systemData={systemData}/>)}
      <div id="canvas-container">
        <Canvas dpr={[1, dpr]} camera={{fov: 50, near: 0.1, far: 100000000, position: [0, 0, 5]}}>
          <CameraControls/>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <Star position={[0, 0, 0]} /> */}
          <SkyBox/>
          {systemData && (<CreateSystem systemData={systemData}/>)}
        </Canvas>
      </div>
    </>
  );
}
