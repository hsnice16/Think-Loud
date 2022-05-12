import React from "react";
import { createRoot } from "react-dom/client";

import { makeServer } from "./server";

import App from "./App";
import { Compose } from "components";
import { UserProvider } from "context";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Compose components={[BrowserRouter, UserProvider]}>
      <App />
    </Compose>
  </React.StrictMode>
);
