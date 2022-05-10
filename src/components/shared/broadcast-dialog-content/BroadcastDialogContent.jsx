import PropTypes from "prop-types";
import { HimanshuJPG } from "assets";
import { AvatarGridBox } from "components";
import styles from "./BroadcastDialogContent.module.css";
import { DialogContent, TextField } from "@mui/material";

export const BroadcastDialogContent = ({
  children,
  postText,
  handlePostTextChange,
}) => {
  return (
    <DialogContent className={styles.dialog_content}>
      {children}

      <AvatarGridBox imgSrc={HimanshuJPG} imgAlt="Himanshu Avatar">
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
      </AvatarGridBox>
    </DialogContent>
  );
};

BroadcastDialogContent.propTypes = {
  children: PropTypes.node,
  postText: PropTypes.string,
  handlePostTextChange: PropTypes.func,
};

BroadcastDialogContent.defaultProps = {
  children: <></>,
  postText: "",
  handlePostTextChange: () => {},
};
