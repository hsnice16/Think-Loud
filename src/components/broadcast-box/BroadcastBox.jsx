import PropTypes from "prop-types";
import { Box } from "@mui/material";
import classNames from "classnames";
import { BroadcastBoxData } from "data";
import { useEffect, useState } from "react";
import { getTimeDurationToShow } from "utils";
import styles from "./BroadcastBox.module.css";
import { useFollow, useProfile } from "context";

import {
  OptionsMenu,
  ReplyDialog,
  AvatarGridBox,
  CustomIconButton,
  BroadcastBoxHeader,
} from "components";

import {
  HimanshuJPG,
  CommentIcon,
  FilledHeartIcon,
  OutlinedHeartIcon,
  FilledBookmarkIcon,
  OutlinedBookmarkIcon,
  EllipsisHorizontalIcon,
} from "assets";

const { loggedUserBroadcastOptions, getNotLoggedUserBroadcastOptions } =
  BroadcastBoxData;

export const BroadcastBox = ({ broadcastDetails }) => {
  const {
    content,
    comments,
    username,
    lastName,
    firstName,
    updatedAt,
    likes: { likeCount },
  } = broadcastDetails;

  const {
    profile: { status, data },
  } = useProfile();
  const {
    postFollowCall,
    postUnfollowCall,
    follow: { status: followStatus, username: followUsername },
  } = useFollow();

  const isInLoggedUserBookmarks =
    status === "success"
      ? data?.bookmarks.some((bookmark) => bookmark.username === username)
      : false;

  const [isInLoggedUserFollowing, setIsInLoggedUserFollowing] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [timeDurationToShow, setTimeDurationToShow] = useState(
    getTimeDurationToShow(updatedAt)
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeDurationToShow(getTimeDurationToShow(updatedAt)),
      3000
    );

    return () => clearInterval(intervalId);
  }, [updatedAt]);

  useEffect(() => {
    if (status === "success") {
      setIsInLoggedUserFollowing(
        data?.following.some((user) => user.username === username)
      );
    }
  }, [data?.following, status, username]);

  useEffect(() => {
    if (followStatus === "loading" && followUsername === username) {
      setAnchorEl(null);
      setIsInLoggedUserFollowing((prevState) => !prevState);
    }
  }, [followStatus, followUsername, username]);

  const handleFollowClick = () => {
    postFollowCall(username);
  };

  const handleUnfollowClick = () => {
    postUnfollowCall(username);
  };

  const optionsToShow =
    status === "success" && data?.username === username
      ? loggedUserBroadcastOptions
      : getNotLoggedUserBroadcastOptions(username, isInLoggedUserFollowing).map(
          (option) => ({
            ...option,
            handleClick: isInLoggedUserFollowing
              ? handleUnfollowClick
              : handleFollowClick,
          })
        );

  const handleMenuIconButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplyClick = () => {
    setOpenReplyDialog(true);
  };

  return (
    <>
      <ReplyDialog
        openReplyDialog={openReplyDialog}
        setOpenReplyDialog={setOpenReplyDialog}
      />

      <AvatarGridBox
        imgSrc={HimanshuJPG}
        imgAlt="Himanshu Avatar"
        className={styles.avatarBox}
      >
        <Box className={styles.container}>
          <BroadcastBoxHeader
            className={styles.header}
            h2Text={`${firstName} ${lastName}`}
            pText={`@${username} • ${timeDurationToShow}`}
          >
            <CustomIconButton
              ariaLabel="menu"
              className={styles.btnMenu_icon}
              handleClick={handleMenuIconButtonClick}
            >
              <EllipsisHorizontalIcon />
            </CustomIconButton>

            <OptionsMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              menuItems={optionsToShow}
            />
          </BroadcastBoxHeader>

          <Box component="p" className={styles.broadcast_message}>
            {content}
          </Box>

          <Box className={styles.footer_actions}>
            <Box>
              <CustomIconButton
                ariaLabel="like"
                handleClick={() => {}}
                className={classNames(
                  styles.btnAction_icon,
                  likeCount > 0 ? styles.likedIcon : ""
                )}
              >
                {likeCount > 0 ? <FilledHeartIcon /> : <OutlinedHeartIcon />}
              </CustomIconButton>
              {likeCount > 0 && likeCount}
            </Box>

            <Box>
              <CustomIconButton
                ariaLabel="reply"
                handleClick={handleReplyClick}
                className={styles.btnAction_icon}
              >
                <CommentIcon />
              </CustomIconButton>
              {comments.length > 0 && comments.length}
            </Box>

            <Box>
              <CustomIconButton
                ariaLabel="bookmark"
                handleClick={() => {}}
                className={styles.btnAction_icon}
              >
                {isInLoggedUserBookmarks ? (
                  <FilledBookmarkIcon />
                ) : (
                  <OutlinedBookmarkIcon />
                )}
              </CustomIconButton>
            </Box>
          </Box>
        </Box>
      </AvatarGridBox>
    </>
  );
};

BroadcastBox.propTypes = {
  broadcastDetails: PropTypes.shape({
    comments: PropTypes.array,
    content: PropTypes.string,
    username: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    likes: PropTypes.shape({
      likedBy: PropTypes.array,
      likeCount: PropTypes.number,
      dislikedBy: PropTypes.array,
    }),
  }),
};

BroadcastBox.defaultProps = {
  broadcastDetails: {
    content: "",
    comments: [],
    username: "",
    lastName: "",
    firstName: "",
    createdAt: "",
    updatedAt: "",
    likes: {
      likedBy: [],
      likeCount: 0,
      dislikedBy: [],
    },
  },
};
