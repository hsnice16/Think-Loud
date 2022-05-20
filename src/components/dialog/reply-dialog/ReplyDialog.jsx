import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ReplyDialog.module.css";
import { Box, Typography } from "@mui/material";
import { BROADCAST_MAX_CHARACTERS } from "utils";

import {
  AvatarGridBox,
  BroadcastBoxHeader,
  BroadcastDialogActions,
  BroadcastDialogContent,
  DialogActionsCloseIcon,
  BroadcastDialogContainer,
} from "components";

// this variables are for design purpose only, they will get removed

const post =
  "Hey 👋 everyone\n\nfinally, I have completed all the basic features of the marvelsQuiz app\n\n🌐Live URL: https://marvelsquiz.vercel.app\n🔗GitHub link: https://github.com/hsnice16/react-marvelsQuiz\n\nfeedbacks are appreciated.";

export const ReplyDialog = ({ openReplyDialog, setOpenReplyDialog }) => {
  const [postText, setPostText] = useState("");

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleClose = () => {
    setOpenReplyDialog(false);
  };

  return (
    <BroadcastDialogContainer
      openDialog={openReplyDialog}
      handleClose={handleClose}
    >
      <DialogActionsCloseIcon handleClose={handleClose} />

      <BroadcastDialogContent
        postText={postText}
        handlePostTextChange={handlePostTextChange}
      >
        <AvatarGridBox className={styles.filledBox}>
          <BroadcastBoxHeader
            h2Text="Himanshu Singh"
            pText="@hsnice16 • Dec 22, 2021"
          />

          <Box component="p" className={styles.broadcast_message}>
            {post}

            <Typography component="span" className={styles.replying_span}>
              Replying
            </Typography>
          </Box>
        </AvatarGridBox>
      </BroadcastDialogContent>

      <BroadcastDialogActions postText={postText} btnText="Reply" />
    </BroadcastDialogContainer>
  );
};

ReplyDialog.propTypes = {
  openReplyDialog: PropTypes.bool,
  setOpenReplyDialog: PropTypes.func,
};

ReplyDialog.defaultProps = {
  openReplyDialog: false,
  setOpenReplyDialog: () => {},
};
