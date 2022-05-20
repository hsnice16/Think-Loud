import { BroadcastBoxData } from "data";
import { getTimeDurationToShow } from "utils";
import { useEffect, useMemo, useState } from "react";
import { useFollow, useProfile, usePosts } from "context";

const { loggedUserBroadcastOptions, getNotLoggedUserBroadcastOptions } =
  BroadcastBoxData;

/**
 * useBroadcastDetails - hook to work with broadcast 
 *                       details
 * 
 * @param {Object} param0 - an object having structure 
 *                { _id, username, createdAt, likedBy }
 * @returns an object having structure {
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
  }
 */
export const useBroadcastDetails = ({ _id, username, createdAt, likedBy }) => {
  const {
    postFollowCall,
    postUnfollowCall,
    follow: { status: followStatus, username: followUsername },
  } = useFollow();

  const { deleteBroadcastCall } = usePosts();

  const {
    profile: { status, data },
  } = useProfile();

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

  const value = {
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
  };

  return value;
};
