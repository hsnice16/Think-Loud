import React from "react";

import { useTheme } from "@mui/material/styles";
import { Grid, Typography, useMediaQuery } from "@mui/material";

export const RightSideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      component="aside"
      item
      md={3}
      p={2}
      sx={{ display: matches ? "none" : "unset" }}
    >
      <Typography variant="h4">Right SideBar</Typography>
    </Grid>
  );
};
