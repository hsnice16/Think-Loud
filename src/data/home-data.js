import { v4 as uuid } from "uuid";
import { FilledHeartIcon, LatestIcon, GoBackIcon } from "assets";

export const HomeData = {
  menuOptions: [
    {
      _id: uuid(),
      color: "error",
      h1Text: "Most Liked Broadcasts",
      item: (
        <>
          <FilledHeartIcon /> See most liked Broadcasts instead
        </>
      ),
    },
    {
      _id: uuid(),
      color: "warning",
      h1Text: "Latest Broadcasts",
      item: (
        <>
          <LatestIcon /> See latest Broadcasts instead
        </>
      ),
    },
    {
      _id: uuid(),
      color: "normal",
      h1Text: "Home",
      item: (
        <>
          <GoBackIcon /> Go back Home
        </>
      ),
    },
  ],
};
