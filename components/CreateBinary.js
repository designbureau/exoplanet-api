import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";

const CreateBinary = (data) => {
  data.star && CreateStar(data.star);
  data.planet && CreatePlanet(data.planet);
  data.binary &&
    data.binary.map((data) => {
      console.log("binary", data.name);
      CreateBinary(data);
    });
};

export default CreateBinary;