import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "./ReplyDialog.module.css";
import { Box, Typography } from "@mui/material";
import { BROADCAST_MAX_CHARACTERS } from "utils";
import { usePostNewCommentCallMutation } from "redux/api/postsAPI";

import {
  AvatarGridBox,
  BroadcastBoxHeader,
  BroadcastDialogActions,
  BroadcastDialogContent,
  DialogActionsCloseIcon,
  BroadcastDialogContainer,
} from "components";

export const ReplyDialog = ({
  postId,
  postUsername,
  openReplyDialog,
  postContentText,
  postUserFullname,
  postUserProfilePic,
  setOpenReplyDialog,
  postTimeDurationToShow,
}) => {
  const [replyText, setReplyText] = useState("");
  const [postNewCommentCall] = usePostNewCommentCallMutation();
  const { newCommentStatus } = useSelector((state) => state.posts);

  const handleClose = () => {
    setOpenReplyDialog(false);
  };

  const handleReplyClick = async (_id) => {
    if (replyText !== "") {
      await postNewCommentCall({
        postId: _id,
        commentData: { text: replyText },
      });
      setReplyText("");
      handleClose();
    }
  };

  const handleReplyTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setReplyText(event.target.value);
  };

  return (
    <BroadcastDialogContainer
      handleClose={handleClose}
      openDialog={openReplyDialog}
    >
      <DialogActionsCloseIcon handleClose={handleClose} />

      <BroadcastDialogContent
        postText={replyText}
        handlePostTextChange={handleReplyTextChange}
      >
        <AvatarGridBox
          username={postUsername}
          className={styles.filledBox}
          avatarSrc={postUserProfilePic}
        >
          <BroadcastBoxHeader
            h2Text={postUserFullname}
            pText={`@${postUsername} • ${postTimeDurationToShow} `}
          />

          <Box component="p" className={styles.broadcast_message}>
            {postContentText}

            <Typography component="span" className={styles.replying_span}>
              Replying
            </Typography>
          </Box>
        </AvatarGridBox>
      </BroadcastDialogContent>

      <BroadcastDialogActions
        btnText="Reply"
        postText={replyText}
        status={newCommentStatus}
        onClick={() => handleReplyClick(postId)}
      />
    </BroadcastDialogContainer>
  );
};

ReplyDialog.propTypes = {
  postId: PropTypes.string,
  postUsername: PropTypes.string,
  openReplyDialog: PropTypes.bool,
  postContentText: PropTypes.string,
  postUserFullname: PropTypes.string,
  setOpenReplyDialog: PropTypes.func,
  postUserProfilePic: PropTypes.string,
  postTimeDurationToShow: PropTypes.string,
};

ReplyDialog.defaultProps = {
  postId: "",
  postUsername: "",
  postContentText: "",
  postUserFullname: "",
  openReplyDialog: false,
  postUserProfilePic: "",
  postTimeDurationToShow: "",
  setOpenReplyDialog: () => {},
};
