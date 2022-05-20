import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "@mui/material";
import { CustomIconButton } from "components";
import { usePosts, useBookmarks } from "context";
import styles from "./BroadcastBoxFooter.module.css";

import {
  CommentIcon,
  FilledHeartIcon,
  OutlinedHeartIcon,
  FilledBookmarkIcon,
  OutlinedBookmarkIcon,
} from "assets";

export const BroadcastBoxFooter = ({
  _id,
  comments,
  likeCount,
  setOpenReplyDialog,
  isLikedByLoggedUser,
  setIsLikedByLoggedUser,
  isInLoggedUserBookmarks,
  setIsInLoggedUserBookmarks,
}) => {
  const { postLikeCall, postDisLikeCall } = usePosts();
  const { postAddBookmarkCall, postRemoveBookmarkCall } = useBookmarks();

  return (
    <Box
      className={styles.footer_actions}
      onClick={(event) => event.stopPropagation()}
    >
      <Box>
        <CustomIconButton
          ariaLabel="like"
          handleClick={
            isLikedByLoggedUser
              ? () => {
                  setIsLikedByLoggedUser(false);
                  postDisLikeCall(_id);
                }
              : () => {
                  setIsLikedByLoggedUser(true);
                  postLikeCall(_id);
                }
          }
          className={classNames(
            styles.btnAction_icon,
            isLikedByLoggedUser > 0 ? styles.likedIcon : ""
          )}
        >
          {isLikedByLoggedUser > 0 ? (
            <FilledHeartIcon />
          ) : (
            <OutlinedHeartIcon />
          )}
        </CustomIconButton>
        {likeCount > 0 && likeCount}
      </Box>

      <Box>
        <CustomIconButton
          ariaLabel="reply"
          className={styles.btnAction_icon}
          handleClick={() => setOpenReplyDialog(true)}
        >
          <CommentIcon />
        </CustomIconButton>
        {comments.length > 0 && comments.length}
      </Box>

      <Box>
        <CustomIconButton
          ariaLabel="bookmark"
          className={styles.btnAction_icon}
          handleClick={
            isInLoggedUserBookmarks
              ? () => {
                  setIsInLoggedUserBookmarks(false);
                  postRemoveBookmarkCall(_id);
                }
              : () => {
                  setIsInLoggedUserBookmarks(true);
                  postAddBookmarkCall(_id);
                }
          }
        >
          {isInLoggedUserBookmarks ? (
            <FilledBookmarkIcon />
          ) : (
            <OutlinedBookmarkIcon />
          )}
        </CustomIconButton>
      </Box>
    </Box>
  );
};

BroadcastBoxFooter.propTypes = {
  _id: PropTypes.string,
  comments: PropTypes.array,
  likeCount: PropTypes.number,
  setOpenReplyDialog: PropTypes.func,
  isLikedByLoggedUser: PropTypes.bool,
  setIsLikedByLoggedUser: PropTypes.func,
  isInLoggedUserBookmarks: PropTypes.bool,
  setIsInLoggedUserBookmarks: PropTypes.func,
};

BroadcastBoxFooter.defaultProps = {
  _id: "",
  comments: [],
  likeCount: 0,
  isLikedByLoggedUser: false,
  setOpenReplyDialog: () => {},
  isInLoggedUserBookmarks: false,
  setIsLikedByLoggedUser: () => {},
  setIsInLoggedUserBookmarks: () => {},
};
