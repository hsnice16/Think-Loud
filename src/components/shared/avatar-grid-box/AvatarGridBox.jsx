import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { CustomAvatar } from "components";

export const AvatarGridBox = ({
  children,
  username,
  avatarSrc,
  className,
  handleClick,
}) => {
  return (
    <Box
      gap={2}
      display="grid"
      className={className}
      onClick={handleClick}
      gridTemplateColumns="repeat(12, 1fr)"
    >
      <Box gridColumn="span 1">
        <CustomAvatar
          sxStyles={{
            height: "5rem",
            width: "5rem",
          }}
          username={username}
          avatarSrc={avatarSrc}
        />
      </Box>

      <Box gridColumn="span 11">{children} </Box>
    </Box>
  );
};

AvatarGridBox.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string,
  avatarSrc: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

AvatarGridBox.defaultProps = {
  username: "",
  avatarSrc: "",
  className: "",
  children: <></>,
  handleClick: () => {},
};
