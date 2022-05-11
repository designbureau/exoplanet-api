import Star from "./Star";
const CreateStar = (data, setCameraPosition) => {
  const Stars = data.map((star, i) => {

    console.log(i);

    let x = Math.random() * 20 - 1;
    let y = Math.random() * 20 - 1;
    let z = Math.random() * 20 - 1;

    // if (i === 0) {
    //   x = 0;
    //   y = 0;
    //   z = 0;
    // }

    console.log("star", star.name[0]);
    return <Star key={star.name[0]} position={[x,y,z]} starSystemData={star} setCameraPosition={setCameraPosition} />;
  });

  return Stars;
};

export default CreateStar;