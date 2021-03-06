import PropTypes from "prop-types";
import { Box } from "@mui/material";
import styles from "./FormWrapper.module.css";

export const FormWrapper = ({ children }) => {
  return (
    <Box component="form" className={styles.form}>
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
