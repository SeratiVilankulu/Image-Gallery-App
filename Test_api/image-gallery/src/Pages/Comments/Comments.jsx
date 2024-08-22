import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentStyles from "./Comments.module.css";

const Comments = ({ imageId }) => {
  const [comments, setComments] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  // Function to fetch comments by imageId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5085/api/comment/image/${imageId}`
        );
        setComments(response.data);
        console.log(response);
      } catch (error) {
        console.error("Cannot fetch comments from backend");
        setError("Failed to load comments");
      }
    };

    fetchComments();
  }, [imageId]);

  const updateComment = async (id) => {
    try {
      await axios.put(`http://localhost:5085/api/comment/${id}`);
    } catch (error) {
      console.error("");
      setError({ api: "Failed to update comment, try again" });
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5085/api/comment/${id}`);
      setComments(comments.filter((comment) => comment.commentID !== id));
    } catch (error) {
      setErrorMsg({ api: "Deleting comment failed. Please try again." });
      setTimeout(() => {
        setErrorMsg(false);
      }, 3500);
      console.error("Failed to delete comment");
    }
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
              <p className={CommentStyles.comment}>{comment.comment}</p>
              <div className={CommentStyles.actions}>
                <span
                  className={CommentStyles.deleteComment}
                  onClick={() => deleteComment(comment.commentID)}
                >
                  delete
                </span>
                <span className={CommentStyles.updateComment}>Update</span>
              </div>
            </div>
          ))
        ) : (
          <p className={CommentStyles.noComment}>
            This image has no comments yet. Be the first to comment!
          </p>
        )}
      </div>
      <p className={CommentStyles.errorMessage}>{errorMsg.api}</p>
    </div>
  );
};

export default Comments;
