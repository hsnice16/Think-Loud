import { useState } from "react";
import classNames from "classnames";
import { Box } from "@mui/material";
import styles from "./BroadcastBox.module.css";

import {
  AvatarGridBox,
  BroadcastBoxHeader,
  CustomIconButton,
  OptionsMenu,
  ReplyDialog,
} from "components";
import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  EllipsisHorizontalIcon,
  FilledBookmarkIcon,
  FilledHeartIcon,
  FollowAccountIcon,
  HimanshuJPG,
  UnfollowAccountIcon,
} from "assets";

// these variables are for design purpose only, they will get removed

const post =
  "Hey 👋 everyone\n\nfinally, I have completed all the basic features of the marvelsQuiz app\n\n🌐Live URL: https://marvelsquiz.vercel.app\n🔗GitHub link: https://github.com/hsnice16/react-marvelsQuiz\n\nfeedbacks are appreciated.";

const options = [
  {
    _id: "001",
    color: "normal",
    item: (
      <>
        <FollowAccountIcon /> Follow @hsnice16
      </>
    ),
  },
  {
    _id: "002",
    color: "normal",
    item: (
      <>
        <UnfollowAccountIcon /> Unfollow @hsnice16
      </>
    ),
  },
  {
    _id: "003",
    color: "error",
    item: (
      <>
        <DeleteIcon /> Delete this Broadcast
      </>
    ),
  },
  {
    _id: "004",
    color: "normal",
    item: (
      <>
        <EditIcon /> Edit this Broadcast
      </>
    ),
  },
];

export const BroadcastBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);

  const handleMenuIconButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplyClick = () => {
    setOpenReplyDialog(true);
  };

  return (
    <>
      <ReplyDialog
        openReplyDialog={openReplyDialog}
        setOpenReplyDialog={setOpenReplyDialog}
      />

      <AvatarGridBox
        imgSrc={HimanshuJPG}
        imgAlt="Himanshu Avatar"
        className={styles.avatarBox}
      >
        <Box className={styles.container}>
          <BroadcastBoxHeader
            h2Text="Himanshu Singh"
            pText="@hsnice16 • Dec 22, 2021"
            className={styles.header}
          >
            <CustomIconButton
              ariaLabel="menu"
              className={styles.btnMenu_icon}
              handleClick={handleMenuIconButtonClick}
            >
              <EllipsisHorizontalIcon />
            </CustomIconButton>

            <OptionsMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              menuItems={options}
            />
          </BroadcastBoxHeader>

          <Box component="p" className={styles.broadcast_message}>
            {post}
          </Box>

          <Box className={styles.footer_actions}>
            {/* 
            this list is for design purpose only, it will get changed 
            into a variable 
          */}

            {[
              {
                _id: "0070",
                ariaLabel: "like",
                count: 10,
                Icon: FilledHeartIcon,
                clickHandler: () => {},
              },
              {
                _id: "0071",
                ariaLabel: "reply",
                count: 0,
                Icon: CommentIcon,
                clickHandler: handleReplyClick,
              },
              {
                _id: "0072",
                ariaLabel: "bookmark",
                count: 0,
                Icon: FilledBookmarkIcon,
                clickHandler: () => {},
              },
            ].map(({ _id, ariaLabel, count, Icon, clickHandler }) => (
              <Box key={_id}>
                <CustomIconButton
                  handleClick={clickHandler}
                  ariaLabel={ariaLabel}
                  className={classNames(
                    styles.btnAction_icon,
                    ariaLabel === "like" && count > 0 ? styles.likedIcon : ""
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
    </>
  );
};
