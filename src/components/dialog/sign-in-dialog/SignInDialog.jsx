import PropTypes from "prop-types";
import { SignInDialogData } from "data";
import styles from "./SignInDialog.module.css";
import {
  DialogActionsCloseIcon,
  FormButton,
  FormHeading,
  FormWrapper,
  PasswordInput,
} from "components";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  TextField,
} from "@mui/material";

const { buttonData } = SignInDialogData;

export const SignInDialog = ({ openSignInDialog, setOpenSignInDialog }) => {
  const handleClose = () => {
    setOpenSignInDialog(false);
  };

  return (
    <Dialog open={openSignInDialog} className={styles.dialogContainer}>
      <DialogActionsCloseIcon handleClose={handleClose} />

      <DialogContent className={styles.dialogContent}>
        <FormHeading headingText="Log In" />

        <FormWrapper>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            placeholder="think.loud@example.com"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <PasswordInput label="Password" placeholder="password" />

          <FormControlLabel
            value="remember-me"
            control={<Checkbox disableRipple />}
            label="Remember me"
            aria-label="remember me"
            labelPlacement="end"
          />
        </FormWrapper>
      </DialogContent>

      <DialogActions className={styles.action_logIn}>
        {buttonData.map(({ _id, btnText, sxStyles }) => (
          <FormButton key={_id} sxStyles={sxStyles} btnText={btnText} />
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
