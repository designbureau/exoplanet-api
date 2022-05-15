// import Head from "next/head";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";
import Controls from '../components/CameraControls';
import { EnvContext, Constants } from "../components/EnvContext";

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
            <ambientLight color={0xffffff} intensity={0.001} />
            {useMemo(() => <SkyBox />,[])}
            <EnvContext.Provider value={Constants}>
              {systemData && (<CreateSystem
                systemData={systemData}
                setCameraPosition={setCameraPosition}
                setFocus={setFocus}
              />)}
            </EnvContext.Provider>
            <Controls cameraPosition={cameraPosition} focus={focus} />
          </Canvas>
        
      </div>
    </>
  );
}
