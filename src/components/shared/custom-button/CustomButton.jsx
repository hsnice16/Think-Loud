import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const CustomButton = ({
  onClick,
  children,
  disabled,
  sxStyles,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      className={className}
      sx={{
        fontWeight: "400",
        borderRadius: "3.5rem",
        ...sxStyles,
      }}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  sxStyles: PropTypes.object,
  className: PropTypes.string,
};

CustomButton.defaultProps = {
  sxStyles: {},
  className: "",
  children: <></>,
  disabled: false,
  onClick: () => {},
};
