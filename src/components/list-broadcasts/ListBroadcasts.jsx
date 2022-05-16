import PropTypes from "prop-types";
import { BroadcastBox } from "components";
import { List, ListItem } from "@mui/material";

export const ListBroadcasts = ({ broadcastsToShow }) => {
  return (
    <List sx={{ padding: "0 0 2rem 0" }}>
      {broadcastsToShow.map((broadcastDetails) => (
        <ListItem key={broadcastDetails._id} sx={{ padding: 0 }}>
          <BroadcastBox broadcastDetails={broadcastDetails} />
        </ListItem>
      ))}
    </List>
  );
};

ListBroadcasts.propTypes = {
  broadcastsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      comments: PropTypes.array,
      content: PropTypes.string,
      username: PropTypes.string,
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      likes: PropTypes.shape({
        likedBy: PropTypes.array,
        likeCount: PropTypes.number,
        dislikedBy: PropTypes.array,
      }),
    })
  ),
};

ListBroadcasts.defaultProps = {
  broadcastsToShow: [
    {
      _id: "",
      content: "",
      comments: [],
      username: "",
      lastName: "",
      firstName: "",
      createdAt: "",
      updatedAt: "",
      likes: {
        likedBy: [],
        likeCount: 0,
        dislikedBy: [],
      },
    },
  ],
};
