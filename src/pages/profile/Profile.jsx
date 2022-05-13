import { ProfileData } from "data";
import classNames from "classnames";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { useFollow, useProfile, useUser } from "context";
import { sharedReducer, ACTION_TYPE_SUCCESS } from "reducer";
import { isStatusLoading, API_TO_GET_USER_PROFILE } from "utils";
import { Button, Box, Link, Tab, Tabs, Typography } from "@mui/material";
import { FilledAccountCircleIcon, LinkIcon, noBroadcasts } from "assets";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  PageHeading,
  EmptyBookmark,
  ListBroadcasts,
  LoadingSpinner,
  EditProfileDialog,
  LoadingCircularProgress,
} from "components";

const { tabsOptions } = ProfileData;

export const Profile = () => {
  const { username } = useParams();
  const { profile: loggedUserData, dispatch: profileContextDispatch } =
    useProfile();

  const {
    follow: { status: followStatus, data: followData },
    postFollowCall,
    postUnfollowCall,
  } = useFollow();
  const {
    userState: { userUsername },
  } = useUser();

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
    } else if (
      isProfileOfLoggedUser &&
      (data === null || data.username !== userUsername)
    ) {
      callAPI(`${api}/${username}`, propertyToGet, dispatch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, propertyToGet, userUsername, username]);

  useEffect(() => {
    if (followStatus === "success") {
      profileContextDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: followData.user,
      });

      if (isProfileOfLoggedUser) {
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: followData.user });
      } else if (!isProfileOfLoggedUser) {
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: followData.followUser });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followStatus]);

  const isLoggedUserFollowing =
    status === "success"
      ? loggedUserData.data.following.some(
          (currUser) => currUser.username === data.username
        )
      : false;

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

  const handleFollowClick = () => {
    postFollowCall(data.username);
  };

  const handleUnfollowClick = () => {
    postUnfollowCall(data.username);
  };

  const onClickHandler = isProfileOfLoggedUser
    ? () => setOpenEditProfileDialog(true)
    : isLoggedUserFollowing
    ? handleUnfollowClick
    : handleFollowClick;

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
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
                0 Broadcasts
              </Typography>
            </Box>
          </PageHeading>

          <Box position="relative">
            <Box className={styles.background_img}></Box>
            <Box ml={2} className={styles.profile_pic}>
              <FilledAccountCircleIcon className={styles.accountCircle_icon} />
            </Box>
          </Box>

          <Button
            onClick={onClickHandler}
            variant={btnVariantToShow}
            disabled={isStatusLoading(followStatus) && !isProfileOfLoggedUser}
            className={classNames(
              styles.btn,
              btnStyleToShow,
              isStatusLoading(followStatus) && !isProfileOfLoggedUser
                ? styles.btn_disabled
                : ""
            )}
          >
            {isStatusLoading(followStatus) && !isProfileOfLoggedUser && (
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
              onChange={handleTabChange}
              aria-label="broadcasts likes replies tabs"
            >
              {tabsOptions.map(({ _id, value }) => (
                <Tab key={_id} disableRipple label={value} value={value} />
              ))}
            </Tabs>
          </Box>

          {/* this commented code will get removed in subsequent PR's */}

          {/* <EmptyBookmark
        imgSrc={noBroadcasts}
        imgAlt="no broadcasts"
        h1Text="Something's going in your mind?"
        h2Text="Broadcast it"
      /> */}

          <ListBroadcasts />
        </>
      )}
    </Box>
  );
};
