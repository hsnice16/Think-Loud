import { useParams } from "react-router-dom";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";
import { API_TO_GET_SINGLE_POST } from "utils";

import { NotFound, LoadingCircularProgress } from "components";

export const SinglePost = () => {
  const { postId } = useParams();
  const { api, propertyToGet } = API_TO_GET_SINGLE_POST;

  const {
    state: { status, data },
  } = useAsync({
    api: `${api}/${postId}`,
    propertyToGet,
  });

  useDocumentTitle(
    status === "success" ? `${data.firstName} ${data.lastName}` : "Post"
  );
  useScrollToTop();

  return status === "error" ? (
    <NotFound
      documentTitle="Post Not Found"
      h1Text="This post isn't available anymore"
    />
  ) : (
    <>
      {status === "loading" && <LoadingCircularProgress />}
      {status === "success" && <div>SinglePost</div>}
    </>
  );
};
