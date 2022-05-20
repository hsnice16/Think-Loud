import { v4 as uuid } from "uuid";
import { noBroadcasts, noLikes, noReplies } from "assets";

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

  getEmptyTabDataToShow: (isProfileOfLoggedUser, selectedTab) => {
    const emptyTabData = {
      Broadcasts: {
        imgSrc: noBroadcasts,
        imgAlt: "no broadcasts",
        h1Text: isProfileOfLoggedUser
          ? "Something's going in your mind?"
          : "Not Broadcasted anything",
        h2Text: isProfileOfLoggedUser ? "Broadcast it" : "",
      },

      Likes: {
        imgSrc: noLikes,
        imgAlt: "no likes",
        h1Text: isProfileOfLoggedUser
          ? "You didn't like anything?"
          : "Not liked anything",
        h2Text: isProfileOfLoggedUser ? "Like today" : "",
      },

      Replies: {
        imgSrc: noReplies,
        imgAlt: "no replies",
        h1Text: isProfileOfLoggedUser
          ? "Not replied to anyone?"
          : "Not replied anything",
        h2Text: isProfileOfLoggedUser ? "Reply now" : "",
      },
    };

    return emptyTabData[selectedTab];
  },
};
