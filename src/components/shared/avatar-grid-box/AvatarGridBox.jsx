import PropTypes from "prop-types";
import { Avatar, Box } from "@mui/material";

export const AvatarGridBox = ({ children, imgSrc, imgAlt, className }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      className={className}
    >
      <Box gridColumn="span 1">
        <Avatar
          sx={{
            height: "5rem",
            width: "5rem",
          }}
          alt={imgAlt}
          src={imgSrc}
          imgProps={{
            loading: "lazy",
          }}
        />
      </Box>

      <Box gridColumn="span 11">{children} </Box>
    </Box>
  );
};

AvatarGridBox.propTypes = {
  children: PropTypes.node,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  className: PropTypes.string,
};

AvatarGridBox.defaultProps = {
  children: <></>,
  imgSrc: "",
  imgAlt: "",
  className: "",
};
