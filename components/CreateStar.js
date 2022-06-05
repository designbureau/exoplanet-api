import Star from "./Star";
const CreateStar = ({ data, setCameraPosition, setFocus, setClicked, refs }) => {



  const Stars = data.map((star, i) => {

    console.log({i});

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
      key={star.name[0]}
      position={[x, y, z]}
      starSystemData={star}
      setCameraPosition={setCameraPosition}
      setFocus={setFocus}
      setClicked={setClicked}
      refs={refs}
    />
  });

  return Stars;
};

export default CreateStar;
