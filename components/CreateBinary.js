import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";
// import { useRef } from "react";

const CreateBinary = (systemData, setCameraPosition, setFocus, refs, isBinary) => {
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

  // let system = {};


  let Star = systemData.star && <CreateStar data={systemData.star} setCameraPosition={setCameraPosition}  setFocus={setFocus} refs={refs}/>
  let Planet = systemData.planet && <CreatePlanet data={systemData.planet} setCameraPosition={setCameraPosition} setFocus={setFocus} refs={refs} />



  let x = Math.random() * 500 - 1;
  let y = Math.random() * 500 - 1;
  let z = Math.random() * 500 - 1;   

  // systemData.binary && systemData.binary? x = systemData.binary.separation[1]._ : null;

  systemData.binary && console.log(systemData.binary[0].separation[1]._);

  let Binary;
  isBinary && (
  systemData.binary && (Binary = systemData.binary.map((binary, i) => {
    return CreateBinary(binary, setCameraPosition, setFocus, refs, true);
  })));

  // console.log("data", systemData);




 


  return (
    <group 
    position={[x,y,z]}
    >
      {Binary}
      {Star}
      {Planet}
    </group>
  );
};

export default CreateBinary;
