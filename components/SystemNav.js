const CreateStar = (data) => {
  data.map((star) => {
    console.log("star", star.name);
  });
};

const CreatePlanet = (data) => {
  data.map((planet) => {
    console.log("planet", planet.name);
  });
};

const CreateBinary = (data) => {
  data.star && CreateStar(data.star);
  data.planet && CreatePlanet(data.planet);
  data.binary &&
    data.binary.map((data) => {
      console.log("binary", data.name);
      CreateBinary(data);
    });
};

const SystemNav = ({ systemData }) => {
  return (
    <nav className="systemNav">
      {systemData.name}

      {console.log("full system info", systemData)}

      {CreateBinary(systemData)}
    </nav>
  );
};
export default SystemNav;
