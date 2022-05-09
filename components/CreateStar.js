import Star from "./Star";
const CreateStar = (data) => {
 
    const Stars = data.map((star) => {
      console.log("star", star.name[0]);   
      return <Star key={star.name[0]} starSystemData={star} />
    });

    return Stars;

  };

  export default CreateStar;