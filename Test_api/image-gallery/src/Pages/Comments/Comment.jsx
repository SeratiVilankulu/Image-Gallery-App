import React, { useState } from "react";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";
import CommentStyles from "./Comments.module.css";

const Comment = ({ imagesID, updateComment }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [newComment, setNewComment] = useState(""); // State for new comment input

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = localStorage.getItem("userName");
  const createdBy = userName;

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };
  const createComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5085/api/comment/${imagesID}`,
        {
          comment: newComment,
          createdBy: createdBy,
          ImageId: imagesID,
        },
        {
          headers: {
            Authorization: `Bearer ${user.verificationToken}`,
          },
        }
      );

      // Check if the response status is 200
      if (response.status === 200) {
        updateComments(response.data); // Pass the new comment data to the parent component
        setNewComment(""); // Clear the input field
        console.log(response.data);
      }
    } catch (error) {
      setErrorMsg({ api: "Posting comment failed. Please try again." });
      setTimeout(() => {
        setErrorMsg(false);
      }, 3500);
      console.error("Error posting comment:", error);
    }
  };
  return (
    <div className={CommentStyles.formGroup}>
      <input
        type="text"
        value={newComment}
        onChange={handleInputChange}
        placeholder="Click here to add comment"
        className={CommentStyles.addComment}
      />
      <button className={CommentStyles.sendCommentBtn} onClick={createComment}>
        <RiSendPlaneFill className={CommentStyles.sendIcon} />
      </button>
      <p className={CommentStyles.errorMessage}>{errorMsg.api}</p>
    </div>
  );
};
export default Comment;
