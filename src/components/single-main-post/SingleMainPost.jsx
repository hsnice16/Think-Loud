import PropTypes from "prop-types";
import { ROUTE_PROFILE } from "utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EllipsisHorizontalIcon } from "assets";
import { Box, Typography } from "@mui/material";
import styles from "./SingleMainPost.module.css";
import { useBroadcastDetails } from "custom-hooks";

import {
  OptionsMenu,
  ReplyDialog,
  CustomAvatar,
  BroadcastDialog,
  CustomIconButton,
  BroadcastBoxFooter,
} from "components";

export const SingleMainPost = ({ details }) => {
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
  } = details;

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
  } = useBroadcastDetails({
    _id,
    likedBy,
    username,
    createdAt,
  });

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

      <Box className={styles.singleMainPost_container}>
        <Box className={styles.singleMainPost_header}>
          <CustomAvatar
            sxStyles={{
              height: "5.5rem",
              width: "5.5rem",
            }}
            username={username}
            avatarSrc={profilePic}
          />

          <Box className={styles.name}>
            <Typography component={Link} to={`${ROUTE_PROFILE}/${username}`}>
              {fullNameToShow}
            </Typography>
            <Typography component="p">{`@${username} • ${timeDurationToShow}`}</Typography>
          </Box>

          <CustomIconButton
            ariaLabel="menu"
            className={styles.btnMenu_icon}
            handleClick={(event) => {
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
        </Box>

        <Box className={styles.singleMainPost_content}>{content}</Box>

        <BroadcastBoxFooter
          _id={_id}
          comments={comments}
          likeCount={likeCount}
          setOpenReplyDialog={setOpenReplyDialog}
          isLikedByLoggedUser={isLikedByLoggedUser}
          isInLoggedUserBookmarks={isInLoggedUserBookmarks}
          setIsLikedByLoggedUser={setIsLikedByLoggedUser}
          setIsInLoggedUserBookmarks={setIsInLoggedUserBookmarks}
        />
      </Box>
    </>
  );
};

SingleMainPost.propTypes = {
  details: PropTypes.shape({
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

SingleMainPost.defaultProps = {
  details: {
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
