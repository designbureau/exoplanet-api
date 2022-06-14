import * as THREE from "three";
// import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useContext, useEffect, useLayoutEffect } from "react";
import { EnvContext } from "./EnvContext";
import PlanetTexture from "./PlanetTextures";
import { getEllipse, getPeriapsis } from "./HelperFunctions";

const Planet = (props) => {
  // This reference will give us direct access to the mesh


  // const getRef = (element) => (itemsEls.current.push(element))

  const planetRef = useRef();
  props.refs.current.push(planetRef);

  // props.setViewState(refs => ({ ...refs.current, planetRef}));



  // Set up state for the hover and active state
  // const [hover, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // TODO: replace random defaults
  const au = 1000;

  //Semimajoraxis

  let semimajoraxis;
  // if(props.planetDetails.semimajoraxis && Array.isArray(props.planetDetails.semimajoraxis[0])){
  if(props.planetDetails.semimajoraxis && props.planetDetails.semimajoraxis[0]){
    if(props.planetDetails.semimajoraxis[0]._){
      semimajoraxis = parseFloat(props.planetDetails.semimajoraxis[0]._)
    }
    else{
      semimajoraxis = parseFloat(props.planetDetails.semimajoraxis[0]);
    }
  }
  else if(props.planetDetails.semimajoraxis){
    semimajoraxis = parseFloat(props.planetDetails.semimajoraxis);
  }
  else{
    semimajoraxis = 100;
  }
  semimajoraxis = semimajoraxis * au;

  // semimajoraxis = semimajoraxis * au;
  // console.log({semimajoraxis});

  //Period
  let period = 365;
  if(props.planetDetails.period){
    if(Array.isArray(props.planetDetails.period)){
      period = parseFloat(props.planetDetails.period[0]._);
    }
    else{
      period = parseFloat(props.planetDetails.period);
    }
  }


  //Eccentricity
  let eccentricity = 0;
  if( props.planetDetails.eccentricity && props.planetDetails.eccentricity[0].hasOwnProperty("_")){
    eccentricity = parseFloat(props.planetDetails.eccentricity[0]._);
  }
  else if(props.planetDetails.semimajoraxis && props.planetDetails.eccentricity[0].length){
    eccentricity = parseFloat(props.planetDetails.eccentricity[0]);
  }
  // console.log({eccentricity})

  const inclination = props.planetDetails.inclination? parseFloat(props.planetDetails.inclination[0]) : 0;
  const periastron = props.planetDetails.periastron? parseFloat(props.planetDetails.periastron[0]): 0;
  const ellipse = getEllipse(semimajoraxis, eccentricity);
  const speed = 0.005;

  const periapsis = getPeriapsis(semimajoraxis, eccentricity) - semimajoraxis;

  // console.log({periapsis});

  //Orbits
  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    ellipse.xRadius,
    ellipse.yRadius, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );


    // console.log({ellipse});

  const orbitRef = useRef();

  const points = curve.getPoints(1000);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // console.log({geometry});
  geometry.name = props.name;
  // orbitEllipse.name = name + " orbit";

  // orbitRef.current.rotation = inclination / 90;

  // let orbitsGroup = new THREE.Group();
  // orbitsGroup.add(planetMesh, orbitEllipse);
  // orbitsGroup.rotation.x = inclination / 90;

  // orbitsGroup.position.x = periapsis;
  // console.log("periapsis", periapsis);

  // planetRef.position.x = ellipse.xRadius;
  // const elapsedTime = clock.getElapsedTime();

  useFrame((state, delta) => {

    const elapsedTime = state.clock.getElapsedTime();
    
    planetRef.current.rotation.x = Math.PI * 0.5;
    planetRef.current.rotation.y += 0.001;

    planetRef.current.position.x = ellipse.xRadius * Math.cos((elapsedTime / period) * speed);
    planetRef.current.position.y = ellipse.yRadius * Math.sin((elapsedTime / period) * speed);

  });

  const constants = useContext(EnvContext);

  console.log("planet details", props.planetDetails);

  let radius;
  if (props.planetDetails.hasOwnProperty("radius")) {
    if (props.planetDetails.radius.hasOwnProperty("_")) {
      radius = parseFloat(props.planetDetails.radius._);
    } else {
      radius = parseFloat(props.planetDetails.radius);
    }
  }
  let mass;
  if (props.planetDetails.hasOwnProperty("mass")) {
    if (Array.isArray(props.planetDetails.mass)) {
      // console.log("is array");
      if (props.planetDetails.mass[0].hasOwnProperty("_")) {
        mass = parseFloat(props.planetDetails.mass[0]._);
      }
    }
    if (props.planetDetails.mass.hasOwnProperty("_")) {
      mass = parseFloat(props.planetDetails.mass._);
    }
  }

  let scale = 1;

  if (radius) {
    scale = radius;
  }
  if (mass) {
    scale = mass;
  }

  //TODO: remove exaggeration
  // scale = scale * 10;

  // scale = scale / constants.mass.jupiter;

  const planetTexture = PlanetTexture(mass, radius, props.name);

  // props.refs.push(planetRef);

  let position = [0, 0, 0];

  // console.log("planet details", props.planetDetails);


  // console.log({planetRef})

  return (
    <group 
    // position={[periapsis, 0, 0]}
    
    >
      <line ref={orbitRef}
        geometry={geometry}
      //  rotation={inclination / 90}
      >
        <lineBasicMaterial
          attach="material"
          color={"#ffffff"}
          // linewidth={1}
          opacity={0.25}
          transparent={true}
          rotation={inclination / 90}
        />
      </line>

      <mesh
        position={position}
        // position={[periapsis, 0, 0]}
        {...props}
        ref={planetRef}
        name={props.name}
        // rotateX={Math.PI * 180}
        // scale={active ? 1.5 : 1}
        // onClick={(event) => setActive(!active)}
        onClick={(e) => {
          console.log("clicked mesh", planetRef);
          // console.log(planetRef.current.position);
          // console.log("context from planet", constants.distance.au);
          // console.log("planet scale", scale);
          let vector = new THREE.Vector3();
          e.object.getWorldPosition(vector);

          // props.setCameraPosition([vector.x, vector.y , vector.z]);
          props.setFocus(planetRef);
          props.setClicked(true);
          props.setViewState({
            focus: planetRef,
            clicked: true
          });

    

          e.stopPropagation();
          
        }}
      // castShadow={true}
      // receiveShadow={true}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
      >
        <sphereGeometry args={[scale, 256, 256]} />
        <meshStandardMaterial
          map={planetTexture}
        />
      </mesh>
    </group>
  );
};

export default Planet;
