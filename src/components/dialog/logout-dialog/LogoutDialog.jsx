import { TickIcon } from "assets";
import { useUser } from "context";
import PropTypes from "prop-types";
import { ROUTE_LANDING } from "utils";
import { FollowItem } from "components";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutDialog.module.css";
import { useCookieHandler } from "custom-hooks";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const LogoutDialog = ({ openLogoutDialog, setOpenLogoutDialog }) => {
  const navigate = useNavigate();
  const { eraseCookies } = useCookieHandler();
  const { userInitialState, setUserState } = useUser();

  const handleClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogOutClick = () => {
    setUserState(userInitialState);
    eraseCookies();
    navigate(ROUTE_LANDING, { replace: true });
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
          onClick={handleLogOutClick}
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
