import PropTypes from "prop-types";
import styles from "./SignUpDialog.module.css";
import {
  DialogActionsCloseIcon,
  FormButton,
  FormHeading,
  FormWrapper,
  PasswordInput,
} from "components";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

export const SignUpDialog = ({ openSignUpDialog, setOpenSignUpDialog }) => {
  const handleClose = () => {
    setOpenSignUpDialog(false);
  };

  return (
    <Dialog open={openSignUpDialog} className={styles.dialogContainer}>
      <DialogActionsCloseIcon handleClose={handleClose} />

      <DialogContent className={styles.dialogContent}>
        <FormHeading headingText="Sign Up" />

        <FormWrapper>
          <Box className={styles.textInput_container}>
            <TextField
              autoFocus
              label="First Name"
              type="text"
              placeholder="Think"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Last Name"
              type="text"
              placeholder="Loud"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
            label="Email Address"
            type="email"
            placeholder="think.loud@example.com"
            InputLabelProps={{ shrink: true }}
          />

          <PasswordInput label="Password" placeholder="password" />
          <Typography mb="1rem" fontSize="1.2rem">
            Should be Alpha Numeric and should have minimum length 6.
          </Typography>

          <PasswordInput
            label="Confirm Password"
            placeholder="confirm password"
          />
        </FormWrapper>

        <Typography mb="1rem" mt="1rem" fontSize="1.2rem">
          By continuing, you agree to Think Loud's Terms of Use and Privacy
          Policy.
        </Typography>
      </DialogContent>

      <DialogActions className={styles.action_signUp}>
        <FormButton btnText="Create New Account" />
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
