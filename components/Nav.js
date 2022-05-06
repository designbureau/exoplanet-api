import { useState, useEffect } from "react";
import Link from "next/link";

const Nav = ({setSystemData}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    // setLoading(true);
    fetch("api/systems/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // setLoading(false);
      });
  }, []);

  const navHandler = () => {
    setNavActive(!navActive);
  }

  const clickHandler = (system) => {
    setLoading(true);
    navHandler();
    fetch(`api/systems/${system}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setSystemData(data.result.system);
        setLoading(false);
        // console.log(data.result.system);
      })
      .catch((error) => {
        // setSystemData(data.result.system);
        setLoading(false);
      });
  };

  return (
    <nav className={`navigation ${navActive? "active" : ""}`}>
      <button className={`navigationToggle ${navActive? "active" : ""}`} onClick={()=>{navHandler()}}>{navActive? "Close" : "Menu"}</button>
      <ul >
        <li>
          <Link href="/api-browser">API Browser</Link>
        </li>
        <li className="hasSubMenu">
          <span>Systems</span>
          <ul className="subMenu">
            {data &&
            data.systems.map((system) => {
              return (
                <li key={system}>
                  <button
                    onClick={() => {
                      clickHandler(system);
                    }}
                  >
                    {system}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
        
      </ul>
    </nav>
  );
};

export default Nav;
