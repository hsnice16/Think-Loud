import { useState } from "react";
import styles from "./Home.module.css";
import { Box, Typography } from "@mui/material";
import { BROADCAST_MAX_CHARACTERS } from "utils";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { FilledHeartIcon, FilterIcon, GoBackIcon, LatestIcon } from "assets";
import {
  BroadcastDialogActions,
  BroadcastDialogContent,
  CustomIconButton,
  ListBroadcasts,
  PageHeading,
  OptionsMenu,
} from "components";

// this variable will get removed in subsequent PR's

const options = [
  {
    _id: "001",
    color: "error",
    item: (
      <>
        <FilledHeartIcon /> See most liked Broadcasts instead
      </>
    ),
  },
  {
    _id: "002",
    color: "warning",
    item: (
      <>
        <LatestIcon /> See latest Broadcasts instead
      </>
    ),
  },
  {
    _id: "003",
    color: "normal",
    item: (
      <>
        <GoBackIcon /> Go back Home
      </>
    ),
  },
];

export const Home = () => {
  const [postText, setPostText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useDocumentTitle("Home");
  useScrollToTop();

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleMenuIconButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <PageHeading>
        <Typography component="h1" fontWeight="bold" variant="h4">
          Home
        </Typography>

        <CustomIconButton
          ariaLabel="menu"
          handleClick={handleMenuIconButtonClick}
        >
          <FilterIcon />
        </CustomIconButton>

        <OptionsMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuItems={options}
        />
      </PageHeading>

      <Box className={styles.textArea_container}>
        <BroadcastDialogContent
          postText={postText}
          handlePostTextChange={handlePostTextChange}
          minRows={1}
        />

        <BroadcastDialogActions postText={postText} btnText="Broadcast" />
      </Box>

      <ListBroadcasts />
    </>
  );
};
