import "./App.css";

import { Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";

import { LeftSideNavbar, RightSideBar } from "components";
import { Bookmarks, Explore, Home, Profile } from "pages";
import {
  ROUTE_BOOKMARKS,
  ROUTE_EXPLORE,
  ROUTE_HOME,
  ROUTE_PROFILE,
} from "utils";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Grid container sx={{ minHeight: "100vh" }}>
          <LeftSideNavbar />

          <Grid component="main" item sm={9} md={6} p={2}>
            <Routes>
              <Route path={ROUTE_BOOKMARKS} element={<Bookmarks />} />
              <Route path={ROUTE_EXPLORE} element={<Explore />} />
              <Route path={ROUTE_HOME} element={<Home />} />
              <Route path={ROUTE_PROFILE} element={<Profile />} />
            </Routes>
          </Grid>

          <RightSideBar />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
