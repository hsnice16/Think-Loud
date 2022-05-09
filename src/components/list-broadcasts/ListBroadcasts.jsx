import { BroadcastBox } from "components";
import { List, ListItem } from "@mui/material";

export const ListBroadcasts = () => {
  return (
    <List sx={{ padding: "0 0 2rem 0" }}>
      {/* just for design purpose */}
      {new Array(3).fill(0).map(() => (
        <ListItem sx={{ padding: 0 }}>
          <BroadcastBox />
        </ListItem>
      ))}
    </List>
  );
};
