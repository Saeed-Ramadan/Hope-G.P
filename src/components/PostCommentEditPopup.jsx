// PostCommentEditPopup.js
import React, { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";

const PostCommentEditPopup = ({ comment, onUpdateComment, onClose }) => {
  const [updatedComment, setUpdatedComment] = useState(comment.content);

  const handleCommentChange = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleUpdateComment = () => {
    onUpdateComment(comment.id, updatedComment);
    onClose();
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "300px",
          height: "auto",
          borderRadius: "20px",
        },
      }}
      open
      onClose={onClose}
    >
      <TextField
        multiline
        value={updatedComment}
        onChange={handleCommentChange}
        fullWidth
        autoFocus
      />
      <Button
        sx={{
          fontSize: "20px",
          backgroundColor: "#2E74FD",
          color: "#000",
          fontWeight: "600",
        }}
        onClick={handleUpdateComment}
      >
        تعديل
      </Button>
    </Dialog>
  );
};

export default PostCommentEditPopup;
