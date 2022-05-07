import { TickIcon } from "assets";
import PropTypes from "prop-types";
import { FollowItem } from "components";
import styles from "./LogoutDialog.module.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const LogoutDialog = ({ openLogoutDialog, setOpenLogoutDialog }) => {
  const handleClose = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Dialog
      open={openLogoutDialog}
      onClose={handleClose}
      className={styles.dialogContainer}
    >
      <DialogTitle className={styles.dialogTitle}>
        <FollowItem
          itemComponent="div"
          itemSxStyles={{ paddingBottom: "0" }}
          avatarSxStyles={{
            height: "4.5rem",
            width: "4.5rem",
          }}
          textClassName={styles.followItemText}
        >
          <TickIcon className={styles.tickIcon} />
        </FollowItem>
      </DialogTitle>
      <DialogActions className={styles.dialogAction}>
        <Button
          variant="text"
          onClick={handleClose}
          className={styles.btn_dialogLogOut}
        >
          Log out @hsnice16
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LogoutDialog.propTypes = {
  openLogoutDialog: PropTypes.bool,
  setOpenLogoutDialog: PropTypes.func,
};

LogoutDialog.defaultProps = {
  openLogoutDialog: false,
  setOpenLogoutDialog: () => {},
};
