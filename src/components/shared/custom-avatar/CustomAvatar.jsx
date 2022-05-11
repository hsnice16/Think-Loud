import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { FilledAccountCircleIcon, HimanshuJPG } from "assets";

export const CustomAvatar = ({ sxStyles }) => {
  const isImgSrcPresent = false;

  return isImgSrcPresent ? (
    <Avatar
      sx={sxStyles}
      alt="Himanshu Avatar"
      src={HimanshuJPG}
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
};

CustomAvatar.defaultProps = {
  sxStyles: {},
};
