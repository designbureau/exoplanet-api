// import Head from "next/head";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
// import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";
import Controls from '../components/CameraControls';
import { EnvContext, Constants } from "../components/EnvContext";
import { Selection, Select } from "@react-three/postprocessing";

export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  const [cursor, setCursor] = useState("default");
  const [focus, setFocus] = useState();

  const refs = useRef(new Array());


  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && <SystemNav systemData={systemData} />}
      <div id="canvas-container" style={{cursor:cursor}}>
          <Canvas
            dpr={[1, 2]}
            // new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
            // camera={[50, 1.7, 0.1, 1000]}
          >
            {/* <ambientLight color={0xffffff} intensity={0.01} /> */}
            <EnvContext.Provider value={Constants}>
            <Selection>
              <Select>{useMemo(() => <SkyBox />,[])}</Select>
              {systemData && (<CreateSystem
                systemData={systemData}
                setCameraPosition={setCameraPosition}
                setFocus={setFocus}
                refs={refs}
              />)}
            </Selection>
            </EnvContext.Provider>
            {/* <PerspectiveCamera fov={50} aspect={1.7} near={0.1} far={100000000} /> */}
            <Controls cameraPosition={cameraPosition} focus={focus} />
          </Canvas>
        
      </div>
    </>
  );
}
