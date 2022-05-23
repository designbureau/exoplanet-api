// import Head from "next/head";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo } from "react";
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
  // const [controlPosition, setControlPosition] = useState();

  const refs = useRef(new Array());


  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && <SystemNav systemData={systemData} />}
      <div id="canvas-container" style={{cursor:cursor}}>
          <Canvas
            dpr={[1, 2]}
          >
            <EnvContext.Provider value={Constants}>
              {useMemo(() => <SkyBox />,[])}
              {systemData && (<CreateSystem
                systemData={systemData}
                setCameraPosition={setCameraPosition}
                setFocus={setFocus}
                refs={refs}
              />)}
            </EnvContext.Provider>
            <Controls cameraPosition={cameraPosition} focus={focus}/>
          </Canvas>
      </div>
    </>
  );
}
