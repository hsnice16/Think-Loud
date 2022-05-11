import PropTypes from "prop-types";
import { HimanshuJPG } from "assets";
import { AvatarGridBox } from "components";
import styles from "./BroadcastDialogContent.module.css";
import { DialogContent, TextField } from "@mui/material";

export const BroadcastDialogContent = ({
  children,
  postText,
  handlePostTextChange,
  minRows,
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
          minRows={minRows}
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
  minRows: PropTypes.number,
};

BroadcastDialogContent.defaultProps = {
  children: <></>,
  postText: "",
  handlePostTextChange: () => {},
  minRows: 4,
};
