import Planet from "./Planet";

const CreatePlanet = ({data, setFocus, setClicked, refs, setViewState, setRefsArray, setDragged, pType = false}) => {
  console.log("data in createplanet", data);
  const Planets = data.map((planet, i) => {
    return <Planet   
      key={i}
      name={planet.name[0]}
      setFocus={setFocus}
      setClicked={setClicked}
      setDragged={setDragged}
      planetDetails={planet}
      setViewState={setViewState}
      setRefsArray={setRefsArray}
      refs={refs}
      pType={pType}
      />
  });

  return Planets;
};

export default CreatePlanet;
