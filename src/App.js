import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import { Box, Container, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  ProtectRoute,
  RightSideBar,
  RestrictRoute,
  LeftSideNavbar,
} from "components";
import { Bookmarks, Explore, Home, Landing, Profile } from "pages";

import {
  ROUTE_HOME,
  CustomTheme,
  ROUTE_EXPLORE,
  ROUTE_LANDING,
  ROUTE_PROFILE,
  ROUTE_BOOKMARKS,
} from "utils";

function App() {
  const location = useLocation();
  const theme = createTheme(CustomTheme);
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

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
            gridTemplateColumns="repeat(12, 1fr)"
            sx={{ minHeight: "100vh" }}
          >
            <LeftSideNavbar />

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
                </Route>
              </Routes>
            </Box>

            <RightSideBar />
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;
