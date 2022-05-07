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

    MuiDialog: {
      defaultProps: {
        BackdropProps: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.25)", // --COLOR-SEARCH-INNER-SHADOW
          },
        },

        sx: {
          "& > div:nth-child(3) > div": {
            borderRadius: "1.5rem",
            boxShadow: "none",
          },
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
      main: "#3b82f6", // --COLOR-PRIMARY
      dark: "#3a7be4", // --COLOR-PRIMARY-DARK-100
    },
  },
};
