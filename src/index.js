import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "redux/app/store";
import { AppWrapper } from "./AppWrapper";
import { BrowserRouter } from "react-router-dom";

import { makeServer } from "./server";
// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppWrapper>
          <App />
        </AppWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
