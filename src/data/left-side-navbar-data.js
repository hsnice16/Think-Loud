import { v4 as uuid } from "uuid";

import {
  FilledBookmarkIcon,
  FilledHomeIcon,
  FilledProfileIcon,
  HashtagIcon,
  OutlinedBookmarkIcon,
  OutlinedHomeIcon,
  OutlinedProfileIcon,
  logoPNG,
} from "assets";
import {
  ROUTE_BOOKMARKS,
  ROUTE_EXPLORE,
  ROUTE_HOME,
  ROUTE_PROFILE,
} from "utils";

export const LeftSideNavbarData = {
  logoImg: {
    altText: "think loud logo",
    src: logoPNG,
  },

  links: [
    {
      _id: uuid(),
      link: {
        FilledIcon: (props) => <FilledHomeIcon {...props} />,
        OutlinedIcon: (props) => <OutlinedHomeIcon {...props} />,
        text: "Home",
        url: ROUTE_HOME,
      },
    },
    {
      _id: uuid(),
      link: {
        FilledIcon: (props) => <HashtagIcon {...props} />,
        OutlinedIcon: (props) => <HashtagIcon {...props} />,
        text: "Explore",
        url: ROUTE_EXPLORE,
      },
    },
    {
      _id: uuid(),
      link: {
        FilledIcon: (props) => <FilledBookmarkIcon {...props} />,
        OutlinedIcon: (props) => <OutlinedBookmarkIcon {...props} />,
        text: "Bookmarks",
        url: ROUTE_BOOKMARKS,
      },
    },
    {
      _id: uuid(),
      link: {
        FilledIcon: (props) => <FilledProfileIcon {...props} />,
        OutlinedIcon: (props) => <OutlinedProfileIcon {...props} />,
        text: "Profile",
        url: ROUTE_PROFILE,
      },
    },
  ],
};
