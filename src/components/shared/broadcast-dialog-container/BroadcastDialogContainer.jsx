import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import styles from "./BroadcastDialogContainer.module.css";

export const BroadcastDialogContainer = ({
  children,
  openDialog,
  handleClose,
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
  children: PropTypes.node,
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
};

BroadcastDialogContainer.defaultProps = {
  children: <></>,
  openDialog: false,
  handleClose: () => {},
};
