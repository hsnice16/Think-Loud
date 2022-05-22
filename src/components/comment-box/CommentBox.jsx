import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./CommentBox.module.css";
import { Box, Typography } from "@mui/material";
import { getTimeDurationToShow, ROUTE_PROFILE } from "utils";
import { AvatarGridBox, BroadcastBoxHeader } from "components";

export const CommentBox = ({ postUsername, comment }) => {
  const { username, profilePic, lastName, firstName, text, createdAt } =
    comment;

  const [timeDurationToShow, setTimeDurationToShow] = useState(
    getTimeDurationToShow(createdAt)
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeDurationToShow(getTimeDurationToShow(createdAt)),
      3000
    );

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <AvatarGridBox
      username={username}
      avatarSrc={profilePic}
      className={styles.avatarBox}
    >
      <Box className={styles.container}>
        <BroadcastBoxHeader
          h2Text={`${firstName} ${lastName}`}
          linkProps={{
            component: Link,
            to: `${ROUTE_PROFILE}/${username}`,
          }}
          pText={`@${username} • ${timeDurationToShow}`}
        />
        <Typography component="p" className={styles.replyingTo_para}>
          Replying to @{postUsername}
        </Typography>

        <Box component="p" className={styles.commentText}>
          {text}
        </Box>
      </Box>
    </AvatarGridBox>
  );
};

CommentBox.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    firstName: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    profilePic: PropTypes.string,
    votes: {
      upvotedBy: PropTypes.array,
      downvotedBy: PropTypes.array,
    },
  }),
  postUsername: PropTypes.string,
};

CommentBox.defaultProps = {
  comment: {
    _id: "",
    text: "",
    lastName: "",
    username: "",
    firstName: "",
    createdAt: "",
    updatedAt: "",
    profilePic: "",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
  },
  postUsername: "",
};