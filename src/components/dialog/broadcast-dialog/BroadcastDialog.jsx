import PropTypes from "prop-types";
import { usePostText } from "custom-hooks";

import {
  BroadcastDialogContent,
  BroadcastDialogActions,
  DialogActionsCloseIcon,
  BroadcastDialogContainer,
} from "components";

export const BroadcastDialog = ({
  postId,
  postContentText,
  openBroadcastDialog,
  setOpenBroadcastDialog,
}) => {
  const handleClose = () => {
    setOpenBroadcastDialog(false);
  };

  const {
    status,
    postText,
    handlePostTextChange,
    handleBroadcastClick,
    handleEditBroadcastClick,
  } = usePostText(postContentText, handleClose);

  return (
    <BroadcastDialogContainer
      handleClose={handleClose}
      openDialog={openBroadcastDialog}
    >
      <DialogActionsCloseIcon handleClose={handleClose} />

      <BroadcastDialogContent
        postText={postText}
        handlePostTextChange={handlePostTextChange}
      />

      <BroadcastDialogActions
        status={status}
        btnText="Broadcast"
        postText={postText}
        onClick={
          postId !== ""
            ? () => handleEditBroadcastClick(postId)
            : handleBroadcastClick
        }
      />
    </BroadcastDialogContainer>
  );
};

BroadcastDialog.propTypes = {
  postId: PropTypes.string,
  postContentText: PropTypes.string,
  openBroadcastDialog: PropTypes.bool,
  setOpenBroadcastDialog: PropTypes.func,
};

BroadcastDialog.defaultProps = {
  postId: "",
  postContentText: "",
  openBroadcastDialog: false,
  setOpenBroadcastDialog: () => {},
};
