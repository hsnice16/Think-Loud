import PropTypes from "prop-types";
import { useAuthHandler } from "custom-hooks";
import styles from "./SignUpDialog.module.css";

import {
  FormError,
  FormButton,
  FormHeading,
  FormWrapper,
  PasswordInput,
  DialogActionsCloseIcon,
} from "components";

import {
  Box,
  Dialog,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
} from "@mui/material";

export const SignUpDialog = ({ openSignUpDialog, setOpenSignUpDialog }) => {
  const {
    error,
    email,
    status,
    lastName,
    password,
    firstName,
    confirmPassword,
    handleInputChange,
    handleSignUpFormSubmit,
  } = useAuthHandler();

  const handleClose = () => {
    setOpenSignUpDialog(false);
  };

  return (
    <Dialog open={openSignUpDialog} className={styles.dialogContainer}>
      <DialogActionsCloseIcon handleClose={handleClose} />

      <DialogContent className={styles.dialogContent}>
        <FormHeading headingText="Sign Up" />

        {status === "error" && <FormError errorToShow={error} />}

        <FormWrapper>
          <Box className={styles.textInput_container}>
            <TextField
              autoFocus
              type="text"
              name="firstName"
              value={firstName}
              label="First Name"
              placeholder="Think"
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="text"
              name="lastName"
              value={lastName}
              label="Last Name"
              placeholder="Loud"
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
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
          <Typography mb="1rem" fontSize="1.2rem">
            Should be Alpha Numeric and should have minimum length 6.
          </Typography>

          <PasswordInput
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            onChange={handleInputChange}
            placeholder="confirm password"
          />
        </FormWrapper>

        <Typography mb="1rem" mt="1rem" fontSize="1.2rem">
          By continuing, you agree to Think Loud's Terms of Use and Privacy
          Policy.
        </Typography>
      </DialogContent>

      <DialogActions className={styles.action_signUp}>
        <FormButton
          status={status}
          btnText="Create New Account"
          onClick={handleSignUpFormSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

SignUpDialog.propTypes = {
  openSignUpDialog: PropTypes.bool,
  setOpenSignUpDialog: PropTypes.func,
};

SignUpDialog.defaultProps = {
  openSignUpDialog: false,
  setOpenSignUpDialog: () => {},
};
