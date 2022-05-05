import PropTypes from "prop-types";
import { HimanshuJPG } from "assets";

import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const FollowItem = ({
  avatarSxStyles,
  children,
  itemClassName,
  itemComponent,
  itemSxStyles,
  textClassName,
  onClick,
}) => {
  return (
    <ListItem
      component={itemComponent}
      className={itemClassName}
      sx={itemSxStyles}
      onClick={onClick}
    >
      <ListItemAvatar sx={{ minWidth: "1rem" }}>
        <Avatar sx={avatarSxStyles} alt="Himanshu Avatar" src={HimanshuJPG} />
      </ListItemAvatar>
      <ListItemText
        primary="Himanshu Singh"
        secondary="@hsnice16"
        className={textClassName}
      />
      {children}
    </ListItem>
  );
};

FollowItem.propTypes = {
  avatarSxStyles: PropTypes.object,
  children: PropTypes.node,
  itemClassName: PropTypes.string,
  itemComponent: PropTypes.string,
  itemSxStyles: PropTypes.object,
  textClassName: PropTypes.string,
  onClick: PropTypes.func,
};

FollowItem.defaultProps = {
  avatarSxStyles: {},
  children: <></>,
  itemClassName: "",
  itemComponent: "",
  itemSxStyles: {},
  textClassName: "",
  onClick: () => {},
};
