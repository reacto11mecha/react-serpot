import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useSerial, type BaudRate } from "./SerialProvider";

function App() {
  const {
    canUseSerial,
    portState,
    disconnect,
    connect,
    baudRate,
    setBaudRate,
  } = useSerial();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Web Serial Test</h1>
      <div className="card">
        <select
          value={String(baudRate)}
          onChange={(d) => setBaudRate(parseInt(d.target.value) as BaudRate)}
          disabled={portState === "opening" || portState === "open"}
        >
          <option value="9600">Baud rate: 9600</option>
          <option value="115200">Baud rate: 115200</option>
        </select>

        <button
          onClick={() => {
            if (portState === "closed") connect();
            else if (portState === "open") disconnect();
          }}
        >
          {portState === "closed" ||
          portState === "closing" ||
          portState === "opening"
            ? "Connect"
            : "Disconnect"}
        </button>
        <p>Can use serial? {canUseSerial ? "yes" : "no"}</p>
        <ChildElement />
      </div>
    </>
  );
}

function ChildElement() {
  const { portState, subscribe } = useSerial();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubcribe = subscribe((d) => {
      console.table(d);
      setCount((d) => d + 1);
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <>
      <p>Port state: {portState}</p>
      <p>
        Count: {count.toString(16)} | {count.toLocaleString("id-ID")}
      </p>
    </>
  );
}

export default App;
