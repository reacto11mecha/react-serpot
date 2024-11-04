import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useSerial } from "./SerialProvider";

function App() {
  const { portState, disconnect, connect, subscribe } = useSerial();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const wawawa = subscribe((d) => {
      console.table(d);
      setCount((d) => d + 1);
    });

    return () => {
      wawawa();
    };
  }, []);

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
        <p>Port state: {portState}</p>
        <p>Count: {count.toString(16)}</p>
      </div>
    </>
  );
}

export default App;
