import Head from "next/head";
import Link from 'next/link'

import { useState, useEffect, useRef } from "react";

export default function ApiBrowser() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [systemData, setSystemData] = useState(null);

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
  

  if (!data) return <p>No system data</p>;

  const clickHandler = (system) => {
    setLoading(true);
    fetch(`api/systems/${system}`)
        
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong');
        })
      .then((data) => {
        setSystemData(data.result.system);
        setLoading(false);
      })
      .catch((error) => {
          setSystemData(res);
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
    <div className="grid">
      <div className="api-nav">
      <h3>Endpoints</h3>
      <ul className="pb-0 api-menu">
        <li><Link href="/api/systems/all">/api/systems/all</Link></li>
        <li><Link href={`/api/systems/${systemData? systemData.name : "24 Boo"}`}>{`${systemData? "/api/systems/"+ encodeURIComponent(systemData.name) : "/api/systems/{system}" }`}</Link></li>
      </ul>
      <ul className="navigation active relative mt-0">
      <li className="hasSubMenu">
          <h3 className="text-white">Systems</h3>

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




      </div>
      {systemData && (<pre>
        { isLoading ? <p>Loading...</p> : JSON.stringify(systemData, null, 2)}
        </pre>)}
    </div>
  );
}


