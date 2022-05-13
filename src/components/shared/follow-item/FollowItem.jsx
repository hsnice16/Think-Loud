import PropTypes from "prop-types";
import { CustomAvatar } from "components";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const FollowItem = ({
  onClick,
  children,
  fullName,
  username,
  linkProps,
  itemSxStyles,
  itemClassName,
  itemComponent,
  textClassName,
  avatarSxStyles,
}) => {
  return (
    <ListItem
      sx={itemSxStyles}
      onClick={onClick}
      component={itemComponent}
      className={itemClassName}
    >
      <ListItemAvatar sx={{ minWidth: "1rem" }}>
        <CustomAvatar sxStyles={avatarSxStyles} />
      </ListItemAvatar>

      <ListItemText
        primary={fullName}
        className={textClassName}
        secondary={`@${username}`}
        primaryTypographyProps={linkProps}
      />
      {children}
    </ListItem>
  );
};

FollowItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  fullName: PropTypes.string,
  username: PropTypes.string,
  linkProps: PropTypes.object,
  itemSxStyles: PropTypes.object,
  itemClassName: PropTypes.string,
  itemComponent: PropTypes.string,
  textClassName: PropTypes.string,
  avatarSxStyles: PropTypes.object,
};

FollowItem.defaultProps = {
  fullName: "",
  username: "",
  linkProps: {},
  children: <></>,
  itemSxStyles: {},
  itemClassName: "",
  itemComponent: "",
  textClassName: "",
  onClick: () => {},
  avatarSxStyles: {},
};
