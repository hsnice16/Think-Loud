import { useState } from "react";
import PropTypes from "prop-types";
import { SignInDialogData } from "data";
import styles from "./SignInDialog.module.css";
import { DialogActionsCloseIcon } from "components";
import { EyeCloseIcon, EyeOpenIcon, spinnerGIF } from "assets";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const { buttonData } = SignInDialogData;

export const SignInDialog = ({ openSignInDialog, setOpenSignInDialog }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setOpenSignInDialog(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Dialog open={openSignInDialog} className={styles.dialogContainer}>
      <DialogActionsCloseIcon handleClose={handleClose} />
      <DialogContent className={styles.dialogContent}>
        <Typography variant="h1" component="h1" className={styles.heading}>
          Log In
        </Typography>
        <Box component="form" noValidate className={styles.form}>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            placeholder="think.loud@example.com"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
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
          <FormControlLabel
            value="remember-me"
            control={<Checkbox disableRipple />}
            label="Remember me"
            aria-label="remember me"
            labelPlacement="end"
          />
        </Box>
      </DialogContent>
      <DialogActions className={styles.action_logIn}>
        {buttonData.map(({ _id, btnText, sxStyles }) => (
          <Button key={_id} sx={sxStyles} variant="contained" fullWidth>
            <img
              src={spinnerGIF}
              alt="loading spinner, gif"
              className={styles.spinnerImg}
            />
            {btnText}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

SignInDialog.propTypes = {
  openSignInDialog: PropTypes.bool,
  setOpenSignInDialog: PropTypes.func,
};

SignInDialog.defaultProps = {
  openSignInDialog: false,
  setOpenSignInDialog: () => {},
};
