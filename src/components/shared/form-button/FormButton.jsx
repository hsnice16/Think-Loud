import PropTypes from "prop-types";
import { spinnerGIF } from "assets";
import classNames from "classnames";
import { Button } from "@mui/material";
import { isStatusLoading } from "utils";
import styles from "./FormButton.module.css";

export const FormButton = ({ btnText, onClick, status, sxStyles }) => {
  return (
    <Button
      fullWidth
      sx={sxStyles}
      onClick={onClick}
      variant="contained"
      disabled={isStatusLoading(status)}
      className={
        isStatusLoading(status)
          ? classNames(styles.btn, styles.btn_disabled)
          : ""
      }
    >
      {isStatusLoading(status) && (
        <img
          src={spinnerGIF}
          alt="loading spinner, gif"
          className={styles.spinnerImg}
        />
      )}
      {btnText}
    </Button>
  );
};

FormButton.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.string,
  btnText: PropTypes.string,
  sxStyles: PropTypes.object,
};

FormButton.defaultProps = {
  status: "",
  btnText: "",
  sxStyles: {},
  onClick: () => {},
};
