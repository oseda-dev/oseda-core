import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


export interface OsedaConfig {
    title: string;
    author: string;
    tags: string[];
    last_updated: string;
    color: string;
    description: string;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
