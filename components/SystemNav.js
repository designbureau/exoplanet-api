const SystemNav = ({ refs }) => {

  {refs.current && console.log("refs lekker", refs.current)}

  return (
    <nav className="systemNav">
      <ul>


      {refs.current &&
        refs.current.map((system, i) => {
          return (
          <li key={i}>
            {system.star.current && system.star.current.name}
            <ul>
              {system.planets.current &&
                system.planets.current.map((planet, i) => {
                  return planet.current && (<li key={i}>{planet.current.name }</li>);
                })}
            </ul>
          </li>
          );
        })}


      </ul>
    </nav>
  );
};
export default SystemNav;
