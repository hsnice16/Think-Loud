import { useState } from "react";
import PropTypes from "prop-types";
import { BROADCAST_MAX_CHARACTERS } from "utils";

import {
  BroadcastDialogActions,
  BroadcastDialogContainer,
  BroadcastDialogContent,
  DialogActionsCloseIcon,
} from "components";

export const BroadcastDialog = ({
  openBroadcastDialog,
  setOpenBroadcastDialog,
}) => {
  const [postText, setPostText] = useState("");

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleClose = () => {
    setOpenBroadcastDialog(false);
  };

  return (
    <BroadcastDialogContainer
      openDialog={openBroadcastDialog}
      handleClose={handleClose}
    >
      <DialogActionsCloseIcon handleClose={handleClose} />

      <BroadcastDialogContent
        postText={postText}
        handlePostTextChange={handlePostTextChange}
      />

      <BroadcastDialogActions postText={postText} btnText="Broadcast" />
    </BroadcastDialogContainer>
  );
};

BroadcastDialog.propTypes = {
  openBroadcastDialog: PropTypes.bool,
  setOpenBroadcastDialog: PropTypes.func,
};

BroadcastDialog.defaultProps = {
  openBroadcastDialog: false,
  setOpenBroadcastDialog: () => {},
};
