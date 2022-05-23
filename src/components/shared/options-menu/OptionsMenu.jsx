import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OptionsMenu.module.css";
import { Menu, MenuItem } from "@mui/material";

export const OptionsMenu = ({ anchorEl, setAnchorEl, menuItems }) => {
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      open={openMenu}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={styles.menuContainer}
      onClick={(event) => event.stopPropagation()}
    >
      {menuItems.map(({ _id, color, item, handleClick }) => (
        <MenuItem
          key={_id}
          disableRipple
          onClick={handleClick}
          className={classNames(
            styles.menuItem,
            color !== "normal" ? styles[color] : ""
          )}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
};

OptionsMenu.propTypes = {
  anchorEl: PropTypes.node,
  setAnchorEl: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.node,
      _id: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

OptionsMenu.defaultProps = {
  anchorEl: null,
  setAnchorEl: () => {},
  menuItems: [{ _id: "", color: "", item: "" }],
};
