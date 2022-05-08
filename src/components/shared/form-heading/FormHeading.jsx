import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import styles from "./FormHeading.module.css";

export const FormHeading = ({ headingText }) => {
  return (
    <Typography variant="h1" component="h1" className={styles.heading}>
      {headingText}
    </Typography>
  );
};

FormHeading.propTypes = {
  headingText: PropTypes.string,
};

FormHeading.defaultProps = {
  headingText: "",
};
