import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { emptyBookmark, EllipsisHorizontalIcon } from "assets";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  OptionsMenu,
  PageHeading,
  EmptyBookmark,
  ListBroadcasts,
  CustomIconButton,
  LoadingCircularProgress,
} from "components";

import {
  useGetBookmarksCallQuery,
  usePostClearAllBookmarksCallMutation,
} from "redux/api/userAPI";

export const Bookmarks = () => {
  useScrollToTop();
  useDocumentTitle("Bookmarks");

  const {
    userUsername,
    bookmarks: { status, data },
  } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const { data: postsData } = useSelector((state) => state.posts);
  const [postClearAllBookmarksCall] = usePostClearAllBookmarksCallMutation();

  useGetBookmarksCallQuery();

  const dataToShow = useMemo(
    () =>
      data !== null &&
      postsData !== null &&
      postsData.filter((post) =>
        data.some((bookmarkPost) => bookmarkPost._id === post._id)
      ),
    [data, postsData]
  );

  return (
    <>
      {status === "loading" && data === null && <LoadingCircularProgress />}

      {data !== null && (
        <>
          <PageHeading>
            <Box>
              <Typography component="h1" fontWeight="bold" variant="h4">
                Bookmarks
              </Typography>
              <Typography component="p" fontSize="1.2rem">
                @{userUsername}
              </Typography>
            </Box>

            {dataToShow.length > 0 && (
              <>
                <CustomIconButton
                  ariaLabel="menu"
                  handleClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <EllipsisHorizontalIcon />
                </CustomIconButton>

                <OptionsMenu
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  menuItems={[
                    {
                      _id: "007",
                      color: "error",
                      item: "Clear all Bookmakrs",
                      handleClick: () => postClearAllBookmarksCall(),
                    },
                  ]}
                />
              </>
            )}
          </PageHeading>

          {dataToShow.length === 0 ? (
            <EmptyBookmark
              h2Text="Bookmark that"
              imgSrc={emptyBookmark}
              imgAlt="empty bookmark"
              h1Text="Want to read a Broadcast later?"
            />
          ) : (
            <ListBroadcasts broadcastsToShow={dataToShow} />
          )}
        </>
      )}
    </>
  );
};
