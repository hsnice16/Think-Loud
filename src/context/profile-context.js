import { useAsync } from "custom-hooks";
import { useSelector } from "react-redux";
import { API_TO_GET_USER_PROFILE } from "utils";
import { createContext, useContext } from "react";
import { sharedInitialReducerState } from "reducer";

const ProfileContext = createContext({
  dispatch: () => {},
  profile: sharedInitialReducerState,
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { api, propertyToGet } = API_TO_GET_USER_PROFILE;
  const { userUsername } = useSelector((state) => state.user);

  const { state: profile, dispatch } = useAsync({
    propertyToGet,
    api: `${api}/${userUsername}`,
  });

  const value = { profile, dispatch };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
