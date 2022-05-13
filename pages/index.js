// import Head from "next/head";
import * as THREE from 'three'
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";

import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";
import CameraControls from "camera-controls";



const Controls = ({cameraPosition}) => {
  const ref = useRef();
  // useFrame(() => (ref.target = cameraPosition));
  // useFrame((state) => console.log(cameraPosition));
  // THREE.MathUtils.lerp(ref.target, cameraPosition, 0.1)

  return <OrbitControls ref={ref} makeDefault target={cameraPosition}/>;
};

CameraControls.install({ THREE })
extend({ CameraControls })

// function Controls({cameraPosition}) {
//   const ref = useRef()
//   const camera = useThree((state) => state.camera)
//   const gl = useThree((state) => state.gl)
//   // useFrame((state, delta) => ref.current.update(delta))
//   useFrame((state, delta) => ref.current.update(delta))

//   // lerpLookAt
//   return <cameraControls ref={ref} args={[camera, gl.domElement]} target={cameraPosition} />
// }




const Camera = ({cameraPosition}) => {
  const ref = useRef();
  // useFrame(() => (cameraRef.position = cameraPosition));
  // useFrame((state) => console.log(cameraPosition));
  return <PerspectiveCamera ref={ref} makeDefault fov={50} near={0.1} far={100000000} position={[0, 0, 5]} />;
};

export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  const [cursor, setCursor] = useState("default");



  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && <SystemNav systemData={systemData} />}
      <div id="canvas-container" style={{cursor:cursor}}>
          <Canvas
            dpr={[1, 2]}
            camera={[50,0.1,1000000]}
          >
            {useMemo(() => <SkyBox />,[])}
            
            <ambientLight color={0xffffff} intensity={0.01} />

            {systemData && (<CreateSystem
              systemData={systemData}
              setCameraPosition={setCameraPosition}
            />)}
            <Controls cameraPosition={cameraPosition} />
            {/* <Camera cameraPosition={cameraPosition}/> */}
            {/* <PerspectiveCamera makeDefault fov={50} near={0.1} far={100000000} /> */}
          </Canvas>
        
      </div>
    </>
  );
}
