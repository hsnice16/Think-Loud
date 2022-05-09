import { useState } from "react";
import styles from "./Bookmarks.module.css";
import { EllipsisHorizontalIcon } from "assets";
import { Box, Typography } from "@mui/material";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import {
  CustomIconButton,
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
          menuItems={[{ _id: "007", item: "Clear all Bookmakrs" }]}
        />
      </PageHeading>

      <ListBroadcasts />
    </>
  );
};
