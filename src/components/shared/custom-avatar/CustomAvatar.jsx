import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { FilledAccountCircleIcon } from "assets";

export const CustomAvatar = ({ sxStyles, avatarSrc, username }) => {
  return avatarSrc ? (
    <Avatar
      sx={sxStyles}
      src={avatarSrc}
      alt={`${username} avatar`}
      imgProps={{ loading: "lazy" }}
    />
  ) : (
    <Avatar sx={{ ...sxStyles, backgroundColor: "unset" }}>
      <FilledAccountCircleIcon fill="var(--COLOR-TEXT)" />
    </Avatar>
  );
};

CustomAvatar.propTypes = {
  sxStyles: PropTypes.object,
  username: PropTypes.string,
  avatarSrc: PropTypes.string,
};

CustomAvatar.defaultProps = {
  sxStyles: {},
  username: "",
  avatarSrc: "",
};
