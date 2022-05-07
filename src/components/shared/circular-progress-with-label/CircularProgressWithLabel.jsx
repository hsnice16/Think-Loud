import { Box, CircularProgress, Typography } from "@mui/material";

export const CircularProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size="3rem"
        sx={{ color: "var(--COLOR-FOLLOW-BACKGROUND)", marginRight: "1rem" }}
        variant="determinate"
        value={Math.round((value * 100) / 20)}
      />

      <Box
        sx={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          marginRight: "1rem",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <Typography
          fontSize="1.2rem"
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
