import Planet from "./Planet";

const CreatePlanet = (data) => {
  const Planets = data.map((planet) => {
    // console.log("planet", planet.name[0]);
    return <Planet key={planet.name[0]} name={planet.name[0]}/>;
  });

  return Planets;
};

export default CreatePlanet;
