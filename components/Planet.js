import * as THREE from "three";
// import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import {
  useRef,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { EnvContext } from "./EnvContext";
import PlanetTexture from "./PlanetTextures";
import { getEllipse, getPeriapsis } from "./HelperFunctions";

const Planet = (props) => {
  // This reference will give us direct access to the mesh

  // const getRef = (element) => (itemsEls.current.push(element))
  const constants = useContext(EnvContext);
  const planetRef = useRef();
  const planetElements = useRef(new Array())


  // console.log("props", props);
  useEffect(() => {
    if(props.pType){
      const system = {};
      planetElements.current.push(planetRef);
      system.planets = planetElements;
      props.refs.current.push(system);
      props.setRefsArray(system);
    }
    else{
      if(!props.refs.current.includes(planetRef)){
        props.refs.current.push(planetRef);
      }
    }

  }, [props]);

  // props.setViewState(refs => ({ ...refs.current, planetRef}));

  // Set up state for the hover and active state
  // const [hover, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  console.log("planet details", props.planetDetails);

  //Semimajoraxis
  let semimajoraxis;
  // if(props.planetDetails.semimajoraxis && Array.isArray(props.planetDetails.semimajoraxis[0])){
  if (props.planetDetails.hasOwnProperty("semimajoraxis")) {
    if (
      props.planetDetails.semimajoraxis &&
      props.planetDetails.semimajoraxis[0]
    ) {
      if (props.planetDetails.semimajoraxis[0]._) {
        semimajoraxis = parseFloat(props.planetDetails.semimajoraxis[0]._);
      } else {
        semimajoraxis = parseFloat(props.planetDetails.semimajoraxis[0]);
      }
    } else if (props.planetDetails.semimajoraxis) {
      semimajoraxis = parseFloat(props.planetDetails.semimajoraxis);
    } else {
      semimajoraxis = 10;
    }
  } else {
    semimajoraxis = 10;
  }
  semimajoraxis = semimajoraxis * constants.distance.au;

  // semimajoraxis = semimajoraxis * au;
  console.log({ semimajoraxis });

  //Period
  let period;

  if (props.planetDetails.hasOwnProperty("period")) {
    if (Array.isArray(props.planetDetails.period)) {
      if (props.planetDetails.period[0].hasOwnProperty("_")) {
        period = parseFloat(props.planetDetails.period[0]._);
      } else if (props.planetDetails.period[0].hasOwnProperty("$")) {
        if (props.planetDetails.period[0].$.hasOwnProperty("upperlimit")) {
          period = parseFloat(props.planetDetails.period[0].$.upperlimit);
        } else if (
          props.planetDetails.period[0].$.hasOwnProperty("lowerlimit")
        ) {
          period = parseFloat(props.planetDetails.period[0].$.lowerlimit);
        }
      } else {
        period = parseFloat(props.planetDetails.period[0]);
      }
    } else {
      period = parseFloat(props.planetDetails.period);
    }
  } else {
    period = 365;
  }

  console.log({ period });

  //Eccentricity
  let eccentricity = 0;
  if (
    props.planetDetails.eccentricity &&
    props.planetDetails.eccentricity[0].hasOwnProperty("_")
  ) {
    eccentricity = parseFloat(props.planetDetails.eccentricity[0]._);
  } else if (
    props.planetDetails.eccentricity &&
    props.planetDetails.eccentricity[0].length
  ) {
    eccentricity = parseFloat(props.planetDetails.eccentricity[0]);
  }
  // console.log({eccentricity})

  console.log(props.planetDetails.inclination);
  let inclination = 0;
  if (
    props.planetDetails.inclination &&
    props.planetDetails.inclination[0].hasOwnProperty("_")
  ) {
    inclination = parseFloat(props.planetDetails.inclination[0]._);
  } else if (
    props.planetDetails.inclination &&
    props.planetDetails.inclination[0].length
  ) {
    inclination = parseFloat(props.planetDetails.inclination[0]);
  }

  const periastron = props.planetDetails.periastron
    ? parseFloat(props.planetDetails.periastron[0])
    : 0;
  const ellipse = getEllipse(semimajoraxis, eccentricity);
  const speed = 0.0005;

  const periapsis = getPeriapsis(semimajoraxis, eccentricity) - semimajoraxis;

  console.log(props.planetDetails.hasOwnProperty("inclination"));

  console.log({ inclination });

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

    planetRef.current.position.x =
      ellipse.xRadius * Math.cos((elapsedTime / period) * speed);
    planetRef.current.position.y =
      ellipse.yRadius * Math.sin((elapsedTime / period) * speed);
  });

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

  /* https://www.aanda.org/articles/aa/full_html/2017/08/aa29922-16/aa29922-16.html */
  /* 
    We suggest that the transition between the two regimes of “small” and “large” 
    planets  occurs at a mass of 124 ± 7M⊕ and a radius of 12.1 ± 0.5R⊕. Furthermore, 
    the M-R relation is R ∝ M0.55 ± 0.02 and R ∝ M0.01 ± 0.02 for small and large planets, 
    respectively.
  */

  if (mass) {
    scale = mass;
    const earthMasses =  mass * constants.mass.jupiter_mass_in_earth_masses;
    if(earthMasses < 124){
      scale = mass ** 0.55;
      console.log("mass radius proportion smaller planets", "Mass ** 0.55");
    }
    else{
      scale = mass ** 0.01; 
      console.log("mass radius proportion larger planets", "Mass ** 0.01");
    }
  }

  if (radius) {
    scale = radius;
    console.log("scale set by radius");
  }
  if(!radius){
    console.log("scale set by mass");
  }

  //Relative to sol radius
  scale = scale * constants.radius.jupiter * constants.radius.scale;

  const planetTexture = PlanetTexture(mass, radius, props.name);

  // props.refs.push(planetRef);

  // console.log("planet details", props.planetDetails);

  console.log({ periapsis });

  let position = [0, 0, 0];
  position = [periapsis, 0, 0];

  console.log({ position });
  console.log({ inclination });

  let start, end, delta;


  return (
    <group position={position} rotation={[(inclination * Math.PI) / 90, 0, 0]}>
      <line
        ref={orbitRef}
        geometry={geometry}
        //  rotation={inclination / 90}
      >
        <lineBasicMaterial
          attach="material"
          color={"#ffffff"}
          // linewidth={1}
          opacity={0.25}
          transparent={true}
          // rotation={inclination / 90}
        />
      </line>

      <mesh
        // position={position}
        // position={[periapsis, 0, 0]}
        {...props}
        ref={planetRef}
        name={props.name}
        // rotateX={Math.PI * 180}
        // scale={active ? 1.5 : 1}
        // onClick={(event) => setActive(!active)}
        onPointerDown={(e) => {
          console.log(e)
          start = new Date();
        }}
        onPointerUp={(e) => {
          end = new Date();
          delta = (end - start) / 1000.0;
          console.log(delta);
          if(delta > .3){
            console.log("drag");
            props.setDragged(true);
          }
        }}
        onClick={(e) => {
          console.log("clicked mesh", planetRef);
          // console.log(planetRef.current.position);
          // console.log("context from planet", constants.distance.au);
          // console.log("planet scale", scale);
          let vector = new THREE.Vector3();
          e.object.getWorldPosition(vector);

          props.setFocus(planetRef);
          props.setClicked(true);
          props.setViewState({
            focus: planetRef,
            clicked: true,
          });

          e.stopPropagation();
        }}
        // castShadow={true}
        // receiveShadow={true}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
      >
        <sphereGeometry args={[scale, 256, 256]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
    </group>
  );
};

export default Planet;
