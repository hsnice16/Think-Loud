import styles from "./RightSideBar.module.css";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  InputAdornment,
  InputBase,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { OpenInNewIcon, SearchIcon } from "assets";
import { CustomButton, FollowItem } from "components";
import { AvatarIconSx, FollowBtnSx } from "./styles-constants";

export const RightSideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      component="aside"
      gridColumn="span 3"
      py={2}
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
          {/* just for design purpose */}
          {new Array(3).fill(0).map(() => (
            <FollowItem
              itemSxStyles={{ paddingLeft: 0, paddingRight: 0 }}
              avatarSxStyles={AvatarIconSx}
              textClassName={styles.listText}
            >
              <CustomButton sxStyles={FollowBtnSx}>Follow</CustomButton>
            </FollowItem>
          ))}
        </List>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <a
          href="https://twitter.com/hsnice16"
          target="_blank"
          rel="noreferrer"
          className={styles.link_connectWithMe}
        >
          connect with me <OpenInNewIcon />
        </a>
      </Box>
    </Box>
  );
};
