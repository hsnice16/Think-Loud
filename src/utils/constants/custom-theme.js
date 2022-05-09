export const CustomTheme = {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
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
      dark: "#3a7be4", // --COLOR-PRIMARY-DARK-100
      main: "#3b82f6", // --COLOR-PRIMARY
    },
  },
};
