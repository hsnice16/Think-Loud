import styles from "./BroadcastDialog.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

import {
  Avatar,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

import { CloseIcon, HimanshuJPG } from "assets";
import { CustomButton } from "components";

export const BroadcastDialog = ({
  openBroadcastDialog,
  setOpenBroadcastDialog,
}) => {
  const [postText, setPostText] = useState("");

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleClose = () => {
    setOpenBroadcastDialog(false);
  };

  return (
    <Dialog
      open={openBroadcastDialog}
      onClose={handleClose}
      className={styles.dialogContainer}
    >
      <DialogActions className={styles.action_closeIcon}>
        <Button
          onClick={handleClose}
          disableRipple
          variant="text"
          className={styles.btn_closeIcon}
        >
          <CloseIcon className={styles.closeIcon} />
        </Button>
      </DialogActions>
      <DialogContent className={styles.dialog_content}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 1">
            <Avatar
              sx={{
                height: "5rem",
                width: "5rem",
              }}
              alt="Himanshu Avatar"
              src={HimanshuJPG}
            />
          </Box>
          <Box gridColumn="span 11">
            <TextField
              autoFocus
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              placeholder="What are you thinking?"
              value={postText}
              onChange={handlePostTextChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={styles.action_broadcast}>
        <CustomButton
          disabled={postText === ""}
          className={classNames(
            styles.btn_broadcast,
            postText === "" ? styles.btn_disabled : ""
          )}
        >
          Broadcast
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

BroadcastDialog.propTypes = {
  openBroadcastDialog: PropTypes.bool,
  setOpenBroadcastDialog: PropTypes.func,
};

BroadcastDialog.defaultProps = {
  openBroadcastDialog: false,
  setOpenBroadcastDialog: () => {},
};
