import PropTypes from "prop-types";
import { spinnerGIF } from "assets";
import { Button } from "@mui/material";
import styles from "./FormButton.module.css";

export const FormButton = ({ sxStyles, btnText }) => {
  return (
    <Button sx={sxStyles} variant="contained" fullWidth>
      <img
        src={spinnerGIF}
        alt="loading spinner, gif"
        className={styles.spinnerImg}
      />
      {btnText}
    </Button>
  );
};

FormButton.propTypes = {
  sxStyles: PropTypes.object,
  btnText: PropTypes.string,
};

FormButton.defaultProps = {
  sxStyles: {},
  btnText: "",
};
