import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
    postText,
    handlePostTextChange,
    handleBroadcastClick,
    handleEditBroadcastClick,
  } = usePostText(postContentText, handleClose);

  const { newBroadcastStatus, editBroadcastStatus } = useSelector(
    (state) => state.posts
  );

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
        btnText="Broadcast"
        postText={postText}
        onClick={
          postId !== ""
            ? () => handleEditBroadcastClick(postId)
            : handleBroadcastClick
        }
        status={postId !== "" ? editBroadcastStatus : newBroadcastStatus}
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
