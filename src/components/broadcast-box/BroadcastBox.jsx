import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./BroadcastBox.module.css";
import { EllipsisHorizontalIcon } from "assets";
import { useBroadcastDetails } from "custom-hooks";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PROFILE, ROUTE_READ_POST } from "utils";

import {
  OptionsMenu,
  ReplyDialog,
  AvatarGridBox,
  BroadcastDialog,
  CustomIconButton,
  BroadcastBoxFooter,
  BroadcastBoxHeader,
} from "components";

export const BroadcastBox = ({ broadcastDetails }) => {
  const {
    _id,
    content,
    comments,
    username,
    lastName,
    firstName,
    createdAt,
    profilePic,
    likes: { likeCount, likedBy },
  } = broadcastDetails;

  const navigate = useNavigate();

  const {
    profile: { status, data },
  } = useSelector((state) => state.user);

  const fullNameToShow =
    status === "success" && data.username === username
      ? `${data.firstName} ${data.lastName}`
      : `${firstName} ${lastName}`;

  const {
    anchorEl,
    setAnchorEl,
    optionsToShow,
    openReplyDialog,
    setOpenReplyDialog,
    timeDurationToShow,
    isLikedByLoggedUser,
    openBroadcastDialog,
    setIsLikedByLoggedUser,
    setOpenBroadcastDialog,
    isInLoggedUserBookmarks,
    setIsInLoggedUserBookmarks,
  } = useBroadcastDetails({ _id, username, createdAt, likedBy });

  return (
    <>
      {openReplyDialog && (
        <ReplyDialog
          postId={_id}
          postUsername={username}
          postContentText={content}
          postUserProfilePic={profilePic}
          openReplyDialog={openReplyDialog}
          postUserFullname={fullNameToShow}
          setOpenReplyDialog={setOpenReplyDialog}
          postTimeDurationToShow={timeDurationToShow}
        />
      )}

      {openBroadcastDialog && (
        <BroadcastDialog
          postId={_id}
          postContentText={content}
          openBroadcastDialog={openBroadcastDialog}
          setOpenBroadcastDialog={setOpenBroadcastDialog}
        />
      )}

      <AvatarGridBox
        username={username}
        avatarSrc={profilePic}
        className={styles.avatarBox}
        handleClick={() => {
          navigate(`${ROUTE_READ_POST}/${_id}`);
        }}
      >
        <Box className={styles.container}>
          <BroadcastBoxHeader
            h2Text={fullNameToShow}
            className={styles.header}
            linkProps={{
              component: Link,
              to: `${ROUTE_PROFILE}/${username}`,
              onClick: (event) => event.stopPropagation(),
            }}
            pText={`@${username} • ${timeDurationToShow}`}
          >
            <CustomIconButton
              ariaLabel="menu"
              className={styles.btnMenu_icon}
              handleClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              }}
            >
              <EllipsisHorizontalIcon />
            </CustomIconButton>

            <OptionsMenu
              anchorEl={anchorEl}
              menuItems={optionsToShow}
              setAnchorEl={setAnchorEl}
            />
          </BroadcastBoxHeader>

          <Box component="p" className={styles.broadcast_message}>
            {content}
          </Box>

          <BroadcastBoxFooter
            _id={_id}
            comments={comments}
            likeCount={likeCount}
            setOpenReplyDialog={setOpenReplyDialog}
            isLikedByLoggedUser={isLikedByLoggedUser}
            setIsLikedByLoggedUser={setIsLikedByLoggedUser}
            isInLoggedUserBookmarks={isInLoggedUserBookmarks}
            setIsInLoggedUserBookmarks={setIsInLoggedUserBookmarks}
          />
        </Box>
      </AvatarGridBox>
    </>
  );
};

BroadcastBox.propTypes = {
  broadcastDetails: PropTypes.shape({
    _id: PropTypes.string,
    comments: PropTypes.array,
    content: PropTypes.string,
    username: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    profilePic: PropTypes.string,
    likes: PropTypes.shape({
      likedBy: PropTypes.array,
      likeCount: PropTypes.number,
      dislikedBy: PropTypes.array,
    }),
  }),
};

BroadcastBox.defaultProps = {
  broadcastDetails: {
    _id: "",
    content: "",
    comments: [],
    username: "",
    lastName: "",
    firstName: "",
    createdAt: "",
    updatedAt: "",
    profilePic: "",
    likes: {
      likedBy: [],
      likeCount: 0,
      dislikedBy: [],
    },
  },
};
