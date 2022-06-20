import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";
import { Abstract } from "lamina/vanilla";

import {
  Noise,
  LayerMaterial,
  Depth,
  Fresnel,
  Displace,
  Gradient,
} from "lamina";





class CustomLayer extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_color = '#ffEDDD' // Can be accessed as CustomLayer.color
  static u_alpha = 1 // Can be accessed as CustomLayer.alpha

  // Define your fragment shader just like you already do!
  // Only difference is, you must return the final color of this layer
  static fragmentShader = `   
    uniform vec3 u_color;
    uniform float u_alpha;

    // Varyings must be prefixed by "v_"
    varying vec3 v_Position;

    vec4 main() {
      // Local variables must be prefixed by "f_"
      vec4 f_color = vec4(u_color, u_alpha);
      return f_color;
    }
  `

  // Optionally Define a vertex shader!
  // Same rules as fragment shaders, except no blend modes.
  // Return a non-projected vec3 position.
  static vertexShader = `   
    // Varyings must be prefixed by "v_"
    varying vec3 v_Position;

    void main() {
      v_Position = position;
      return position * 2.;
    }
  `

  constructor(props) {
    // You MUST call `super` with the current constructor as the first argument.
    // Second argument is optional and provides non-uniform parameters like blend mode, name and visibility.
    super(CustomLayer, {
      name: 'CustomLayer',
      ...props,
    })
  }
}

extend({ CustomLayer })


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
    <mesh
      ref={ref}
      // name={planet.name[0]}
    >
      <sphereGeometry args={[1, 2048, 2048]} />
      <LayerMaterial lighting="phong">
        {/* <Fresnel
              mode="softlight"
              color={color_light}
              intensity={3.5}
              power={1.8}
              bias={0.01}
            /> */}
        {/* <Noise
          mapping={"local"}
          scale={1 * 0.1}
          type={"perlin"}
          mode={"multiply"}
          alpha={0.25}
        /> */}
        {/* <Noise
          mapping={"local"}
          scale={2}
          type={"perlin"}
          mode={"normal"}
          alpha={0.75}
        /> */}
        {/* <Displace strength={0.01} scale={100} type={"perlin"} /> */}
      
      <customLayer color={color} />

      {/* </CustomLayer> */}
      </LayerMaterial>
    </mesh>
  );
};

export default RenderPlanet;
