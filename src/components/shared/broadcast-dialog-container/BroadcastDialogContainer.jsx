import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import styles from "./BroadcastDialogContainer.module.css";

export const BroadcastDialogContainer = ({
  openDialog,
  handleClose,
  children,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      className={styles.dialogContainer}
    >
      {children}
    </Dialog>
  );
};

BroadcastDialogContainer.propTypes = {
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
};

BroadcastDialogContainer.defaultProps = {
  openDialog: false,
  handleClose: () => {},
  children: <></>,
};
