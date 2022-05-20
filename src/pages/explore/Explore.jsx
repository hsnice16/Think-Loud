import { useMemo } from "react";
import { Typography } from "@mui/material";
import { usePosts, useUser } from "context";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  PageHeading,
  ListBroadcasts,
  LoadingCircularProgress,
} from "components";

export const Explore = () => {
  useDocumentTitle("Explore");
  useScrollToTop();

  const {
    posts: { status, data },
  } = usePosts();

  const {
    userState: { userUsername },
  } = useUser();

  const dataToShow = useMemo(
    () =>
      status === "success"
        ? data?.filter((post) => post.username !== userUsername)
        : data,
    [data, status, userUsername]
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
