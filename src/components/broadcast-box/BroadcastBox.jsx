import classNames from "classnames";
import styles from "./BroadcastBox.module.css";
import { Box, Typography } from "@mui/material";
import { AvatarGridBox, CustomIconButton } from "components";
import {
  CommentIcon,
  EllipsisHorizontalIcon,
  FilledBookmarkIcon,
  FilledHeartIcon,
  HimanshuJPG,
} from "assets";

const post =
  "Hey 👋 everyone\n\nfinally, I have completed all the basic features of the marvelsQuiz app\n\n🌐Live URL: https://marvelsquiz.vercel.app\n🔗GitHub link: https://github.com/hsnice16/react-marvelsQuiz\n\nfeedbacks are appreciated.";

export const BroadcastBox = () => {
  return (
    <AvatarGridBox
      imgSrc={HimanshuJPG}
      imgAlt="Himanshu Avatar"
      className={styles.avatarBox}
    >
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Box className={styles.name}>
            <Typography component="h2">Himanshu Singh</Typography>
            <Typography component="p">@hsnice16</Typography>
          </Box>

          <CustomIconButton ariaLabel="menu" className={styles.btnMenu_icon}>
            <EllipsisHorizontalIcon />
          </CustomIconButton>
        </Box>

        <Box component="p" className={styles.broadcast_message}>
          {post}
        </Box>

        <Box className={styles.footer_actions}>
          {[
            {
              _id: "0070",
              ariaLabel: "like",
              count: 10,
              Icon: FilledHeartIcon,
            },
            {
              _id: "0071",
              ariaLabel: "comment",
              count: 0,
              Icon: CommentIcon,
            },
            {
              _id: "0072",
              ariaLabel: "bookmark",
              count: 0,
              Icon: FilledBookmarkIcon,
            },
          ].map(({ _id, ariaLabel, count, Icon }) => (
            <Box key={_id}>
              <CustomIconButton
                ariaLabel={ariaLabel}
                className={classNames(
                  styles.btnAction_icon,
                  ariaLabel === "like" ? styles.likedIcon : ""
                )}
              >
                <Icon />
              </CustomIconButton>
              {count !== 0 && count}
            </Box>
          ))}
        </Box>
      </Box>
    </AvatarGridBox>
  );
};
