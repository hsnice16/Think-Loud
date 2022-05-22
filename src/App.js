import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box, Container, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Bookmarks, Explore, Home, Landing, Profile, SinglePost } from "pages";

import {
  NotFound,
  ProtectRoute,
  RightSideBar,
  RestrictRoute,
  LeftSideNavbar,
} from "components";

import {
  ROUTE_HOME,
  CustomTheme,
  ROUTE_EXPLORE,
  ROUTE_LANDING,
  ROUTE_PROFILE,
  ROUTE_BOOKMARKS,
  ROUTE_READ_POST,
} from "utils";

function App() {
  const location = useLocation();
  const theme = createTheme(CustomTheme);
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const { isUserAuthTokenExist } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      {location.pathname === ROUTE_LANDING ? (
        <Routes>
          <Route element={<RestrictRoute />}>
            <Route path={ROUTE_LANDING} element={<Landing />} />
          </Route>
        </Routes>
      ) : (
        <Container className="container-lg">
          <Box
            display="grid"
            sx={{ minHeight: "100vh" }}
            gridTemplateColumns="repeat(12, 1fr)"
          >
            {isUserAuthTokenExist && <LeftSideNavbar />}

            <Box
              component="main"
              className="main-container"
              gridColumn={matches ? "span 9" : "span 6"}
            >
              <Routes>
                <Route element={<ProtectRoute />}>
                  <Route path={ROUTE_BOOKMARKS} element={<Bookmarks />} />
                  <Route path={ROUTE_EXPLORE} element={<Explore />} />
                  <Route path={ROUTE_HOME} element={<Home />} />
                  <Route
                    path={`${ROUTE_PROFILE}/:username`}
                    element={<Profile />}
                  />
                  <Route
                    path={`${ROUTE_READ_POST}/:postId`}
                    element={<SinglePost />}
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>

            {isUserAuthTokenExist && <RightSideBar />}
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;
