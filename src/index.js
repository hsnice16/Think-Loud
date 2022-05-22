import React from "react";
import { createRoot } from "react-dom/client";

import { makeServer } from "./server";

import { Compose } from "components";
import { FollowProvider, ProfileProvider, BookmarksProvider } from "context";

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
          <Compose
            components={[ProfileProvider, FollowProvider, BookmarksProvider]}
          >
            <App />
          </Compose>
        </AppWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
