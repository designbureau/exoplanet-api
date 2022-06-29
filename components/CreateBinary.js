import CreateStar from "./CreateStar";
import CreatePlanet from "./CreatePlanet";
import { useRef, useEffect } from "react";
import JsonFind from "json-find";

const CreateBinary = (
  systemData,
  setFocus,
  setClicked,
  refs,
  setViewState,
  setRefsArray,
  setDragged
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
      setDragged={setDragged}
      refs={refs}
      setViewState={setViewState}
      setRefsArray={setRefsArray}
    />
  );

  //TODO: figure out how to do circumbinary planets. Maybe treat it like a star in setting refs

  let Planet;
    if(systemData.planet){

      Planet = <CreatePlanet
        data={systemData.planet}
        setFocus={setFocus}
        setClicked={setClicked}
        setDragged={setDragged}
        refs={refs}
        setViewState={setViewState}
        setRefsArray={setRefsArray}
        pType={true}
      />;
    }

  let Binary;
  const au = 1000;

  //TODO: 1000 is random default separation.
  let x = Math.random() * 1000 * au - 1;
  let y = Math.random() * 1000 * au - 1;
  let z = Math.random() * 1000 * au - 1;

  systemData.binary &&
    (Binary = systemData.binary.map((binary, i) => {
      if (binary.hasOwnProperty("separation")) {
        console.log("separation", parseFloat(binary.separation[1]._));
        let separation = parseFloat(binary.separation[1]._);
        x = Math.random() * au * separation - 1;
        y = Math.random() * au * separation - 1;
        z = Math.random() * au * separation - 1;
      }

      return CreateBinary(
        binary,
        setFocus,
        setClicked,
        refs,
        setViewState,
        setRefsArray,
        setDragged
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
