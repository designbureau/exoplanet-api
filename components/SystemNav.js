const SystemNav = ({ refs, setFocus, setClicked}) => {
  // {refs.current && console.log("refs lekker", refs.current)}

  return (
    <nav className="systemNav">
      <ul>
        {refs.current &&
          refs.current.map((system, i) => {
            return (
              <li key={i}>
                {system.star.current && (
                  <span
                    onClick={() => {
                      setFocus(system.star);
                      setClicked(true);
                    }}
                  >
                    {system.star.current.name}
                  </span>
                )}
                <ul>
                  {system.planets.current &&
                    system.planets.current.map((planet, i) => {
                      return (
                        planet.current && (
                          <li
                            key={i}
                            onClick={() => {
                              setFocus(planet);
                              setClicked(true);
                            }}
                          >
                            {planet.current.name}
                          </li>
                        )
                      );
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
