import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [systemData, setSystemData] = useState(null);

  useEffect(() => {
    // setLoading(true);
    fetch("api/systems/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
          setSystemData(error);
          setLoading(false);
        });
  };

  // fetch(url).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error('Something went wrong');
  // })
  // .then((responseJson) => {
  //   // Do something with the response
  // })
  // .catch((error) => {
  //   console.log(error)
  // });


  return (
    <div className="grid">
      <div>
      <h3>Endpoints:</h3>
      <ul>
        <li><Link href="/api/systems/all">/api/systems/all</Link></li>
        <li><Link href={`/api/systems/${systemData? systemData.name : "24 Boo"}`}>{`${systemData? "/api/systems/"+ encodeURIComponent(systemData.name) : "/api/systems/{system}" }`}</Link></li>
      </ul>
      <ul>
        {data.systems.map((system) => {
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
      </div>
      {systemData && (<pre>
        { isLoading ? <p>Loading...</p> : JSON.stringify(systemData, null, 2)}
        </pre>)}
    </div>
  );
}
