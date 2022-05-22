import { CloseIcon } from "assets";
import PropTypes from "prop-types";
import { Button, DialogActions } from "@mui/material";
import styles from "./DialogActionsCloseIcon.module.css";

export const DialogActionsCloseIcon = ({ handleClose }) => {
  return (
    <DialogActions className={styles.action_closeIcon}>
      <Button
        variant="text"
        onClick={handleClose}
        className={styles.btn_closeIcon}
      >
        <CloseIcon className={styles.closeIcon} />
      </Button>
    </DialogActions>
  );
};

DialogActionsCloseIcon.propTypes = {
  handleClose: PropTypes.func,
};

DialogActionsCloseIcon.defaultProps = {
  handleClose: () => {},
};
