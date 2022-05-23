import { TickIcon } from "assets";
import PropTypes from "prop-types";
import { ROUTE_LANDING } from "utils";
import { FollowItem } from "components";
import { useDispatch } from "react-redux";
import { authCookieHandler } from "utils";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutDialog.module.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { setUserState, initialState } from "redux/features/user/userSlice";

const { eraseCookies } = authCookieHandler();

export const LogoutDialog = ({
  fullName,
  username,
  avatarSrc,
  openLogoutDialog,
  setOpenLogoutDialog,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogOutClick = () => {
    eraseCookies();
    dispatch(setUserState(initialState));
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
