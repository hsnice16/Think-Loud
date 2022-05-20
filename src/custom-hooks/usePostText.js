import { useState } from "react";
import { usePosts } from "context";
import { BROADCAST_MAX_CHARACTERS } from "utils";

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
  const {
    posts: { status },
    postNewBroadcastCall,
    postEditedBroadcastCall,
  } = usePosts();

  const handlePostTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setPostText(event.target.value);
  };

  const handleBroadcastClick = () => {
    if (postText !== "") {
      handleClose();
      setPostText("");
      postNewBroadcastCall({ content: postText });
    }
  };

  const handleEditBroadcastClick = (_id) => {
    if (postText !== "") {
      handleClose();
      setPostText("");
      postEditedBroadcastCall(_id, { content: postText });
    }
  };

  const value = {
    status,
    postText,
    setPostText,
    handleBroadcastClick,
    handlePostTextChange,
    handleEditBroadcastClick,
  };

  return value;
};
