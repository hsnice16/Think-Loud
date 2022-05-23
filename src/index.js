import React from "react";
import { createRoot } from "react-dom/client";

import { makeServer } from "./server";

import { FollowProvider } from "context";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "redux/app/store";
import { AppWrapper } from "./AppWrapper";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppWrapper>
          <FollowProvider>
            <App />
          </FollowProvider>
        </AppWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
