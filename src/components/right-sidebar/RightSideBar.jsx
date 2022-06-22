import { SearchIcon } from "assets";
import classNames from "classnames";
import { useAsync } from "custom-hooks";
import styles from "./RightSideBar.module.css";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { usePostFollowCallMutation } from "redux/api/userAPI";
import { setFollowUsername } from "redux/features/user/userSlice";

import {
  Box,
  List,
  InputBase,
  Typography,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";

import {
  sharedReducer,
  ACTION_TYPE_LOADING,
  sharedInitialReducerState,
} from "reducer";

import {
  ROUTE_PROFILE,
  isStatusLoading,
  API_TO_GET_UNFOLLOWED_USERS,
} from "utils";

import {
  FollowItem,
  CustomButton,
  LoadingSpinner,
  ConnectWithMeLink,
  LoadingCircularProgress,
} from "components";

export const RightSideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const { api, propertyToGet } = API_TO_GET_UNFOLLOWED_USERS;
  const {
    userUsername,
    follow: { status: followStatus, username: followUsername },
  } = useSelector((state) => state.user);
  const apiToCall = { api: `${api}/${userUsername}`, propertyToGet };

  const {
    callAPI,
    dispatch,
    state: { status, data },
  } = useAsync(apiToCall);

  const location = useLocation();
  const userSliceDispatch = useDispatch();
  const [timerId, setTimerId] = useState("");
  const [postFollowCall] = usePostFollowCallMutation();
  const [searchedQuery, setSearchedQuery] = useState("");
  const [searchedUsers, searchedUsersDispatch] = useReducer(
    sharedReducer,
    sharedInitialReducerState
  );
  const { status: searchedUsersStatus, data: searchedUsersData } =
    searchedUsers;
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleFollowClick = (username) => {
    userSliceDispatch(setFollowUsername(username));
    postFollowCall(username);
  };

  useEffect(() => {
    setSearchedQuery("");
  }, [location.pathname]);

  useEffect(() => {
    if (followStatus === "success") {
      callAPI(apiToCall.api, apiToCall.propertyToGet, dispatch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followStatus]);

  useEffect(() => {
    const handleDocumentClick = () => {
      if (showSearchSuggestions) setShowSearchSuggestions(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showSearchSuggestions]);

  const handleSearchInputChange = (event) => {
    clearTimeout(timerId);

    if (event.target.value) {
      setShowSearchSuggestions(true);
      setTimerId(
        setTimeout(async () => {
          callAPI(
            `/api/users/q/${event.target.value}`,
            "users",
            searchedUsersDispatch
          );
        }, 1000)
      );
    } else {
      setShowSearchSuggestions(false);
      searchedUsersDispatch({ type: ACTION_TYPE_LOADING });
    }

    setSearchedQuery(event.target.value);
  };

  return (
    <Box
      py={2}
      pl={3}
      className="aside"
      component="aside"
      gridColumn="span 4"
      sx={{ display: matches ? "none" : "unset" }}
    >
      <Box sx={{ position: "relative" }}>
        <InputBase
          value={searchedQuery}
          className={styles.inputField}
          placeholder="Search ThinkLoud"
          onChange={handleSearchInputChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className={styles.searchIcon} />
            </InputAdornment>
          }
          inputProps={{ "aria-label": "search thinkloud" }}
        />

        {showSearchSuggestions && (
          <Box
            onClick={(event) => event.stopPropagation()}
            className={classNames(styles.followBox, styles.searchSuggestions)}
          >
            {searchedUsersStatus === "loading" && <LoadingCircularProgress />}

            {searchedUsersStatus === "success" &&
              (searchedUsersData.length > 0 ? (
                <List>
                  {searchedUsersData.map(
                    ({ _id, firstName, lastName, username, profilePic }) => (
                      <FollowItem
                        key={_id}
                        username={username}
                        avatarSrc={profilePic}
                        textClassName={styles.listText}
                        fullName={`${firstName} ${lastName}`}
                        linkProps={{
                          component: Link,
                          to: `${ROUTE_PROFILE}/${username}`,
                        }}
                        itemSxStyles={{ paddingLeft: 0, paddingRight: 0 }}
                        avatarSxStyles={{ height: "4.5rem", width: "4.5rem" }}
                      />
                    )
                  )}
                </List>
              ) : (
                <Typography component="p">
                  No users found, try something else
                </Typography>
              ))}
          </Box>
        )}
      </Box>

      <Box className={styles.followBox}>
        <Typography component="h2">Who to follow</Typography>

        <List>
          {status === "loading" && <LoadingCircularProgress />}

          {status === "success" &&
            data.map(({ _id, firstName, lastName, username, profilePic }) => (
              <FollowItem
                key={_id}
                username={username}
                avatarSrc={profilePic}
                textClassName={styles.listText}
                fullName={`${firstName} ${lastName}`}
                linkProps={{
                  component: Link,
                  to: `${ROUTE_PROFILE}/${username}`,
                }}
                itemSxStyles={{ paddingLeft: 0, paddingRight: 0 }}
                avatarSxStyles={{ height: "4.5rem", width: "4.5rem" }}
              >
                <CustomButton
                  disabled={isStatusLoading(followStatus)}
                  onClick={() => handleFollowClick(username)}
                  className={classNames(
                    styles.followBtn,
                    isStatusLoading(followStatus) ? styles.disabledBtn : ""
                  )}
                >
                  {isStatusLoading(followStatus) &&
                    followUsername === username && (
                      <LoadingSpinner followSpinner />
                    )}
                  Follow
                </CustomButton>
              </FollowItem>
            ))}
        </List>
      </Box>

      <ConnectWithMeLink />
    </Box>
  );
};
