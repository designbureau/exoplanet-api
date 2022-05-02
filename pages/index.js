import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [systemData, setSystemData] = useState(null);

  useEffect(() => {
    // setLoading(true);
    fetch("api/systems")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No system data</p>;

  const clickHandler = (system) => {
    // setLoading(true);
    fetch(`api/system/${system}`)
      .then((res) => res.json())
      .then((data) => {
        setSystemData(data.result.system);
        // setLoading(false);
      });
  };

  return (
    <div className="grid">
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
      {systemData && (<pre>{JSON.stringify(systemData, null, 2)}</pre>)}
    </div>
  );
}
