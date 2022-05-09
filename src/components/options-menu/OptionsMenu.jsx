import PropTypes from "prop-types";
import styles from "./OptionsMenu.module.css";
import { Menu, MenuItem } from "@mui/material";

export const OptionsMenu = ({ anchorEl, setAnchorEl, menuItems }) => {
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={openMenu}
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
    >
      {menuItems.map(({ _id, item }) => (
        <MenuItem key={_id} disableRipple onClick={handleClose}>
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
      _id: PropTypes.string,
      item: PropTypes.node,
    })
  ),
};

OptionsMenu.defaultProps = {
  anchorEl: null,
  setAnchorEl: () => {},
  menuItems: [{ _id: "", item: "" }],
};
