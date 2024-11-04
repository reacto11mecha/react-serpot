import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SerialProvider from "./SerialProvider";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SerialProvider>
      <App />
    </SerialProvider>
  </StrictMode>,
);
