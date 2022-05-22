import React from "react";
import { createRoot } from "react-dom/client";

import { makeServer } from "./server";

import App from "./App";
import { Compose } from "components";
import { BrowserRouter } from "react-router-dom";
import {
  PostsProvider,
  FollowProvider,
  ProfileProvider,
  BookmarksProvider,
} from "context";

import { Provider } from "react-redux";
import { store } from "redux/app/store";
import { AppWrapper } from "./AppWrapper";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <Compose
          components={[
            BrowserRouter,
            ProfileProvider,
            FollowProvider,
            PostsProvider,
            BookmarksProvider,
          ]}
        >
          <App />
        </Compose>
      </AppWrapper>
    </Provider>
  </React.StrictMode>
);
