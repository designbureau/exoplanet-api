import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from "three/src/loaders/CubeTextureLoader";

// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader
    .setPath("/textures/cubemaps/nasa/8k/compressed/")
    .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;
