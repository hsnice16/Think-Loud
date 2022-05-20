import PropTypes from "prop-types";
import { Box } from "@mui/material";
import classNames from "classnames";
import { BroadcastBoxData } from "data";
import { Link } from "react-router-dom";
import styles from "./BroadcastBox.module.css";
import { useEffect, useMemo, useState } from "react";
import { getTimeDurationToShow, ROUTE_PROFILE } from "utils";
import { useBookmarks, useFollow, usePosts, useProfile } from "context";

import {
  OptionsMenu,
  ReplyDialog,
  AvatarGridBox,
  BroadcastDialog,
  CustomIconButton,
  BroadcastBoxHeader,
} from "components";

import {
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

  const { postLikeCall, postDisLikeCall, deleteBroadcastCall } = usePosts();
  const { postAddBookmarkCall, postRemoveBookmarkCall } = useBookmarks();

  const {
    profile: { status, data },
  } = useProfile();

  const {
    postFollowCall,
    postUnfollowCall,
    follow: { status: followStatus, username: followUsername },
  } = useFollow();

  const [isInLoggedUserBookmarks, setIsInLoggedUserBookmarks] = useState(false);
  const [isInLoggedUserFollowing, setIsInLoggedUserFollowing] = useState(false);
  const [openBroadcastDialog, setOpenBroadcastDialog] = useState(false);
  const [isLikedByLoggedUser, setIsLikedByLoggedUser] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [timeDurationToShow, setTimeDurationToShow] = useState(
    getTimeDurationToShow(createdAt)
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeDurationToShow(getTimeDurationToShow(createdAt)),
      3000
    );

    return () => clearInterval(intervalId);
  }, [createdAt]);

  useEffect(() => {
    if (status === "success") {
      setIsInLoggedUserFollowing(
        data?.following.some((user) => user.username === username)
      );

      setIsInLoggedUserBookmarks(
        data?.bookmarks.some((bookmark) => bookmark._id === _id)
      );

      setIsLikedByLoggedUser(
        likedBy.some((user) => user.username === data?.username)
      );
    }
  }, [
    _id,
    status,
    likedBy,
    username,
    data?.username,
    data?.bookmarks,
    data?.following,
  ]);

  useEffect(() => {
    if (followStatus === "loading" && followUsername === username) {
      setAnchorEl(null);
      setIsInLoggedUserFollowing((prevState) => !prevState);
    }
  }, [followStatus, followUsername, username]);

  const optionsToShow = useMemo(
    () =>
      status === "success" && data?.username === username
        ? loggedUserBroadcastOptions.map((option) => ({
            ...option,
            handleClick:
              option.color === "error"
                ? () => {
                    setAnchorEl(null);
                    deleteBroadcastCall(_id);
                  }
                : () => {
                    setAnchorEl(null);
                    setOpenBroadcastDialog(true);
                  },
          }))
        : getNotLoggedUserBroadcastOptions(
            username,
            isInLoggedUserFollowing
          ).map((option) => ({
            ...option,
            handleClick: isInLoggedUserFollowing
              ? () => postUnfollowCall(username)
              : () => postFollowCall(username),
          })),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.username, isInLoggedUserFollowing, status, username]
  );

  return (
    <>
      <ReplyDialog
        openReplyDialog={openReplyDialog}
        setOpenReplyDialog={setOpenReplyDialog}
      />

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
      >
        <Box className={styles.container}>
          <BroadcastBoxHeader
            className={styles.header}
            h2Text={`${firstName} ${lastName}`}
            linkProps={{
              component: Link,
              to: `${ROUTE_PROFILE}/${username}`,
            }}
            pText={`@${username} • ${timeDurationToShow}`}
          >
            <CustomIconButton
              ariaLabel="menu"
              className={styles.btnMenu_icon}
              handleClick={(event) => setAnchorEl(event.currentTarget)}
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

          <Box className={styles.footer_actions}>
            <Box>
              <CustomIconButton
                ariaLabel="like"
                handleClick={
                  isLikedByLoggedUser
                    ? () => {
                        setIsLikedByLoggedUser(false);
                        postDisLikeCall(_id);
                      }
                    : () => {
                        setIsLikedByLoggedUser(true);
                        postLikeCall(_id);
                      }
                }
                className={classNames(
                  styles.btnAction_icon,
                  isLikedByLoggedUser > 0 ? styles.likedIcon : ""
                )}
              >
                {isLikedByLoggedUser > 0 ? (
                  <FilledHeartIcon />
                ) : (
                  <OutlinedHeartIcon />
                )}
              </CustomIconButton>
              {likeCount > 0 && likeCount}
            </Box>

            <Box>
              <CustomIconButton
                ariaLabel="reply"
                className={styles.btnAction_icon}
                handleClick={() => setOpenReplyDialog(true)}
              >
                <CommentIcon />
              </CustomIconButton>
              {comments.length > 0 && comments.length}
            </Box>

            <Box>
              <CustomIconButton
                ariaLabel="bookmark"
                className={styles.btnAction_icon}
                handleClick={
                  isInLoggedUserBookmarks
                    ? () => {
                        setIsInLoggedUserBookmarks(false);
                        postRemoveBookmarkCall(_id);
                      }
                    : () => {
                        setIsInLoggedUserBookmarks(true);
                        postAddBookmarkCall(_id);
                      }
                }
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
