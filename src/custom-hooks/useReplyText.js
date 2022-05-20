import { useState } from "react";
import { usePosts } from "context";
import { BROADCAST_MAX_CHARACTERS } from "utils";

/**
 * useReplyText - hook to handle text to reply
 * 
 * @param {Function} handleClose - function to close 
 *                                 the dialog box 
 * @returns an object having structure {
    status,
    replyText,
    setReplyText,
    handleReplyClick,
    handleReplyTextChange,
  }
 */
export const useReplyText = (handleClose = () => {}) => {
  const {
    posts: { status },
    postNewCommentCall,
  } = usePosts();
  const [replyText, setReplyText] = useState("");

  const handleReplyTextChange = (event) => {
    if (BROADCAST_MAX_CHARACTERS - event.target.value.length >= 0)
      setReplyText(event.target.value);
  };

  const handleReplyClick = (_id) => {
    if (replyText !== "") {
      handleClose();
      setReplyText("");
      postNewCommentCall(_id, { text: replyText });
    }
  };

  const value = {
    status,
    replyText,
    setReplyText,
    handleReplyClick,
    handleReplyTextChange,
  };

  return value;
};
