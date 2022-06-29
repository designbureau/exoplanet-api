import Star from "./Star";
import { useRef } from "react";

const CreateStar = ({ data, setFocus, setClicked, refs, setViewState, setRefsArray, setDragged }) => {

  // const starElements = useRef(new Array())

  const Stars = data.map((star, i) => {

    // console.log({i});

    let x = 0;
    let y = 0;
    let z = 0;

    if(i > 0){
        x = Math.random() * 500 - 1;
        y = Math.random() * 500 - 1;
        z = Math.random() * 500 - 1;
    }     
   

    // console.log("star", star.name[0]);
    return <Star
      key={i}
      position={[x, y, z]}
      starSystemData={star}
      setFocus={setFocus}
      setClicked={setClicked}
      setDragged={setDragged}
      setViewState={setViewState}
      setRefsArray={setRefsArray}
      refs={refs}
    />
  });

  // refs.current.push(starElements);


  return Stars;
};

export default CreateStar;
