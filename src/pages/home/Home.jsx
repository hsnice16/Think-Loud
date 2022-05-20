import { HomeData } from "data";
import styles from "./Home.module.css";
import { useState, useMemo } from "react";
import { emptyHome, FilterIcon } from "assets";
import { usePosts, useProfile } from "context";
import { Box, Typography } from "@mui/material";
import { useDocumentTitle, usePostText, useScrollToTop } from "custom-hooks";

import {
  OptionsMenu,
  PageHeading,
  EmptyBookmark,
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

  const { postText, handlePostTextChange, handleBroadcastClick } =
    usePostText();

  const {
    profile: { data: profileData },
  } = useProfile();

  const {
    posts: { status, data },
  } = usePosts();

  useDocumentTitle(selectedH1Text);
  useScrollToTop(selectedH1Text);

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

  const dataToShow = useMemo(() => {
    let tempDataToShow =
      data !== null && profileData !== null
        ? [...data]
            .reverse()
            .filter(
              (post) =>
                post.username === profileData?.username ||
                profileData?.following.some(
                  (user) => user.username === post.username
                )
            )
        : data;

    tempDataToShow =
      selectedH1Text === "Most Liked Broadcasts"
        ? tempDataToShow
            .filter(({ likes: { likeCount } }) => likeCount !== 0)
            .sort(
              (firstBroadcast, secondBroadcast) =>
                secondBroadcast.likes.likeCount - firstBroadcast.likes.likeCount
            )
        : tempDataToShow;

    tempDataToShow =
      selectedH1Text === "Latest Broadcasts"
        ? tempDataToShow.sort(
            (firstBroadcast, secondBroadcast) =>
              new Date(secondBroadcast.createdAt) -
              new Date(firstBroadcast.createdAt)
          )
        : tempDataToShow;

    return tempDataToShow;
  }, [data, profileData, selectedH1Text]);

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
              handleClick={(event) => setAnchorEl(event.currentTarget)}
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

              <BroadcastDialogActions
                status={status}
                btnText="Broadcast"
                postText={postText}
                onClick={handleBroadcastClick}
              />
            </Box>
          )}

          {dataToShow.length === 0 ? (
            <EmptyBookmark
              h1Text="Empty?"
              imgSrc={emptyHome}
              imgAlt="empty home"
              h2Text="Either follow someone or make a broadcast yourself"
            />
          ) : (
            <ListBroadcasts broadcastsToShow={dataToShow} />
          )}
        </>
      )}
    </>
  );
};
