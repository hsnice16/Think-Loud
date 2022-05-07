export const CustomTheme = {
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#3b82f6",
      dark: "#3a7be4",
    },
  },
};
