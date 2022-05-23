export const API_TO_GET_SINGLE_POST = {
  api: "/api/posts",
  propertyToGet: "post",
};

export const API_TO_POST_SIGN_IN_DETAILS = {
  api: "/api/auth/login",
  propertyToGet: "foundUser",
};

export const API_TO_POST_SIGN_UP_DETAILS = {
  api: "/api/auth/signup",
  propertyToGet: "createdUser",
};

export const API_TO_GET_USER_PROFILE = {
  api: "/api/users",
  propertyToGet: "user",
};

export const API_TO_POST_EDITED_USER_PROFILE = {
  api: "/api/users/edit",
  propertyToGet: "user",
};

export const API_TO_POST_ADD_BOOKMARK = {
  api: "/api/users/bookmark",
  propertyToGet: "bookmarks",
};

export const API_TO_POST_REMOVE_BOOKMARK = {
  api: "/api/users/remove-bookmark",
  propertyToGet: "bookmarks",
};

export const API_TO_POST_FOLLOW_USER = {
  api: "/api/users/follow",
};

export const API_TO_POST_UNFOLLOW_USER = {
  api: "/api/users/unfollow",
};

export const API_TO_GET_UNFOLLOWED_USERS = {
  api: "/api/users/uf",
  propertyToGet: "users",
};
