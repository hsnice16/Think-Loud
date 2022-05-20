import PropTypes from "prop-types";
import { useReplyText } from "custom-hooks";
import styles from "./ReplyDialog.module.css";
import { Box, Typography } from "@mui/material";

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
  const handleClose = () => {
    setOpenReplyDialog(false);
  };

  const { status, replyText, handleReplyTextChange, handleReplyClick } =
    useReplyText(handleClose);

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
        status={status}
        postText={replyText}
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
