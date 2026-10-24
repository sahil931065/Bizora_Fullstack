import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { BizoraProvider } from "./context/BizoraContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BizoraProvider><App /></BizoraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
