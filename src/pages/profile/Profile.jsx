import { ProfileData } from "data";
import classNames from "classnames";
import { sharedReducer } from "reducer";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { useProfile, useUser } from "context";
import { API_TO_GET_USER_PROFILE } from "utils";
import { useEffect, useReducer, useState } from "react";
import { Button, Box, Link, Tab, Tabs, Typography } from "@mui/material";
import { FilledAccountCircleIcon, LinkIcon, noBroadcasts } from "assets";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  EditProfileDialog,
  EmptyBookmark,
  ListBroadcasts,
  PageHeading,
  LoadingCircularProgress,
} from "components";

const { tabsOptions } = ProfileData;

export const Profile = () => {
  const { profile: loggedUserData } = useProfile();
  const {
    userState: { userUsername },
  } = useUser();
  const { username } = useParams();

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
      (profile.data === null || profile.data.username !== userUsername)
    ) {
      callAPI(`${api}/${username}`, propertyToGet, dispatch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, propertyToGet, userUsername, username]);

  const [newProfileData, setNewProfileData] = useState({
    name: "Himanshu Singh",
    bio: "Learning at @neogcamp '22 | Participant @girlscriptsoc | Contributor @hacktoberfest\n\nFollow to read tweets around React JS, JavaScript, Web Dev, and Programming",
    websiteURL: "https://dynamicprogrammer.hashnode.dev",
  });

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box className={styles.profile_container}>
      <EditProfileDialog
        openEditProfileDialog={openEditProfileDialog}
        setOpenEditProfileDialog={setOpenEditProfileDialog}
        newProfileData={newProfileData}
        setNewProfileData={setNewProfileData}
      />

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
            variant={isProfileOfLoggedUser ? "outlined" : "contained"}
            className={classNames(
              styles.btn,
              isProfileOfLoggedUser ? styles.btn_editProfile : styles.btn_follow
            )}
            onClick={
              isProfileOfLoggedUser
                ? () => setOpenEditProfileDialog(true)
                : () => {}
            }
          >
            {isProfileOfLoggedUser ? "Edit Profile" : "Follow"}
          </Button>

          {/* these comments will get removed in subsequent PR's */}

          {/* <Button
        variant="outlined"
        onClick={() => setOpenEditProfileDialog(true)}
        className={classNames(styles.btn, styles.btn_unfollow)}
      >
        Unfollow
      </Button> */}

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
              component="p"
              fontSize="1.5rem"
              whiteSpace="pre-line"
            >
              {data?.bio ?? ""}
            </Typography>

            {(data?.websiteURL ?? "").length > 0 && (
              <Box my="1rem" className={styles.url_container}>
                <LinkIcon />
                <Link
                  href={data.websiteURL}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
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
