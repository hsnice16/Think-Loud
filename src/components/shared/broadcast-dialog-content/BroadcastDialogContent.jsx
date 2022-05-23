import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AvatarGridBox } from "components";
import styles from "./BroadcastDialogContent.module.css";
import { DialogContent, TextField } from "@mui/material";

export const BroadcastDialogContent = ({
  minRows,
  children,
  postText,
  handlePostTextChange,
}) => {
  const {
    profile: { data },
  } = useSelector((state) => state.user);

  return (
    <DialogContent className={styles.dialog_content}>
      {children}

      <AvatarGridBox avatarSrc={data?.profilePic} username={data?.username}>
        <TextField
          autoFocus
          fullWidth
          multiline
          type="text"
          value={postText}
          minRows={minRows}
          variant="standard"
          onChange={handlePostTextChange}
          placeholder="What are you thinking?"
        />
      </AvatarGridBox>
    </DialogContent>
  );
};

BroadcastDialogContent.propTypes = {
  children: PropTypes.node,
  minRows: PropTypes.number,
  postText: PropTypes.string,
  handlePostTextChange: PropTypes.func,
};

BroadcastDialogContent.defaultProps = {
  minRows: 4,
  postText: "",
  children: <></>,
  handlePostTextChange: () => {},
};
