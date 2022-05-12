import PropTypes from "prop-types";
import { useAuthHandler } from "custom-hooks";
import styles from "./SignInDialog.module.css";

import {
  FormError,
  FormButton,
  FormHeading,
  FormWrapper,
  PasswordInput,
  DialogActionsCloseIcon,
} from "components";

import {
  Dialog,
  Checkbox,
  TextField,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from "@mui/material";

export const SignInDialog = ({ openSignInDialog, setOpenSignInDialog }) => {
  const {
    status,
    error,
    email,
    password,
    rememberMe,
    handleInputChange,
    handleGuestLogInClick,
    handleSignInFormSubmit,
  } = useAuthHandler();

  const handleClose = () => {
    setOpenSignInDialog(false);
  };

  return (
    <Dialog open={openSignInDialog} className={styles.dialogContainer}>
      <DialogActionsCloseIcon handleClose={handleClose} />

      <DialogContent className={styles.dialogContent}>
        <FormHeading headingText="Log In" />

        {status === "error" && <FormError errorToShow={error} />}

        <FormWrapper>
          <TextField
            autoFocus
            type="email"
            name="email"
            value={email}
            label="Email Address"
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            placeholder="think.loud@example.com"
          />

          <PasswordInput
            name="password"
            label="Password"
            value={password}
            placeholder="password"
            onChange={handleInputChange}
          />

          <FormControlLabel
            label="Remember me"
            labelPlacement="end"
            checked={rememberMe}
            aria-label="remember me"
            onChange={handleInputChange}
            control={<Checkbox disableRipple />}
          />
        </FormWrapper>
      </DialogContent>

      <DialogActions className={styles.action_logIn}>
        <FormButton
          status={status}
          btnText="Log In"
          onClick={handleSignInFormSubmit}
          sxStyles={{ margin: "1rem 0 0.5rem" }}
        />
        <FormButton
          status={status}
          btnText="Log In as a Guest"
          onClick={handleGuestLogInClick}
          sxStyles={{ margin: "0.5rem 0 0" }}
        />
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
