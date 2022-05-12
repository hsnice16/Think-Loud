import { useUser } from "context";
import { SearchIcon } from "assets";
import { useAsync } from "custom-hooks";
import { Link } from "react-router-dom";
import styles from "./RightSideBar.module.css";
import { useTheme } from "@mui/material/styles";
import { API_TO_GET_UNFOLLOWED_USERS, ROUTE_PROFILE } from "utils";

import {
  FollowItem,
  CustomButton,
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

  const {
    userState: { userUsername },
  } = useUser();
  const { api, propertyToGet } = API_TO_GET_UNFOLLOWED_USERS;

  const {
    state: { status, data },
  } = useAsync({ api: `${api}/${userUsername}`, propertyToGet });

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
            data.map(({ _id, firstName, lastName, username }) => (
              <FollowItem
                key={_id}
                username={username}
                textClassName={styles.listText}
                fullName={`${firstName} ${lastName}`}
                itemSxStyles={{ paddingLeft: 0, paddingRight: 0 }}
                avatarSxStyles={{ height: "4.5rem", width: "4.5rem" }}
                linkProps={{
                  component: Link,
                  to: `${ROUTE_PROFILE}/${username}`,
                }}
              >
                <CustomButton className={styles.followBtn}>Follow</CustomButton>
              </FollowItem>
            ))}
        </List>
      </Box>

      <ConnectWithMeLink />
    </Box>
  );
};
