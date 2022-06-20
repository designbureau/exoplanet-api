// import Head from "next/head";
import Nav from "../components/Nav";
// import CatalogueNav from "../components/CatalogueNav";
import { useRef, useState, useMemo, forwardRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import SkyBox from "../components/SkyBox";
import RenderPlanet from "../components/RenderPlanet";
import Controls from '../components/CameraControls';
import { EnvContext, Constants } from "../components/EnvContext";
import JsonFind from "json-find";

export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [focus, setFocus] = useState();


    const data = systemData && JsonFind(systemData);
    const planets = data && data.checkKey("planet");

  return (
    <>
      <Nav setSystemData={setSystemData} />
      <div id="canvas-container">
          <Canvas
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.02}/>
            <directionalLight intensity={0.5} position={[2, 0, 5]} />
            <EnvContext.Provider value={Constants}>
              {useMemo(() => <SkyBox />,[])}
              {/* {systemData && (<NewSystemNav
                systemData={systemData}
              />)} */}
              <RenderPlanet planet={planets && planets[0]} />
            </EnvContext.Provider>
            <Controls focus={focus}/>
          </Canvas>
      </div>
    </>
  );
}
