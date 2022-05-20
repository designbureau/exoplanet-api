import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from '@react-three/fiber'

// Gas Giant
// A giant planet composed mainly of gas

// Super-Earth
// A potentially rocky world, larger than Earth

// Neptune-like
// Gaseous worlds around the size of Neptune

// Terrestrial
// A rocky world outside our solar system.

const PlanetTexture = (mass, radius, name) => {

  const mercuryNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_mercury.jpeg"
  );
  const venusNormalTexture = useLoader(
    TextureLoader,
    "/textures/4k_venus_atmosphere.jpeg"
  );
  const marsNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_mars.jpeg"
  );
  const earthNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_earth_daymap.jpeg"
  );
  const neptuneNormalTexture = useLoader(
    TextureLoader,
    "/textures/2k_neptune.jpeg"
  );
  const uranusNormalTexture = useLoader(
    TextureLoader,
    "/textures/2k_uranus.jpeg"
  );
  const saturnNormalTexture = useLoader(
    TextureLoader,
    "/textures/th_saturn.png"
  );

  

  const jupiterNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_jupiter.jpeg"
  );

  // const jupiterMaterial = proceduralMaterialGenerator();

    let scale = 0.5;

    if(radius){
        scale = radius;
    }
    if(mass){
        scale = mass;
    }


  let material = mercuryNormalTexture;

  if (scale > 0.05 && scale <= 0.2) {
    material = venusNormalTexture;
  }
  if (scale > 0.2 && scale <= 0.5 || name === "Uranus") {
    material = uranusNormalTexture;
  }
  if (scale > 0.5 && scale < 1  || name === "Neptune") {
    material = neptuneNormalTexture;
  }
  if (scale >= 1 || name === "Jupiter") {
    material = jupiterNormalTexture;
  }

  if(name === "Venus"){
    material = venusNormalTexture;
  }
  if(name === "Venus"){
    material = venusNormalTexture;
  }
  if(name === "Neptune"){
    material = neptuneNormalTexture;
  }
  if(name === "Saturn"){
    material = saturnNormalTexture;
  }
  if(name === "Uranus"){
    material = uranusNormalTexture;
  }
  if(name === "Mars"){
    material = marsNormalTexture;
  }
  if(name === "Earth"){
    material = earthNormalTexture;
  }


  return material;
};


export default PlanetTexture;