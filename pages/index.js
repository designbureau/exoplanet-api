import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import SystemNav from "../components/SystemNav";
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { CubeTextureLoader } from "three/src/loaders/CubeTextureLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

// import GenerateSystem from "../components/GenerateSystem";

// createRoot(document.getElementById('root')).render(
  
// )

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};



function Star(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hover and active state
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
  // Return view, these are regular three.js elements expressed in JSX

  const starNormalTexture = useLoader(TextureLoader, "/textures/8k_sun.jpeg");


  
  return (
    <mesh
      {...props}
      ref={mesh}
      // scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={starNormalTexture} color={active ? 'blue' : 'white'} />
      {/* <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}


export default function Home() {

  const [systemData, setSystemData] = useState(null);


  systemData? console.log(systemData) : "";


  // const sizes = {
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // };
  
  // window.addEventListener("resize", () => {
  //   // Update sizes
  //   sizes.width = window.innerWidth;
  //   sizes.height = window.innerHeight;
  
  //   // Update camera
  //   camera.aspect = sizes.width / sizes.height;
  //   camera.updateProjectionMatrix();
  
  //   // Update renderer
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // });


// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.setPath("/textures/cubemaps/nasa/8k/compressed/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"
  ]);
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
} 

  return (
    <>
      <Nav setSystemData={setSystemData} />
      {systemData && (<SystemNav systemData={systemData}/>)}
      <div id="canvas-container">
        <Canvas>
          <CameraControls/>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Star position={[0, 0, 0]} />
          <SkyBox/>
        </Canvas>
      </div>

    </>
  );
}
