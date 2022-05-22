import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  PageHeading,
  ListBroadcasts,
  LoadingCircularProgress,
} from "components";

export const Explore = () => {
  useScrollToTop();
  useDocumentTitle("Explore");

  const { userUsername } = useSelector((state) => state.user);
  const { status, data } = useSelector((state) => state.posts);

  const dataToShow = useMemo(
    () => data?.filter((post) => post.username !== userUsername),
    [data, userUsername]
  );

  return (
    <>
      {status === "loading" && data === null && <LoadingCircularProgress />}

      {data !== null && (
        <>
          <PageHeading>
            <Typography component="h1" fontWeight="bold" variant="h4">
              Explore
            </Typography>
          </PageHeading>

          <ListBroadcasts broadcastsToShow={dataToShow} />
        </>
      )}
    </>
  );
};
