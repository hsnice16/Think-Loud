import PropTypes from "prop-types";
import classNames from "classnames";
import { cloneElement } from "react";
import { IconButton } from "@mui/material";
import styles from "./CustomIconButton.module.css";

export const CustomIconButton = ({
  ariaLabel,
  handleClick,
  className,
  children,
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      size="small"
      onClick={handleClick}
      className={classNames(styles.btn_icon, className)}
    >
      {cloneElement(children, { className: styles.icon })}
    </IconButton>
  );
};

CustomIconButton.propTypes = {
  ariaLabel: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

CustomIconButton.defaultProps = {
  ariaLabel: "",
  handleClick: () => {},
  className: "",
  children: <></>,
};
