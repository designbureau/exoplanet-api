import Star from "./Star";
const CreateStar = (data) => {
    data.map((star) => {
      console.log("star", star.name);   
    });

    return(<Star/>);
  };

  export default CreateStar;