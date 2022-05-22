import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookieHandler } from "custom-hooks";
import { useGetPostsQuery } from "redux/api/postsAPI";
import { setUserState, initialState } from "redux/features/user/userSlice";

export const AppWrapper = ({ children }) => {
  const { getCookies } = useCookieHandler();
  const allCookies = getCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserState(
        allCookies.userAuthToken !== ""
          ? { isUserAuthTokenExist: true, ...allCookies }
          : initialState
      )
    );

    console.log("App Wrapper setUserState useEffect");
  }, [allCookies, dispatch]);

  useGetPostsQuery();

  return <>{children}</>;
};
