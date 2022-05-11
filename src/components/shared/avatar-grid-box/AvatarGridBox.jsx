import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { CustomAvatar } from "components";

export const AvatarGridBox = ({ children, imgSrc, imgAlt, className }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      className={className}
    >
      <Box gridColumn="span 1">
        <CustomAvatar
          sxStyles={{
            height: "5rem",
            width: "5rem",
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
