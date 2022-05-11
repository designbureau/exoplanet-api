import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";

const CreateBinary = (systemData, setCameraPosition) => {
  // return (
  //   <>
  //     {systemData.binary &&
  //       systemData.binary.map((subset) => {
  //         console.log("binary", subset.name);
  //         CreateBinary(subset);
  //       })}
  //     {systemData.star && CreateStar(systemData.star)}
  //     {systemData.planet && CreatePlanet(systemData.planet)}
  //   </>
  // );

  // let Binary =
  //   systemData.binary &&
  //   systemData.binary.star && systemData.binary.star.forEach((star) => {
  //     return CreateStar(star);
  //   });

// let BinaryDisplay =  systemData.binary && console.log("Binary",systemData.binary );




  let Star = systemData.star && CreateStar(systemData.star, setCameraPosition);
  let Planet = systemData.planet && CreatePlanet(systemData.planet, setCameraPosition);

  let Binary = systemData.binary && systemData.binary.map((binary) => {
    console.log("Binary", binary);
    return CreateBinary(binary, setCameraPosition);
  });

  // console.log("data", systemData);

  return (
    <>
      {Binary}
      {Star}
      {Planet}
    </>
  );
};

export default CreateBinary;
