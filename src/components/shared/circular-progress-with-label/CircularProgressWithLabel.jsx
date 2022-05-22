import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@mui/material";

export const CircularProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size="3rem"
        variant="determinate"
        value={Math.round((value * 100) / 20)}
        sx={{ color: "var(--COLOR-FOLLOW-BACKGROUND)", marginRight: "1rem" }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          marginRight: "1rem",
          alignItems: "center",
          position: "absolute",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          fontSize="1.2rem"
          variant="caption"
          color="text.secondary"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

CircularProgressWithLabel.defaultProps = {
  value: 0,
};
