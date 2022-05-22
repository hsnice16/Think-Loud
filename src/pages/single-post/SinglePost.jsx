import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { API_TO_GET_SINGLE_POST } from "utils";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";

import {
  NotFound,
  CommentBox,
  SingleMainPost,
  LoadingCircularProgress,
} from "components";

export const SinglePost = () => {
  const { postId } = useParams();
  const { api, propertyToGet } = API_TO_GET_SINGLE_POST;
  const { data: postsData } = useSelector((state) => state.posts);

  const {
    callAPI,
    dispatch,
    state: { status, data },
  } = useAsync({
    propertyToGet,
    api: `${api}/${postId}`,
  });

  useScrollToTop();
  useDocumentTitle(
    status === "success" ? `${data.firstName} ${data.lastName} thinks` : "Post"
  );

  useEffect(() => {
    callAPI(`${api}/${postId}`, propertyToGet, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsData]);

  return status === "error" ? (
    <NotFound
      documentTitle="Post Not Found"
      h1Text="This post isn't available anymore"
    />
  ) : (
    <>
      {status === "loading" && data === null && <LoadingCircularProgress />}

      {data !== null && (
        <>
          <SingleMainPost details={data} />

          {data.comments.length > 0 ? (
            [...data.comments]
              .reverse()
              .map((comment) => (
                <CommentBox
                  comment={comment}
                  key={comment._id}
                  postUsername={data.username}
                />
              ))
          ) : (
            <Typography
              m={2}
              variant="h4"
              component="p"
              textAlign="center"
              color="var(--COLOR-TEXT)"
            >
              No replies
            </Typography>
          )}
        </>
      )}
    </>
  );
};
