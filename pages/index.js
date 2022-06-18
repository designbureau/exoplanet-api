// import Head from "next/head";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useMemo, forwardRef, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import SkyBox from "../components/SkyBox";
import CreateSystem from "../components/CreateSystem";
import Controls from "../components/CameraControls";
import { EnvContext, Constants } from "../components/EnvContext";
import { Perf } from "r3f-perf";
import { useKeyState } from "use-key-state";

export default function Home() {
  const [systemData, setSystemData] = useState(null);
  const [cursor, setCursor] = useState("default");
  const [clicked, setClicked] = useState(false);
  const refs = useRef(new Array());
  const [focus, setFocus] = useState(null);

  const [viewState, setViewState] = useState({
    clicked: false,
    focus: null,
  });

  const [refsArray, setRefsArray] = useState(new Array());

  if (Array.isArray(refs.current)) {
    if (refs.current[0]) {
      console.log(focus);
      if (focus === null || focus.current === null) {
        setFocus(refs.current[0].star);
      }
    }
  }

  // console.log({refs});

  return (
    <>
      <Nav setSystemData={setSystemData} refs={refs} />
      {systemData && (
        <SystemNav refs={refs} setFocus={setFocus} setClicked={setClicked} />
      )}
      <div id="canvas-container" style={{ cursor: cursor }}>
        <Canvas dpr={[1, 2]}>
          <EnvContext.Provider value={Constants}>
            {useMemo(
              () => (
                <SkyBox />
              ),
              []
            )}
            {systemData && (
              <CreateSystem
                systemData={systemData}
                setFocus={setFocus}
                setClicked={setClicked}
                setViewState={setViewState}
                viewState={viewState}
                setRefsArray={setRefsArray}
                refs={refs}
              />
            )}
          </EnvContext.Provider>
          <Controls
            focus={focus}
            setFocus={setFocus}
            clicked={clicked}
            setClicked={setClicked}
          />
          <Perf />
        </Canvas>
      </div>
      {/* <div className="controls-info">Controls: Move:w,a,s,d | Rotation:up,down,left,right | Sensitivity:+,- | Reset target: enter</div> */}
    </>
  );
}
