import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentStyles from "./Comments.module.css";
import Comment from "./Comment";

const Comments = ({ imageId, actions }) => {
  // State to store comments, the ID of the comment being edited
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(null); // Track which comment is being edited
  const [newCommentText, setNewCommentText] = useState(""); // Store the new comment text
  const [errorMsg, setErrorMsg] = useState(""); // Error message to display
  const [updateCommentID, setUpdateCommentID] = useState(null); // Track which comment is being updated

  // Function to fetch comments by imageId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5085/api/comment/image/${imageId}`
        );
        setComments(response.data);
        if (response.data.length === 0) {
          setErrorMsg(""); // Ensure no error message if there are no comments
        }
      } catch (error) {
        console.error("Cannot fetch comments from backend");
        setErrorMsg("Failed to load comments");
      }
    };

    fetchComments();
  }, [imageId]);

  // Update a specific comment
  const updateComment = async () => {
    if (updateCommentID === null || newCommentText === "") return; // Do nothing if no comment is being updated or no text provided

    try {
      await axios.patch(
        `http://localhost:5085/api/comment/${updateCommentID}`,
        {
          comment: newCommentText,
        }
      );

      // Update the comment in the local state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentID === updateCommentID
            ? { ...comment, comment: newCommentText }
            : comment
        )
      );
      setEditMode(null);
      setNewCommentText("");
      setUpdateCommentID(null);
    } catch (error) {
      console.error("Failed to update comment");
      setErrorMsg("Failed to update comment, try again.");
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5085/api/comment/${id}`);
      setComments(comments.filter((comment) => comment.commentID !== id)); //Identfy comment by ID and deleted comment from the local state
    } catch (error) {
      setErrorMsg("Deleting comment failed. Please try again.");
      setTimeout(() => setErrorMsg(""), 3500);
      console.error("Failed to delete comment");
    }
  };

  // Handle changes in the comment input field
  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  // Handle click on the "Update" button to start editing a comment
  const handleEditClick = (comment) => {
    setEditMode(comment.commentID); // Set the current comment as editable
    setNewCommentText(comment.comment); // Populate the input field with the updated comment
    setUpdateCommentID(comment.commentID); // Track the comment being updated
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditMode(null); // Exit edit mode
    setNewCommentText(""); // Clear the input field
    setUpdateCommentID(null); // Reset the comment being updated
  };

  return (
    <div className={CommentStyles.commentsWrapper}>
      <h3 className={CommentStyles.commentsTitle}>Comments:</h3>
      <div className={CommentStyles.commentsContainer}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className={CommentStyles.comments} key={comment.commentID}>
              <span className={CommentStyles.userName}>
                {comment.appUsers.userName} :
              </span>
              {editMode === comment.commentID ? (
                <div>
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={handleCommentChange}
                    className={CommentStyles.updateInput}
                  />
                  <button
                    className={CommentStyles.updateButton}
                    onClick={updateComment}
                  >
                    Save
                  </button>
                  <button
                    className={CommentStyles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className={CommentStyles.comment}>{comment.comment}</p>
              )}
              {actions && (
                <div className={CommentStyles.actions}>
                  <span
                    className={CommentStyles.deleteComment}
                    onClick={() => deleteComment(comment.commentID)}
                  >
                    delete
                  </span>
                  <span
                    className={CommentStyles.updateComment}
                    onClick={() => handleEditClick(comment)}
                  >
                    Update
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={CommentStyles.noComment}>
            This image has no comments yet. Be the first to comment!
          </p>
        )}
      </div>
      <Comment updateComment={updateComment} imagesID={imageId} />
      {errorMsg && <p className={CommentStyles.errorMessage}>{errorMsg}</p>}
    </div>
  );
};

export default Comments;
