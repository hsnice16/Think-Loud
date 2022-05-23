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

export const API_TO_GET_UNFOLLOWED_USERS = {
  api: "/api/users/uf",
  propertyToGet: "users",
};
