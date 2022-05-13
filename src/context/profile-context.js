import { useUser } from "context";
import { useAsync } from "custom-hooks";
import { API_TO_GET_USER_PROFILE } from "utils";
import { createContext, useContext } from "react";
import { sharedInitialReducerState } from "reducer";

const ProfileContext = createContext({
  dispatch: () => {},
  profile: sharedInitialReducerState,
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const {
    userState: { userUsername },
  } = useUser();
  const { api, propertyToGet } = API_TO_GET_USER_PROFILE;

  const { state: profile, dispatch } = useAsync({
    api: `${api}/${userUsername}`,
    propertyToGet,
  });

  const value = { profile, dispatch };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
