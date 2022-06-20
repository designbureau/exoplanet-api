import * as THREE from "three";
import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
// import glsl from "babel-plugin-glsl/macro"
import glsl from 'glslify';

const heightToNormalMap = (map, intensity) => {
var width = map.image.width;
var height = map.image.height;
var nofPixels = width*height;
  
  intensity = intensity || 1.0;
  
  var getHeight = function(x, y) {
      x = Math.min(x, width-1);
      y = Math.min(y, height-1);
      return (
          map.image.data[(y*width+x)*3+0]/255 + 
          map.image.data[(y*width+x)*3+1]/255 +
          map.image.data[(y*width+x)*3+2]/255
      )/3*intensity;
  }
  
  var normalMap = THREE.ImageUtils.generateDataTexture(width, height, new THREE.Color(0x000000));

for (var i = 0; i < nofPixels; i++) {		
  var x = i%width;
  var y = Math.floor(i/width);
  
      var pixel00 = new THREE.Vector3(0, 0, getHeight(x, y));
      var pixel01 = new THREE.Vector3(0, 1, getHeight(x, y+1));
      var pixel10 = new THREE.Vector3(1, 0, getHeight(x+1, y));
      var orto = pixel10.clone().sub(pixel00).cross(pixel01.clone().sub(pixel00)).normalize();
      
  var color = new THREE.Color(orto.x+0.5, orto.y+0.5, -orto.z);
      
  normalMap.image.data[i*3+0] = color.r*255;
  normalMap.image.data[i*3+1] = color.g*255;
  normalMap.image.data[i*3+2] = color.b*255;
  }
  
  return normalMap;
}


import {
  Noise,
  LayerMaterial,
  Depth,
  Fresnel,
  Displace,
  Gradient,
} from "lamina";

var uniforms = {
  // "pointLightPosition": {"type": "v3", "value": sunLight.position},
  // "map": {"type": "t", "value": map},
  // "normalMap": {"type": "t", "value": heightToNormalMap(map)}
};

const ColorMaterial = shaderMaterial(
  { uniforms: uniforms, transparent:true },
  // the tag is optional, it allows the VSC to syntax highlibht and lint glsl,
  // also allows imports and other things
  glsl`
  varying vec3 vNormal;
  varying vec3 cameraVector;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vNormal = normal;
    vec4 vPosition4 = modelMatrix * vec4(position, 1.0);
    vPosition = vPosition4.xyz;
    cameraVector = cameraPosition - vPosition;
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,

  glsl`
  uniform vec3 pointLightPosition;
  uniform sampler2D map;
  uniform sampler2D normalMap;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 cameraVector;
  varying vec2 vUv;
      
      mat4 rotationMatrix(vec3 axis, float angle) {
          axis = normalize(axis);
          float s = sin(angle);
          float c = cos(angle);
          float oc = 1.0 - c;
          
          return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                      0.0,                                0.0,                                0.0,                                1.0);
      }
      
      vec3 bumpNormal(sampler2D normalMap, vec2 vUv) {
          vec3 bumpedNormal = normalize(texture2D(normalMap, vUv).xyz * 2.0 - 1.0);
          
          vec3 y_axis = vec3(0,1,0);
          float rot_angle = acos(dot(bumpedNormal,y_axis));
          vec3 rot_axis = normalize(cross(bumpedNormal,y_axis));
          return vec3(rotationMatrix(rot_axis, rot_angle) * vec4(vNormal, 1.0));
      }
      
  void main() {
    float PI = 3.14159265358979323846264;
    vec3 light = pointLightPosition - vPosition;
    vec3 cameraDir = normalize(cameraVector);
          vec3 newNormal = bumpNormal(normalMap, vUv);
    
    light = normalize(light);
    
    float lightAngle = max(0.0, dot(newNormal, light));
    float viewAngle = max(0.0, dot(vNormal, cameraDir));
    float adjustedLightAngle = min(0.6, lightAngle) / 0.6;
    float adjustedViewAngle = min(0.65, viewAngle) / 0.65;
    float invertedViewAngle = pow(acos(viewAngle), 3.0) * 0.4;
    
    float dProd = 0.0;
    dProd += 0.5 * lightAngle;
    dProd += 0.2 * lightAngle * (invertedViewAngle - 0.1);
    dProd += invertedViewAngle * 0.5 * (max(-0.35, dot(vNormal, light)) + 0.35);
    dProd *= 0.7 + pow(invertedViewAngle/(PI/2.0), 2.0);
    
    dProd *= 0.5;
    vec4 atmColor = vec4(dProd, dProd, dProd, 1.0);
    
    vec4 texelColor = texture2D(map, vUv) * min(asin(lightAngle), 1.0);
    gl_FragColor = texelColor + min(atmColor, 0.8);
  }`
)

extend({ ColorMaterial })



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
      <colorMaterial color="#203050" />
    </mesh>
  );
};

export default RenderPlanet;
