import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const CustomButton = ({
  children,
  sxStyles,
  className,
  disabled,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      sx={{
        borderRadius: "3.5rem",
        fontWeight: "400",
        ...sxStyles,
      }}
      className={className}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node,
  sxStyles: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  children: <></>,
  sxStyles: {},
  className: "",
  disabled: false,
  onClick: () => {},
};
