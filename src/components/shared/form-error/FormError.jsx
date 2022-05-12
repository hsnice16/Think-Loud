import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export const FormError = ({ errorToShow }) => {
  return (
    <Alert severity="error" sx={{ fontSize: "1.4rem", marginTop: "1rem" }}>
      {errorToShow}
    </Alert>
  );
};

FormError.propTypes = {
  errorToShow: PropTypes.string,
};

FormError.defaultProps = {
  errorToShow: "",
};
