import styles from "./LeftSideNavbar.module.css";
import classNames from "classnames";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { ROUTE_HOME } from "utils";
import { LeftSideNavbarData } from "data";
import { EllipsisHorizontalIcon, HimanshuJPG } from "assets";
import { AccountCircleStyles, ListItemStyles } from "./styles-constants";

export const LeftSideNavbar = () => {
  const location = useLocation();
  const { logoImg, links } = LeftSideNavbarData;

  return (
    <Grid
      component="aside"
      item
      sm={3}
      md={3}
      p={2}
      className={styles.aside}
      sx={{ flexDirection: "column" }}
    >
      <div>
        <Link to={ROUTE_HOME}>
          <img
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
                sx={ListItemStyles}
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

        <Button
          disableElevation
          disableRipple
          variant="contained"
          className="btn_broadCast"
        >
          Broadcast
        </Button>
      </div>

      <ListItem
        component="button"
        className={classNames(styles.link, styles.accountCircle_btn)}
        sx={AccountCircleStyles}
      >
        <ListItemAvatar sx={{ minWidth: "1rem" }}>
          <Avatar
            className={styles.navIcon}
            alt="Himanshu Avatar"
            src={HimanshuJPG}
          />
        </ListItemAvatar>
        <ListItemText
          primary="Himanshu Singh"
          secondary="@hsnice16"
          className={classNames(
            styles.listText,
            styles.listText_active,
            styles.accountCircle_btnText
          )}
        />

        <ListItemIcon sx={{ minWidth: "1rem" }}>
          <EllipsisHorizontalIcon className={classNames(styles.ellipsisIcon)} />
        </ListItemIcon>
      </ListItem>
    </Grid>
  );
};
