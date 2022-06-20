import * as THREE from "three";
import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";;
import {
  Noise,
  LayerMaterial,
  DebugLayerMaterial,
  Depth,
  Fresnel,
  Displace,
  Gradient,
} from "lamina";



const RenderPlanet = ({ planet }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.00005;
    // noiseSpot.current.scale += Math.sin(delta * 0.025);
    // displace.current.scale += Math.sin(delta * 0.05);
    // glow.current.quaternion.setFromRotationMatrix(camera.matrix);
  });

  console.log({ planet });

const color = "#ff0000";



  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 2048, 2048]} />
      <DebugLayerMaterial lighting="phong" color={color}>
        <Noise
          mapping={"local"}
          scale={5}
          type={"perlin"}
          mode={"multiply"}
          alpha={0.75}
        />
        {/* <Displace strength={0.1} scale={2} type={"perlin"} /> */}
      
      </DebugLayerMaterial>
    </mesh>
  );
};

export default RenderPlanet;
