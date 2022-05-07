import { useState } from "react";
import { ROUTE_HOME } from "utils";
import classNames from "classnames";
import { LeftSideNavbarData } from "data";
import { EllipsisHorizontalIcon } from "assets";
import styles from "./LeftSideNavbar.module.css";
import { Link, useLocation } from "react-router-dom";

import {
  AccountCircleSx,
  BroadcastBtnSx,
  ListItemSx,
} from "./styles-constants";
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

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openBroadcastDialog, setOpenBroadcastDialog] = useState(false);

  return (
    <Box
      component="aside"
      gridColumn="span 3"
      py={2}
      className={styles.aside}
      sx={{ flexDirection: "column" }}
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
            className={styles.logoImg}
            src={logoImg.src}
            alt={logoImg.altText}
          />
        </Link>

        <List component="nav" sx={{ marginTop: "2rem" }}>
          {links.map(({ _id, link }) => {
            const isLinkActive = location.pathname === link.url;

            return (
              <ListItem
                key={_id}
                component={Link}
                to={link.url}
                className={styles.link}
                sx={ListItemSx}
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
          onClick={() => setOpenBroadcastDialog(true)}
          sxStyles={BroadcastBtnSx}
        >
          Broadcast
        </CustomButton>
      </Box>

      <FollowItem
        onClick={() => setOpenLogoutDialog(true)}
        itemComponent="button"
        itemSxStyles={AccountCircleSx}
        textClassName={classNames(
          styles.listText,
          styles.listText_active,
          styles.accountCircle_btnText
        )}
        itemClassName={classNames(styles.link, styles.accountCircle_btn)}
      >
        <ListItemIcon sx={{ minWidth: "1rem" }}>
          <EllipsisHorizontalIcon className={classNames(styles.ellipsisIcon)} />
        </ListItemIcon>
      </FollowItem>
    </Box>
  );
};
