import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import GenerateSystem from "../components/GenerateSystem";

// createRoot(document.getElementById('root')).render(
  
// )

function Star(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hover and active state
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


export default function Home() {

  const [systemData, setSystemData] = useState(null);


  systemData? console.log(systemData) : "";

  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && (<SystemNav systemData={systemData}/>)}
      <div id="canvas-container">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Star position={[0, 0, 0]} />
        </Canvas>
      </div>

    </>
  );
}
