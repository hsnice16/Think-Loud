import { SearchIcon } from "assets";
import styles from "./RightSideBar.module.css";
import { useTheme } from "@mui/material/styles";
import { AvatarIconSx, FollowBtnSx } from "./styles-constants";
import { ConnectWithMeLink, CustomButton, FollowItem } from "components";
import {
  Box,
  InputAdornment,
  InputBase,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";

export const RightSideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      component="aside"
      gridColumn="span 4"
      py={2}
      pl={3}
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

      <ConnectWithMeLink />
    </Box>
  );
};
