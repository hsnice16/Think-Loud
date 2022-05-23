import { ProfileData } from "data";
import classNames from "classnames";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFollow, useProfile } from "context";
import { FilledAccountCircleIcon, LinkIcon } from "assets";
import { sharedReducer, ACTION_TYPE_SUCCESS } from "reducer";
import { useEffect, useMemo, useReducer, useState } from "react";
import { isStatusLoading, API_TO_GET_USER_PROFILE } from "utils";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  NotFound,
  PageHeading,
  EmptyBookmark,
  ListBroadcasts,
  LoadingSpinner,
  EditProfileDialog,
  LoadingCircularProgress,
} from "components";

import {
  Box,
  Tab,
  Link,
  Tabs,
  Avatar,
  Button,
  Typography,
} from "@mui/material";

const { tabsOptions, getEmptyTabDataToShow } = ProfileData;

export const Profile = () => {
  const { username } = useParams();
  const { profile: loggedUserData } = useProfile();

  const {
    postFollowCall,
    postUnfollowCall,
    follow: {
      data: followData,
      status: followStatus,
      username: followUsername,
    },
  } = useFollow();

  const { userUsername } = useSelector((state) => state.user);
  const { data: postsData } = useSelector((state) => state.posts);

  const isProfileOfLoggedUser = username === userUsername;
  const { api, propertyToGet } = API_TO_GET_USER_PROFILE;
  const { callAPI } = useAsync();

  const [profile, dispatch] = useReducer(sharedReducer, loggedUserData);
  const { status, data } = profile;

  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Broadcasts");

  useDocumentTitle(
    status === "success"
      ? `${data.firstName} ${data.lastName} (@${data.username})`
      : "Profile"
  );
  useScrollToTop();

  useEffect(() => {
    if (username !== userUsername) {
      callAPI(`${api}/${username}`, propertyToGet, dispatch);
      setSelectedTab("Broadcasts");
    } else if (
      isProfileOfLoggedUser &&
      (data === null || data.username !== userUsername)
    ) {
      callAPI(`${api}/${username}`, propertyToGet, dispatch);
      setSelectedTab("Broadcasts");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, propertyToGet, userUsername, username]);

  useEffect(() => {
    if (followStatus === "success") {
      if (isProfileOfLoggedUser) {
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: followData.user });
      } else if (
        !isProfileOfLoggedUser &&
        followData.followUser.username === data.username
      ) {
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: followData.followUser });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followStatus]);

  const isLoggedUserFollowing = useMemo(
    () =>
      status === "success"
        ? loggedUserData.data?.following.some(
            (currUser) => currUser.username === data?.username
          )
        : false,
    [data?.username, loggedUserData.data?.following, status]
  );

  const dataToShow = useMemo(() => {
    let tempDataToShow = [];

    if (data !== null && postsData !== null) {
      tempDataToShow =
        selectedTab === "Broadcasts"
          ? [...postsData]
              .reverse()
              .filter((post) => post.username === data.username)
          : tempDataToShow;

      tempDataToShow =
        selectedTab === "Likes"
          ? [...postsData]
              .reverse()
              .filter((post) =>
                post.likes.likedBy.some(
                  (user) => user.username === data.username
                )
              )
          : tempDataToShow;

      tempDataToShow =
        selectedTab === "Replies"
          ? [...postsData]
              .reverse()
              .filter((post) =>
                post.comments.some((user) => user.username === data.username)
              )
          : tempDataToShow;
    }

    return tempDataToShow;
  }, [data, postsData, selectedTab]);

  const {
    imgSrc: emptyImgSrc = "",
    imgAlt: emptyImgAlt = "",
    h1Text: emptyH1Text = "",
    h2Text: emptyH2Text = "",
  } = useMemo(
    () =>
      dataToShow.length === 0
        ? getEmptyTabDataToShow(isProfileOfLoggedUser, selectedTab)
        : {},
    [dataToShow.length, isProfileOfLoggedUser, selectedTab]
  );

  const btnStyleToShow = isProfileOfLoggedUser
    ? styles.btn_editProfile
    : isLoggedUserFollowing
    ? styles.btn_unfollow
    : styles.btn_follow;

  const btnVariantToShow =
    isProfileOfLoggedUser || isLoggedUserFollowing ? "outlined" : "contained";

  const btnTextToShow = isProfileOfLoggedUser
    ? "Edit Profile"
    : isLoggedUserFollowing
    ? "Unfollow"
    : "Follow";

  const onClickHandler = isProfileOfLoggedUser
    ? () => setOpenEditProfileDialog(true)
    : isLoggedUserFollowing
    ? () => postUnfollowCall(data.username)
    : () => postFollowCall(data.username);

  return status === "error" ? (
    <NotFound
      documentTitle="Profile Not Found"
      h1Text="This profile isn't available anymore"
    />
  ) : (
    <Box className={styles.profile_container}>
      {openEditProfileDialog && (
        <EditProfileDialog
          profileData={data}
          profileDispatch={dispatch}
          openEditProfileDialog={openEditProfileDialog}
          setOpenEditProfileDialog={setOpenEditProfileDialog}
        />
      )}

      {status === "loading" && <LoadingCircularProgress />}

      {status === "success" && (
        <>
          <PageHeading>
            <Box>
              <Typography component="h1" fontWeight="bold" variant="h4">
                {`${data.firstName} ${data.lastName}`}
              </Typography>
              <Typography component="p" fontSize="1.2rem">
                {dataToShow.length} Broadcasts
              </Typography>
            </Box>
          </PageHeading>

          <Box position="relative">
            <Box className={styles.background_img}>
              {data?.bgPic && (
                <Avatar
                  src={data.bgPic}
                  variant="square"
                  alt={`${data.username} avatar`}
                  sx={{ height: "100%", width: "100%" }}
                />
              )}
            </Box>
            <Box ml={2} className={styles.profile_pic}>
              {data?.profilePic ? (
                <Avatar
                  src={data.profilePic}
                  alt={`${data.username} avatar`}
                  sx={{ height: "100%", width: "100%" }}
                />
              ) : (
                <FilledAccountCircleIcon
                  className={styles.accountCircle_icon}
                />
              )}
            </Box>
          </Box>

          <Button
            onClick={onClickHandler}
            variant={btnVariantToShow}
            disabled={
              isStatusLoading(followStatus) && followUsername === data.username
            }
            className={classNames(
              styles.btn,
              btnStyleToShow,
              isStatusLoading(followStatus) && followUsername === data.username
                ? styles.btn_disabled
                : ""
            )}
          >
            {isStatusLoading(followStatus) &&
              followUsername === data.username && (
                <LoadingSpinner followSpinner />
              )}
            {btnTextToShow}
          </Button>

          <Box mt={2} pl={2} className={styles.border_bottom}>
            <Typography component="h3" fontWeight="bold" variant="h4">
              {`${data.firstName} ${data.lastName}`}
            </Typography>
            <Typography component="h4" variant="h5">
              @{data.username}
            </Typography>

            <Typography
              mt={2}
              pr={2}
              mb="1rem"
              component="p"
              fontSize="1.5rem"
              whiteSpace="pre-line"
            >
              {data?.bio ?? ""}
            </Typography>

            {(data?.websiteURL ?? "").length > 0 && (
              <Box mb="1rem" className={styles.url_container}>
                <LinkIcon />
                <Link
                  rel="noopener"
                  target="_blank"
                  underline="hover"
                  href={data.websiteURL}
                >
                  {data.websiteURL.slice(8)}
                </Link>
              </Box>
            )}

            <Box className={styles.url_container}>
              <Typography fontSize="1.5rem">
                <Box component="strong">{data.following.length} </Box>
                Following
              </Typography>
              <Typography fontSize="1.5rem" ml="1rem">
                <Box component="strong">{data.followers.length} </Box>
                Followers
              </Typography>
            </Box>

            <Tabs
              value={selectedTab}
              className={styles.tabs}
              aria-label="broadcasts likes replies tabs"
              onChange={(_, newValue) => setSelectedTab(newValue)}
            >
              {tabsOptions.map(({ _id, value }) => (
                <Tab key={_id} disableRipple label={value} value={value} />
              ))}
            </Tabs>
          </Box>

          {dataToShow.length === 0 ? (
            <EmptyBookmark
              h1Text={emptyH1Text}
              h2Text={emptyH2Text}
              imgAlt={emptyImgAlt}
              imgSrc={emptyImgSrc}
            />
          ) : (
            <ListBroadcasts broadcastsToShow={dataToShow} />
          )}
        </>
      )}
    </Box>
  );
};
