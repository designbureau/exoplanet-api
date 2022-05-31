import * as THREE from "three";
// import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useContext } from "react";
import { EnvContext } from "./EnvContext";
import PlanetTexture from "./PlanetTextures";
import { getEllipse, getPeriapsis } from "./HelperFunctions";

const Planet = (props) => {
  // This reference will give us direct access to the mesh


  // const getRef = (element) => (itemsEls.current.push(element))

  const planetRef = useRef();
  props.refs.current.push(planetRef);

  // Set up state for the hover and active state
  // const [hover, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  const au = 200;
  let semimajoraxis = props.planetDetails.semimajoraxis? props.planetDetails.semimajoraxis[0] : 10;
  semimajoraxis = semimajoraxis * au;

  const period = props.planetDetails.period? props.planetDetails.period[0] : 365;
  const eccentricity = props.planetDetails.eccentricity? props.planetDetails.eccentricity[0] : 0;
  const inclination = props.planetDetails.inclination? props.planetDetails.inclination[0] : 0;
  const periastron = props.planetDetails.periastron? props.planetDetails.periastron[0]: 0;
  const ellipse = getEllipse(semimajoraxis, eccentricity);
  const speed = 1;

  const periapsis = getPeriapsis(semimajoraxis, eccentricity) - semimajoraxis;


  // console.log({semimajoraxis})
  // console.log({ellipse});

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

  // console.log({ curve });



  const orbitRef = useRef();

  const points = curve.getPoints(1000);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

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

    // console.log( planetRef.current.position.x);


    // planetRef.current.position.x += ellipse.xRadius * Math.cos(period * speed);
    // planetRef.current.position.y += ellipse.yRadius * Math.sin(period * speed);
    // console.log(planetRef.current.position.x);
    // planet.mesh.rotation.y = Math.PI * 0.005 * elapsedTime;
  });
  // Return view, these are regular three.js elements expressed in JSX
  // const planetNormalTexture = useLoader(TextureLoader, "/textures/8k_jupiter.jpeg");

  const constants = useContext(EnvContext);

  // console.log(mesh);
  console.log("planet details", props.planetDetails);

  // let radius = props.planetDetail.radius._ ? props.planetDetail.radius[0]._ : 0.5;

  // if(mesh){
  //   props.refs.current.push(mesh);
  // }
  // console.log(props.refs)

  // mesh.current && props.refs.current.push(mesh);

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
  scale = scale * 10;

  // scale = scale / constants.mass.jupiter;

  const planetTexture = PlanetTexture(mass, radius, props.name);

  // props.refs.push(planetRef);

  let position = [0, 0, 0];



  // console.log(planetRef.position)

  return (
    <group 
    // position={[periapsis, 0, 0]}
    
    >
      <line ref={orbitRef}
        geometry={geometry}
      //  rotation={inclination / 90}
      // position={[periapsis, 0, 0]}
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
          // props.setCameraPosition([
          //   planetRef.current.position.x,
          //   planetRef.current.position.y,
          //   planetRef.current.position.z,
          // ]);
          props.setFocus(planetRef);
          console.log("clicked mesh", planetRef);
          // console.log(planetRef.current.position);
          // console.log("context from planet", constants.distance.au);
          // console.log("planet scale", scale);
          let vector = new THREE.Vector3();
          e.object.getWorldPosition(vector);
          props.setCameraPosition([vector.x, vector.y , vector.z]);
          props.setFocus(planetRef);
        }}
      // castShadow={true}
      // receiveShadow={true}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
      >
        <sphereGeometry args={[scale, 256, 256]} />
        <meshStandardMaterial
          map={planetTexture}
        // color={hover ? "#FFEEEE" : "white"}
        />
      </mesh>
    </group>
  );
};

export default Planet;
