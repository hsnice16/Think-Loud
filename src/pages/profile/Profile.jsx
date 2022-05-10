import { useState } from "react";
import { ProfileData } from "data";
import classNames from "classnames";
import styles from "./Profile.module.css";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { Button, Box, Link, Tab, Tabs, Typography } from "@mui/material";
import { FilledAccountCircleIcon, LinkIcon, noBroadcasts } from "assets";

import {
  EditProfileDialog,
  EmptyBookmark,
  ListBroadcasts,
  PageHeading,
} from "components";

const { tabsOptions } = ProfileData;

export const Profile = () => {
  const [newProfileData, setNewProfileData] = useState({
    name: "Himanshu Singh",
    bio: "",
    websiteURL: "",
  });
  const slicedWebsiteURL = newProfileData.websiteURL.slice(8);

  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Broadcasts");

  useDocumentTitle("Himanshu Singh (@hsnice16)");
  useScrollToTop();

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

      <PageHeading>
        <Typography component="h1" fontWeight="bold" variant="h4">
          Himanshu Singh
        </Typography>
        <Typography component="p" fontSize="1.2rem">
          1,629 Broadcasts
        </Typography>
      </PageHeading>

      <Box position="relative">
        <Box className={styles.background_img}></Box>
        <Box ml={2} className={styles.profile_pic}>
          <FilledAccountCircleIcon className={styles.accountCircle_icon} />
        </Box>
      </Box>

      {/* these comments will get removed in subsequent PR's */}

      {/* <Button
        variant="outlined"
        onClick={() => setOpenEditProfileDialog(true)}
        className={classNames(styles.btn, styles.btn_editProfile)}
      >
        Edit Profile
      </Button> */}

      {/* <Button
        variant="contained"
        onClick={() => setOpenEditProfileDialog(true)}
        className={classNames(styles.btn, styles.btn_follow)}
      >
        Follow
      </Button> */}

      <Button
        variant="outlined"
        onClick={() => setOpenEditProfileDialog(true)}
        className={classNames(styles.btn, styles.btn_unfollow)}
      >
        Unfollow
      </Button>

      <Box mt={2} pl={2} className={styles.border_bottom}>
        <Typography component="h3" fontWeight="bold" variant="h4">
          {newProfileData.name}
        </Typography>
        <Typography component="h4" variant="h5">
          @hsnice16
        </Typography>

        <Typography
          component="p"
          fontSize="1.5rem"
          mt={2}
          pr={2}
          whiteSpace="pre-line"
        >
          {newProfileData.bio}
        </Typography>

        {newProfileData.websiteURL.length > 0 && (
          <Box my="1rem" className={styles.url_container}>
            <LinkIcon />
            <Link
              href={newProfileData.websiteURL}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {slicedWebsiteURL}
            </Link>
          </Box>
        )}

        <Box className={styles.url_container}>
          <Typography fontSize="1.5rem">
            <Box component="strong">0</Box> Following
          </Typography>
          <Typography fontSize="1.5rem" ml="1rem">
            <Box component="strong">0</Box> Followers
          </Typography>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="broadcasts likes replies tabs"
          className={styles.tabs}
        >
          {tabsOptions.map(({ _id, value }) => (
            <Tab key={_id} disableRipple label={value} value={value} />
          ))}
        </Tabs>
      </Box>

      <EmptyBookmark
        imgSrc={noBroadcasts}
        imgAlt="no broadcasts"
        h1Text="Something's going in your mind?"
        h2Text="Broadcast it"
      />

      {/* this commented code will get removed in subsequent PR's */}

      {/* <ListBroadcasts /> */}
    </Box>
  );
};
