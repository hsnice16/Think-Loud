import { Typography } from "@mui/material";
import { ListBroadcasts, PageHeading } from "components";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

export const Explore = () => {
  useDocumentTitle("Explore");
  useScrollToTop();

  return (
    <>
      <PageHeading>
        <Typography component="h1" fontWeight="bold" variant="h4">
          Explore
        </Typography>
      </PageHeading>

      <ListBroadcasts />
    </>
  );
};
