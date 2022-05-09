import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";

const CreateBinary = (data) => {
  // return (
  //   <>
  //     {data.binary &&
  //       data.binary.map((subset) => {
  //         console.log("binary", subset.name);
  //         CreateBinary(subset);
  //       })}
  //     {data.star && CreateStar(data.star)}
  //     {data.planet && CreatePlanet(data.planet)}
  //   </>
  // );

  // let Binary =
  //   data.binary &&
  //   data.binary.star && data.binary.star.forEach((star) => {
  //     return CreateStar(star);
  //   });

// let BinaryDisplay =  data.binary && console.log("Binary",data.binary );




  let Star = data.star && CreateStar(data.star);
  let Planet = data.planet && CreatePlanet(data.planet);

  let Binary = data.binary && data.binary.map((binary) => {
    console.log("Binary", binary);
    return CreateBinary(binary);
  });

  return (
    <group>
      {Binary}
      {Star}
      {Planet}
    </group>
  );
};

export default CreateBinary;
