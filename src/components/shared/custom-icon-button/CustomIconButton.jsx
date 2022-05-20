import PropTypes from "prop-types";
import classNames from "classnames";
import { cloneElement } from "react";
import { IconButton } from "@mui/material";
import styles from "./CustomIconButton.module.css";

export const CustomIconButton = ({
  children,
  disabled,
  ariaLabel,
  className,
  handleClick,
}) => {
  return (
    <IconButton
      size="small"
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={classNames(styles.btn_icon, className)}
    >
      {cloneElement(children, { className: styles.icon })}
    </IconButton>
  );
};

CustomIconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

CustomIconButton.defaultProps = {
  ariaLabel: "",
  className: "",
  children: <></>,
  disabled: false,
  handleClick: () => {},
};
