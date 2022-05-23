import { useState } from "react";
import { BROADCAST_MAX_CHARACTERS } from "utils";

import {
  usePostNewBroadcastCallMutation,
  usePostEditedBroadcastCallMutation,
} from "redux/api/postsAPI";

/**
 * usePostText - hook to handle text to post
 * 
 * @param {string} postContentText - text with which 
 *    to pre-fill the postText, in case of edit post
 * @param {Function} handleClose - function to close 
 *                                 the dialog box
 * @returns an object having structure {
    status,
    postText,
    setPostText,
    handleBroadcastClick,
    handlePostTextChange,
    handleEditBroadcastClick,
  }
 */
export const usePostText = (postContentText = "", handleClose = () => {}) => {
  const [postText, setPostText] = useState(postContentText);
  const [postNewBroadcastCall] = usePostNewBroadcastCallMutation();
  const [postEditedBroadcastCall] = usePostEditedBroadcastCallMutation();

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleBroadcastClick = async () => {
    if (postText !== "") {
      await postNewBroadcastCall({ content: postText });
      setPostText("");
      handleClose();
    }
  };

  const handleEditBroadcastClick = async (_id) => {
    if (postText !== "") {
      await postEditedBroadcastCall({
        postId: _id,
        postData: { content: postText },
      });
      setPostText("");
      handleClose();
    }
  };

  const value = {
    postText,
    setPostText,
    handleBroadcastClick,
    handlePostTextChange,
    handleEditBroadcastClick,
  };

  return value;
};
