import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authCookieHandler } from "utils";
import { useGetPostsQuery } from "redux/api/postsAPI";
import { setUserState, initialState } from "redux/features/user/userSlice";

const { getCookies } = authCookieHandler();
const allCookies = getCookies();

export const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserState(
        allCookies.userAuthToken !== ""
          ? { isUserAuthTokenExist: true, ...allCookies }
          : initialState
      )
    );
  }, [dispatch]);

  useGetPostsQuery();

  return <>{children}</>;
};
