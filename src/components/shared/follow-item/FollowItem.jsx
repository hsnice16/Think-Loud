import PropTypes from "prop-types";
import classNames from "classnames";
import { CustomAvatar } from "components";
import styles from "./FollowItem.module.css";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const FollowItem = ({
  onClick,
  children,
  fullName,
  username,
  avatarSrc,
  linkProps,
  itemSxStyles,
  itemClassName,
  itemComponent,
  textClassName,
  avatarSxStyles,
}) => {
  return (
    <ListItem
      onClick={onClick}
      sx={itemSxStyles}
      component={itemComponent}
      className={itemClassName}
    >
      <ListItemAvatar sx={{ minWidth: "1rem" }}>
        <CustomAvatar
          username={username}
          avatarSrc={avatarSrc}
          sxStyles={avatarSxStyles}
        />
      </ListItemAvatar>

      <ListItemText
        primary={fullName}
        secondary={`@${username}`}
        primaryTypographyProps={linkProps}
        className={classNames(textClassName, styles.followText)}
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
  avatarSrc: PropTypes.string,
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
  avatarSrc: "",
  linkProps: {},
  children: <></>,
  itemSxStyles: {},
  itemClassName: "",
  itemComponent: "",
  textClassName: "",
  onClick: () => {},
  avatarSxStyles: {},
};
