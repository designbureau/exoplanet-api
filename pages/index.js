// import Head from "next/head";
import * as THREE from 'three'
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";
import CameraControls from "camera-controls";


CameraControls.install({ THREE })
extend({ CameraControls })

function Controls({cameraPosition, focus}) {
  // const ref = useRef()
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement,), [])

  let radius = 1
  focus? radius = focus.current.geometry.parameters.radius : 1
  controls.minDistance = radius + .1


  focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)
  controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)

  return useFrame((state, delta) => {
    return controls.update(delta)
  })
}



export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  const [cursor, setCursor] = useState("default");
  const [focus, setFocus] = useState();

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
              setFocus={setFocus}
            />)}
            <Controls cameraPosition={cameraPosition} focus={focus} />
            {/* <Camera cameraPosition={cameraPosition}/> */}
            {/* <PerspectiveCamera makeDefault fov={50} near={0.1} far={100000000} /> */}
          </Canvas>
        
      </div>
    </>
  );
}
