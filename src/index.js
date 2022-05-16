import React from "react";
import { createRoot } from "react-dom/client";

import { makeServer } from "./server";

import App from "./App";
import { Compose } from "components";
import { BrowserRouter } from "react-router-dom";
import {
  UserProvider,
  PostsProvider,
  FollowProvider,
  ProfileProvider,
  BookmarksProvider,
} from "context";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Compose
      components={[
        BrowserRouter,
        UserProvider,
        ProfileProvider,
        FollowProvider,
        PostsProvider,
        BookmarksProvider,
      ]}
    >
      <App />
    </Compose>
  </React.StrictMode>
);
