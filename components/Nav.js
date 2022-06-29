import { useState, useEffect, user } from "react";
import Link from "next/link";

const Nav = ({setSystemData, refs, setRefs}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [navActive, setNavActive] = useState(false);


 const [name, setName] = useState('');
 const [foundSystems, setFoundSystems] = useState(null);

  useEffect(() => {
    // setLoading(true);
    fetch("api/systems/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFoundSystems(data);
        // setLoading(false);
      });
  }, []);

  const navHandler = () => {
    setNavActive(!navActive);
    console.log("refs before", refs.current );
    refs.current = new Array();
    console.log("refs after", refs.current );
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


  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.systems.filter((system) => {
        return system.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundSystems(results);
    } else {
      setFoundSystems(data.systems);
      // If the text field is empty, show all users
    }

    setName(keyword);
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


          <input
            type="search"
            value={name}
            onChange={filter}
            className="input filter"
            placeholder="Filter"
          />

          <ul className="subMenu">
            {
            foundSystems && foundSystems.length > 0 ? (
            foundSystems.map((system) => {
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
            })) : 
            
            data && data.systems.map((system) => {
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
              })
            
            
            }
          </ul>
        </li>
        
      </ul>
    </nav>
  );
};

export default Nav;