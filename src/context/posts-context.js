import { useAsync } from "custom-hooks";
import { API_TO_GET_ALL_POSTS } from "utils";
import { createContext, useContext } from "react";
import { sharedInitialReducerState } from "reducer";

const PostsContext = createContext({
  dispatch: () => {},
  posts: sharedInitialReducerState,
});

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const { state: posts, dispatch } = useAsync(API_TO_GET_ALL_POSTS);

  const value = { posts, dispatch };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
