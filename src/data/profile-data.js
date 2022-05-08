import { v4 as uuid } from "uuid";

export const ProfileData = {
  tabsOptions: [
    {
      _id: uuid(),
      value: "Broadcasts",
    },
    {
      _id: uuid(),
      value: "Likes",
    },
    {
      _id: uuid(),
      value: "Replies",
    },
  ],
};
