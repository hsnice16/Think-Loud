import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./FormWrapper.module.css";

export const FormWrapper = ({ children }) => {
  return (
    <Box component="form" noValidate className={styles.form}>
      {children}
    </Box>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node,
};

FormWrapper.defaultProps = {
  children: <></>,
};
