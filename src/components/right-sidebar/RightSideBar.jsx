import { useEffect } from "react";
import { SearchIcon } from "assets";
import classNames from "classnames";
import { useFollow } from "context";
import { useAsync } from "custom-hooks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./RightSideBar.module.css";
import { useTheme } from "@mui/material/styles";

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

import {
  Box,
  List,
  InputBase,
  Typography,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";

export const RightSideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const { api, propertyToGet } = API_TO_GET_UNFOLLOWED_USERS;
  const { userUsername } = useSelector((state) => state.user);
  const apiToCall = { api: `${api}/${userUsername}`, propertyToGet };

  const {
    callAPI,
    dispatch,
    state: { status, data },
  } = useAsync(apiToCall);

  const {
    postFollowCall,
    follow: { status: followStatus, username: followUsername },
  } = useFollow();

  const handleFollowClick = (username) => {
    postFollowCall(username);
  };

  useEffect(() => {
    if (followStatus === "success") {
      callAPI(apiToCall.api, apiToCall.propertyToGet, dispatch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followStatus]);

  return (
    <Box
      py={2}
      pl={3}
      className="aside"
      component="aside"
      gridColumn="span 4"
      sx={{ display: matches ? "none" : "unset" }}
    >
      <InputBase
        className={styles.inputField}
        placeholder="Search ThinkLoud"
        inputProps={{ "aria-label": "search thinkloud" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon className={styles.searchIcon} />
          </InputAdornment>
        }
      />

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
