import { TickIcon } from "assets";
import { useUser } from "context";
import PropTypes from "prop-types";
import { ROUTE_LANDING } from "utils";
import { FollowItem } from "components";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutDialog.module.css";
import { useCookieHandler } from "custom-hooks";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const LogoutDialog = ({
  fullName,
  username,
  avatarSrc,
  openLogoutDialog,
  setOpenLogoutDialog,
}) => {
  const navigate = useNavigate();
  const { eraseCookies } = useCookieHandler();
  const { userInitialState, setUserState } = useUser();

  const handleClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogOutClick = () => {
    eraseCookies();
    setUserState(userInitialState);
    navigate(ROUTE_LANDING, { replace: true });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openLogoutDialog}
      className={styles.dialogContainer}
    >
      <DialogTitle className={styles.dialogTitle}>
        <FollowItem
          itemComponent="div"
          fullName={fullName}
          username={username}
          avatarSrc={avatarSrc}
          itemSxStyles={{ paddingBottom: "0" }}
          textClassName={styles.followItemText}
          avatarSxStyles={{ height: "4.5rem", width: "4.5rem" }}
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
          Log out @{username}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LogoutDialog.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  avatarSrc: PropTypes.string,
  openLogoutDialog: PropTypes.bool,
  setOpenLogoutDialog: PropTypes.func,
};

LogoutDialog.defaultProps = {
  fullName: "",
  username: "",
  avatarSrc: "",
  openLogoutDialog: false,
  setOpenLogoutDialog: () => {},
};
