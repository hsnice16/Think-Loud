import { useEffect } from "react";
import { authCookieHandler } from "utils";
import { useGetPostsQuery } from "redux/api/postsAPI";
import { useGetProfileQuery } from "redux/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserState, initialState } from "redux/features/user/userSlice";

const { getCookies } = authCookieHandler();
const allCookies = getCookies();

export const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { userUsername } = useSelector((state) => state.user);

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
  useGetProfileQuery(userUsername);

  return <>{children}</>;
};
