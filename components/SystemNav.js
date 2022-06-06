const SystemNav = ({ refs }) => {
  return (
    <nav className="systemNav">
      {refs.current.system && console.log(refs.current.system)}
      <ul>
        <li>
          {refs.current.system && refs.current.system.star.current.name}
          <ul>
            {refs.current.system &&
              refs.current.system.planets.current.map((planet, i) => {
                console.log({ planet });
                return <li key={i}>{planet.current.name}</li>;
              })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default SystemNav;
