import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import axios from "axios";
import { useEffect, useState } from "react";

import UpadateComment from "../../assets/updateComment.png";
import deleteComment from "../../assets/deleteComent.png";

import {
  AddCommentToComment,
  DeleteComment,
  UpdateComment,
} from "../../apiRequests/apiRequest";

const PostCommentReplyPopup = ({ comment, onClose, token }) => {
  const [RelpyCommentValue, setReplyCommentValue] = useState("");
  const [replies, setReplies] = useState([]);
  const [commentCount, setCommentCount] = useState(comment.commentCount); // State to store the comment count

  useEffect(() => {
    // Fetch comment replies when the component mounts
    fetchReplies(comment.id);
  }, [comment.id]);

  //delete reply
  const handleDeleteReply = async (ReplyId) => {
    console.log("delete reply" + ReplyId);
    try {
      await axios.delete(`${DeleteComment}`, {
        data: {
          userId: "string",
          commentId: ReplyId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful deletion, fetch comments again
      console.log("successfully delete reply");
      fetchReplies(comment.id); // Fetch replies for the original comment
      setCommentCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const fetchReplies = async (postId) => {
    console.log("postId", postId);
    try {
      const response = await axios.get(
        `https://hope3221-001-site1.btempurl.com/api/Posts/GetReplies?id=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setReplies(response.data.data);
    } catch (error) {
      console.error("Error fetching comment replies:", error.message);
    }
  };

  const handleReplyCommentSubmit = async () => {
    try {
      const response = await axios.post(
        AddCommentToComment,
        {
          userId: "string", // Replace "string" with the actual userId
          commentId: comment.id, // Replace 0 with the actual commentId
          content: RelpyCommentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update comment count when a reply is added
      setCommentCount((prevCount) => prevCount + 1);

      fetchReplies(comment.id);
      setReplyCommentValue("");
      // Handle success
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const timeDifference = (timestamp) => {
    const now = new Date();
    const diff = Math.round((now - timestamp) / 1000 / 60); // Difference in minutes

    if (diff < 60) {
      // Less than 60 minutes, display in minutes
      return `${diff} دقيقة`;
    } else if (diff < 1440) {
      // Less than 24 hours, display in hours
      const hours = Math.floor(diff / 60);
      return `${hours} ساعة`;
    } else {
      // More than 24 hours, display in days
      const days = Math.floor(diff / 1440);
      return `${days} يوم`;
    }
  };

  const dateDifference = (timestamp) => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const day = timestamp.getDate();
    const month = months[timestamp.getMonth()];
    const year = timestamp.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  // State variables for managing edit popup
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editedReplyId, setEditedReplyId] = useState(null); // Store the id of the reply being edited
  const [editedReplyContent, setEditedReplyContent] = useState(""); // Store the content of the reply being edited

  const handleEditPopupOpen = (replyId, replyContent) => {
    setEditedReplyId(replyId); // Set the id of the reply being edited
    setEditedReplyContent(replyContent); // Set the content of the reply being edited
    setEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setEditPopupOpen(false);
  };

  const handleUpdateReply = async () => {
    try {
      await axios.put(
        `${UpdateComment}`,
        {
          userId: "string",
          commentId: editedReplyId, // Use the id of the reply being edited
          content: editedReplyContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReplies(comment.id);
      handleEditPopupClose();
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: { xs: "90%", lg: "600px" }, // يحدد العرض الأقصى للحجم على شاشات الهواتف والكمبيوترات اللوحية
          width: "100%", // تأكد من عرض العنصر يستغل العرض المتاح
          height: "auto", // ارتفاع مرن
          borderRadius: "30px",
          paddingBottom: "20px",
        },
      }}
      // PaperProps={{
      //   sx: {
      //     maxWidth: "none",
      //     width: "600px",
      //     height: "680px",
      //     borderRadius: "30px",
      //     paddingBottom: "20px",
      //   },
      // }}
      open={true}
      onClose={onClose}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "23px",
            fontWeight: "400",
            fontFamily: "defaultFont",
            color: "#2E74FD",
          }}
        >
          {/* Display updated comment count */}
          {commentCount} ردا علي التعليق
        </DialogTitle>
        <IconButton
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#EBEBEB",
          }}
          onClick={onClose}
        >
          <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box c>
          <Avatar
            sx={{ width: "50px", height: "50px" }}
            src={comment.userImage}
          />
          {/* Display selected comment data */}
          <Box>
            <Typography
              sx={{
                color: "#000",
                fontSize: "15px",
                fontWeight: "400",
                width: "450px",
              }}
              style={{ overflowWrap: "break-word" }}
            >
              {comment.content}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "#C1C1C1",
                  fontSize: "15px",
                  fontWeight: "700",
                  float: "right",
                }}
              >
                منذ {timeDifference(new Date(comment.date))}
              </Typography>
              <Typography
                sx={{
                  color: "#C1C1C1",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                {dateDifference(new Date(comment.date))}
              </Typography>
            </Box>
          </Box>
        </Box>
        <DialogContent>
          {/* Display comment replies */}
          {Array.isArray(replies) &&
            replies.map((reply) => (
              <Box key={reply.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    MaxWidth: "500px",
                  }}
                >
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "auto", borderColor: "#64656C" }}
                  />
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{
                      width: "40px",
                      borderColor: "#64656C",
                    }}
                  />
                  <Avatar
                    sx={{ width: "50px", height: "50px" }}
                    src={reply.userImage}
                  />
                  {/* Display selected comment data */}
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                  >
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "15px",
                        fontWeight: "400",
                        width: "250px",
                      }}
                      style={{ overflowWrap: "break-word" }}
                    >
                      {reply.content}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: "10px",
                        width: "110px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#C1C1C1",
                          fontSize: "15px",
                          fontWeight: "700",
                          // float: "right",
                        }}
                      >
                        منذ {timeDifference(new Date(reply.date))}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#C1C1C1",
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        {dateDifference(new Date(reply.date))}
                      </Typography>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#EBEBEB",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleEditPopupOpen(reply.id, reply.content)
                        }
                      >
                        <img src={UpadateComment} alt="UpadateComment" />
                      </Box>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#EBEBEB",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                        onClick={() => handleDeleteReply(reply.id)}
                      >
                        <img src={deleteComment} alt="deleteComment" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </DialogContent>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          placeholder="أضف ردا ....."
          value={RelpyCommentValue}
          onChange={(e) => setReplyCommentValue(e.target.value)}
          multiline // Enable multiline input
          rows={1} // Adjust the number of visible text lines as needed
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleReplyCommentSubmit}>
                  <Button
                    sx={{
                      height: "38px",
                      fontSize: "20px",
                      background: "#5D8AFF",
                      padding: "0 20px", // Adjusted padding to fit text
                      borderRadius: "20px",
                    }}
                    //   onClick={handleCommentSubmit}
                    variant="contained"
                  >
                    ارسل رد
                  </Button>
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: "auto", // Make the height flexible
              borderRadius: 8,
              width: { xs: "90%", sm: "575px" }, // Responsive width
              overflow: "hidden",
              border: "1px solid #9093FD", // Border style
            },
            "& .MuiInputBase-input": {
              padding: "10px",
              fontSize: { xs: "16px", sm: "20px" }, // Responsive font size
              fontWeight: "700",
            },
          }}
        />
      </Box>

      {/* Edit Popup */}
      <Dialog open={isEditPopupOpen} onClose={handleEditPopupClose}>
        <DialogTitle>تعديل الرد</DialogTitle>
        <DialogContent>
          <TextField
            value={editedReplyContent}
            onChange={(e) => setEditedReplyContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateReply} color="primary">
            تعديل
          </Button>
          <Button onClick={handleEditPopupClose} color="primary">
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default PostCommentReplyPopup;
