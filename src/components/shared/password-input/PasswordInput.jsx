import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PasswordInput.module.css";
import { EyeCloseIcon, EyeOpenIcon } from "assets";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const PasswordInput = ({ label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      placeholder={showPassword ? placeholder : "********"}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              className={styles.btn_eyeIcon}
            >
              {showPassword ? (
                <EyeOpenIcon className={styles.eyeIcon} />
              ) : (
                <EyeCloseIcon className={styles.eyeIcon} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

PasswordInput.defaultProps = {
  label: "",
  placeholder: "",
};
