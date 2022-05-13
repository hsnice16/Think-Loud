import { useState } from "react";
import { useUser } from "context";
import classNames from "classnames";
import { LeftSideNavbarData } from "data";
import { EllipsisHorizontalIcon } from "assets";
import styles from "./LeftSideNavbar.module.css";
import { ROUTE_HOME, ROUTE_PROFILE } from "utils";
import { Link, useLocation } from "react-router-dom";

import {
  BroadcastDialog,
  CustomButton,
  FollowItem,
  LogoutDialog,
} from "components";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const { logoImg, links } = LeftSideNavbarData;

export const LeftSideNavbar = () => {
  const location = useLocation();
  const {
    userState: { userFullName, userUsername },
  } = useUser();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openBroadcastDialog, setOpenBroadcastDialog] = useState(false);

  return (
    <Box
      py={2}
      component="aside"
      gridColumn="span 2"
      sx={{ flexDirection: "column" }}
      className={classNames("aside", styles.aside)}
    >
      <BroadcastDialog
        openBroadcastDialog={openBroadcastDialog}
        setOpenBroadcastDialog={setOpenBroadcastDialog}
      />

      <LogoutDialog
        openLogoutDialog={openLogoutDialog}
        setOpenLogoutDialog={setOpenLogoutDialog}
      />

      <Box>
        <Link to={ROUTE_HOME}>
          <img
            loading="lazy"
            src={logoImg.src}
            alt={logoImg.altText}
            className={styles.logoImg}
          />
        </Link>

        <List component="nav" sx={{ marginTop: "2rem" }}>
          {links.map(({ _id, link }) => {
            const url =
              link.url === ROUTE_PROFILE
                ? `${link.url}/${userUsername}`
                : link.url;

            const isLinkActive = location.pathname === url;

            return (
              <ListItem
                to={url}
                key={_id}
                component={Link}
                className={styles.link}
                sx={{ padding: "0.3rem 1.5rem 0.3rem 1.2rem" }}
              >
                <ListItemIcon sx={{ minWidth: "1rem" }}>
                  {isLinkActive ? (
                    <link.FilledIcon className={styles.navIcon} />
                  ) : (
                    <link.OutlinedIcon className={styles.navIcon} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  className={classNames(
                    styles.listText,
                    isLinkActive ? styles.listText_active : ""
                  )}
                />
              </ListItem>
            );
          })}
        </List>

        <CustomButton
          className={styles.broadcast_btn}
          onClick={() => setOpenBroadcastDialog(true)}
        >
          Broadcast
        </CustomButton>
      </Box>

      <FollowItem
        itemComponent="button"
        fullName={userFullName}
        username={userUsername}
        onClick={() => setOpenLogoutDialog(true)}
        itemClassName={classNames(styles.link, styles.accountCircle_btn)}
        avatarSxStyles={{
          "& svg > path": {
            transform: "translateX(-0.4rem)",
          },
        }}
        textClassName={classNames(
          styles.listText,
          styles.listText_active,
          styles.accountCircle_btnText
        )}
      >
        <ListItemIcon sx={{ minWidth: "1rem" }}>
          <EllipsisHorizontalIcon className={classNames(styles.ellipsisIcon)} />
        </ListItemIcon>
      </FollowItem>
    </Box>
  );
};
