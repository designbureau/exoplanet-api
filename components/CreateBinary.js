import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";
// import { useRef } from "react";

const CreateBinary = (systemData, setCameraPosition, setFocus, refs) => {
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

// const starRefs = useRef(new Array())
// {items.map(item => (
//  <p key={item} ref={(element) => itemEls.current.push(element)}>{item}</p>


  let Star = systemData.star && CreateStar(systemData.star, setCameraPosition, setFocus, refs);
  let Planet = systemData.planet && CreatePlanet(systemData.planet, setCameraPosition, setFocus, refs);

  let Binary = systemData.binary && systemData.binary.map((binary) => {
    console.log("Binary", binary);
    return CreateBinary(binary, setCameraPosition, setFocus, refs);
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
