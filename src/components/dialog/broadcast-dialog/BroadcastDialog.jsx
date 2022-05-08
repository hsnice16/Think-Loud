import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { HimanshuJPG } from "assets";
import styles from "./BroadcastDialog.module.css";
import {
  CircularProgressWithLabel,
  CustomButton,
  DialogActionsCloseIcon,
} from "components";
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

/**
 * maximum characters length in a post
 */
const maxCharacters = 256;

export const BroadcastDialog = ({
  openBroadcastDialog,
  setOpenBroadcastDialog,
}) => {
  const [postText, setPostText] = useState("");

  const handlePostTextChange = (event) => {
    if (maxCharacters - event.target.value.length >= 0)
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
      <DialogActionsCloseIcon handleClose={handleClose} />

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
              imgProps={{
                loading: "lazy",
              }}
            />
          </Box>

          <Box gridColumn="span 11">
            <TextField
              autoFocus
              type="text"
              fullWidth
              multiline
              minRows={4}
              variant="standard"
              placeholder="What are you thinking?"
              value={postText}
              onChange={handlePostTextChange}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className={styles.action_broadcast}>
        {maxCharacters - postText.length > 20 ? (
          <CircularProgress
            size="2rem"
            sx={{ marginRight: "1rem" }}
            variant="determinate"
            value={Math.round((postText.length * 100) / maxCharacters)}
          />
        ) : (
          <CircularProgressWithLabel value={maxCharacters - postText.length} />
        )}

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
