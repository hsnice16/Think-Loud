import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import { Box, Container, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LeftSideNavbar, RightSideBar } from "components";
import { Bookmarks, Explore, Home, Landing, Profile } from "pages";
import {
  CustomTheme,
  ROUTE_BOOKMARKS,
  ROUTE_EXPLORE,
  ROUTE_HOME,
  ROUTE_LANDING,
  ROUTE_PROFILE,
} from "utils";

function App() {
  const location = useLocation();
  const theme = createTheme(CustomTheme);
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      {location.pathname === ROUTE_LANDING ? (
        <Landing />
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
              gridColumn={matches ? "span 9" : "span 6"}
              p={2}
            >
              <Routes>
                <Route path={ROUTE_BOOKMARKS} element={<Bookmarks />} />
                <Route path={ROUTE_EXPLORE} element={<Explore />} />
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path={ROUTE_PROFILE} element={<Profile />} />
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
