import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PasswordInput.module.css";
import { EyeCloseIcon, EyeOpenIcon } from "assets";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const PasswordInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      InputLabelProps={{ shrink: true }}
      type={showPassword ? "text" : "password"}
      placeholder={showPassword ? placeholder : "********"}
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
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

PasswordInput.defaultProps = {
  name: "",
  label: "",
  value: "",
  placeholder: "",
  onChange: () => {},
};
