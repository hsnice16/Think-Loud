import { useCookieHandler } from "custom-hooks";
import { createContext, useContext, useState } from "react";

const userInitialState = {
  userUsername: "",
  userFullName: "",
  userAuthToken: "",
  isUserAuthTokenExist: false,
};

const UserContext = createContext({
  userInitialState,
  setUserState: () => {},
  userState: userInitialState,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { getCookies } = useCookieHandler();
  const allCookies = getCookies();

  const [userState, setUserState] = useState(
    allCookies.userAuthToken !== ""
      ? { isUserAuthTokenExist: true, ...allCookies }
      : userInitialState
  );

  const value = { userState, userInitialState, setUserState };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
