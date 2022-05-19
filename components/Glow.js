import * as THREE from "three";
import { LayerMaterial, Depth } from "lamina";
import { Billboard } from "@react-three/drei";

const Glow = ({ ref, color, scale = 0.5, near = -2, far = 1.4 }) => {
    return (
      <Billboard ref={ref}>
        <mesh>
          <circleGeometry args={[1.2 * scale, 32]} />

          <LayerMaterial
            transparent
            depthWrite={false}
            blending={THREE.CustomBlending}
            blendEquation={THREE.AddEquation}
            blendSrc={THREE.SrcAlphaFactor}
            blendDst={THREE.DstAlphaFactor}
          >
            <Depth
              colorA={color}
              colorB="black"
              alpha={1}
              mode="normal"
              near={near * scale}
              far={far * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB="black"
              alpha={0.5}
              mode="add"
              near={-40 * scale}
              far={far * 1.2 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB="black"
              alpha={1}
              mode="add"
              near={-15 * scale}
              far={far * 0.7 * scale}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA={color}
              colorB="black"
              alpha={1}
              mode="add"
              near={-10 * scale}
              far={far * 0.68 * scale}
              origin={[0, 0, 0]}
            />
          </LayerMaterial>
        </mesh>
      </Billboard>
    );
  };


  export default Glow;