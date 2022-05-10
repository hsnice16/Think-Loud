import { useState } from "react";
import styles from "./Bookmarks.module.css";
import { Box, Typography } from "@mui/material";
import { emptyBookmark, EllipsisHorizontalIcon } from "assets";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  CustomIconButton,
  EmptyBookmark,
  ListBroadcasts,
  OptionsMenu,
  PageHeading,
} from "components";

export const Bookmarks = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  useDocumentTitle("Bookmarks");
  useScrollToTop();

  const handleMenuIconButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <PageHeading className={styles.pageHeading}>
        <Box>
          <Typography component="h1" fontWeight="bold" variant="h4">
            Bookmarks
          </Typography>
          <Typography component="p" fontSize="1.2rem">
            @hsnice16
          </Typography>
        </Box>

        <CustomIconButton
          ariaLabel="menu"
          handleClick={handleMenuIconButtonClick}
        >
          <EllipsisHorizontalIcon />
        </CustomIconButton>

        <OptionsMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuItems={[
            { _id: "007", color: "error", item: "Clear all Bookmakrs" },
          ]}
        />
      </PageHeading>

      <EmptyBookmark
        imgSrc={emptyBookmark}
        imgAlt="empty bookmark"
        h1Text="Want to read a Broadcast later?"
        h2Text="Bookmark that"
      />

      {/* this commented code will get removed in subsequent PR's */}

      {/* <ListBroadcasts /> */}
    </>
  );
};
