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

const PlanetTexture = (mass, radius) => {

    const mercuryNormalTexture = useLoader(
    TextureLoader,
    "/textures/8k_mercury.jpeg"
  );
  const uranusNormalTexture = useLoader(
    TextureLoader,
    "/textures/2k_uranus.jpeg"
  );
  const venusNormalTexture = useLoader(
    TextureLoader,
    "/textures/4k_venus_atmosphere.jpeg"
  );
  const neptuneNormalTexture = useLoader(
    TextureLoader,
    "/textures/2k_neptune.jpeg"
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
  if (scale > 0.2 && scale <= 0.5) {
    material = uranusNormalTexture;
  }
  if (scale > 0.5 && scale < 1) {
    material = neptuneNormalTexture;
  }
  if (scale >= 1) {
    material = jupiterNormalTexture;
  }
  return material;
};

export default PlanetTexture;