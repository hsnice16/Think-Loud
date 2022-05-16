import PropTypes from "prop-types";
import { Box } from "@mui/material";
import classNames from "classnames";
import { BroadcastBoxData } from "data";
import { useEffect, useState } from "react";
import { getTimeDurationToShow } from "utils";
import styles from "./BroadcastBox.module.css";
import { useBookmarks, useFollow, usePosts, useProfile } from "context";

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
    _id,
    content,
    comments,
    username,
    lastName,
    firstName,
    createdAt,
    likes: { likeCount, likedBy },
  } = broadcastDetails;

  const { postLikeCall, postDisLikeCall } = usePosts();
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

  const optionsToShow =
    status === "success" && data?.username === username
      ? loggedUserBroadcastOptions
      : getNotLoggedUserBroadcastOptions(username, isInLoggedUserFollowing).map(
          (option) => ({
            ...option,
            handleClick: isInLoggedUserFollowing
              ? () => postUnfollowCall(username)
              : () => postFollowCall(username),
          })
        );

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
              handleClick={(event) => setAnchorEl(event.currentTarget)}
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
                handleClick={() => setOpenReplyDialog(true)}
                className={styles.btnAction_icon}
              >
                <CommentIcon />
              </CustomIconButton>
              {comments.length > 0 && comments.length}
            </Box>

            <Box>
              <CustomIconButton
                ariaLabel="bookmark"
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
    _id: PropTypes.string,
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
    _id: "",
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
