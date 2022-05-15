import { HomeData } from "data";
import { usePosts } from "context";
import { FilterIcon } from "assets";
import styles from "./Home.module.css";
import { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { BROADCAST_MAX_CHARACTERS } from "utils";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  PageHeading,
  OptionsMenu,
  ListBroadcasts,
  CustomIconButton,
  BroadcastDialogActions,
  BroadcastDialogContent,
  LoadingCircularProgress,
} from "components";

const { menuOptions } = HomeData;

export const Home = () => {
  const [selectedH1Text, setSelectedH1Text] = useState("Home");
  const [anchorEl, setAnchorEl] = useState(null);
  const [postText, setPostText] = useState("");

  const clickHandlerMappedMenuOptions = useMemo(
    () =>
      menuOptions.map((option) => ({
        ...option,
        handleClick: () => {
          setAnchorEl(null);
          setSelectedH1Text(option.h1Text);
        },
      })),
    []
  );

  const optionsMenuToShow = useMemo(
    () =>
      clickHandlerMappedMenuOptions.filter(
        ({ h1Text }) => h1Text !== selectedH1Text
      ),
    [clickHandlerMappedMenuOptions, selectedH1Text]
  );

  const {
    posts: { status, data },
  } = usePosts();

  useDocumentTitle(selectedH1Text);
  useScrollToTop(selectedH1Text);

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleMenuIconButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dataToShow = useMemo(() => {
    let tempDataToShow =
      selectedH1Text === "Most Liked Broadcasts"
        ? data
            ?.filter(({ likes: { likeCount } }) => likeCount !== 0)
            .sort(
              (firstBroadcast, secondBroadcast) =>
                secondBroadcast.likes.likeCount - firstBroadcast.likes.likeCount
            )
        : data;

    tempDataToShow =
      selectedH1Text === "Latest Broadcasts"
        ? data?.sort((firstBroadcast, secondBroadcast) => {
            const currDate = new Date();

            const firstBroadcastDateInLocale = new Date(
              firstBroadcast.createdAt
            );
            const secondBroadcastDateInLocale = new Date(
              secondBroadcast.createdAt
            );

            const diffOfFirstBroadcastDate =
              currDate - firstBroadcastDateInLocale;
            const diffOfSecondBroadcastDate =
              currDate - secondBroadcastDateInLocale;

            if (diffOfFirstBroadcastDate === diffOfSecondBroadcastDate) {
              return 0;
            } else if (diffOfFirstBroadcastDate > diffOfSecondBroadcastDate) {
              return 1;
            }

            return -1;
          })
        : tempDataToShow;

    return tempDataToShow;
  }, [data, selectedH1Text]);

  return (
    <>
      {status === "loading" && data === null && <LoadingCircularProgress />}

      {data !== null && (
        <>
          <PageHeading>
            <Typography component="h1" fontWeight="bold" variant="h4">
              {selectedH1Text}
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
              menuItems={optionsMenuToShow}
            />
          </PageHeading>

          {selectedH1Text === "Home" && (
            <Box className={styles.textArea_container}>
              <BroadcastDialogContent
                minRows={1}
                postText={postText}
                handlePostTextChange={handlePostTextChange}
              />

              <BroadcastDialogActions postText={postText} btnText="Broadcast" />
            </Box>
          )}

          <ListBroadcasts broadcastsToShow={dataToShow} />
        </>
      )}
    </>
  );
};
