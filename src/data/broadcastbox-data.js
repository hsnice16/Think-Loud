import { v4 as uuid } from "uuid";
import {
  EditIcon,
  DeleteIcon,
  FollowAccountIcon,
  UnfollowAccountIcon,
} from "assets";

export const BroadcastBoxData = {
  loggedUserBroadcastOptions: [
    {
      _id: uuid(),
      color: "error",
      item: (
        <>
          <DeleteIcon /> Delete this Broadcast
        </>
      ),
    },
    {
      _id: uuid(),
      color: "normal",
      item: (
        <>
          <EditIcon /> Edit this Broadcast
        </>
      ),
    },
  ],

  getNotLoggedUserBroadcastOptions: (username, isFollowed) =>
    isFollowed
      ? [
          {
            _id: "002",
            color: "normal",
            item: (
              <>
                <UnfollowAccountIcon /> Unfollow @{username}
              </>
            ),
          },
        ]
      : [
          {
            _id: "001",
            color: "normal",
            item: (
              <>
                <FollowAccountIcon /> Follow @{username}
              </>
            ),
          },
        ],
};
