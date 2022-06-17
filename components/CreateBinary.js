import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";
// import { useRef } from "react";

const CreateBinary = (
  systemData,
  setFocus,
  setClicked,
  refs,
  setViewState,
  setRefsArray
) => {
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

  systemData.binary &&
    systemData.binary.map((subset) => {
      console.log("binary", subset);
    });
  systemData.star && console.log("star", systemData.star);
  systemData.planet && console.log("planet", systemData.planet);

  let Star = systemData.star && (
    <CreateStar
      data={systemData.star}
      setFocus={setFocus}
      setClicked={setClicked}
      refs={refs}
      setViewState={setViewState}
      setRefsArray={setRefsArray}
    />
  );
  let Planet = systemData.planet && (
    <CreatePlanet
      data={systemData.planet}
      setFocus={setFocus}
      setClicked={setClicked}
      refs={refs}
      setViewState={setViewState}
      setRefsArray={setRefsArray}
    />
  );

  let x = Math.random() * 1000 - 1;
  let y = Math.random() * 1000 - 1;
  let z = Math.random() * 1000 - 1;

  // systemData.binary && systemData.binary? x = systemData.binary.separation[1]._ : null;
  // systemData.binary && console.log(systemData.binary[0].separation[1]._);

  let Binary;

  systemData.binary &&
    (Binary = systemData.binary.map((binary, i) => {
      return CreateBinary(
        binary,
        setFocus,
        setClicked,
        refs,
        setViewState,
        setRefsArray
      );
    }));

  return (
    <group position={[x, y, z]}>
      {Binary}
      {Star}
      {Planet}
    </group>
  );
};

export default CreateBinary;
