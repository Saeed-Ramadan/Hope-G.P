import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PostCommentReplyPopup from "./PostCommentReplyPopup";
import defaultLostPersonImage from "../../assets/person-not-found-default.png";
import defaultUserImage from "../../assets/userDefaultImage.png";
import PhoneImage from "../../assets/phoneDetails.png";
import commentBtn from "../../assets/comment-btn.png";
import commentNumber from "../../assets/numofcomments.png";
import UpadateComment from "../../assets/updateComment.png";
import deleteComment from "../../assets/deleteComent.png";
import PostCommentEditPopup from "../PostCommentEditPopup";

import {
  AddCommentToPost,
  GetCommentsByPostId,
  DeleteComment,
  UpdateComment,
} from "../../apiRequests/apiRequest";

const PostDetails = ({ post, onClose, token, setSelectedPost }) => {
  const imageUrl = post.imageUrl || defaultLostPersonImage;
  const userImage = post.userImage || defaultUserImage;

  const [comment, setComment] = useState(""); // State to hold the comment text
  const [commentsDetails, setCommentsDetails] = useState([]); // State to hold comments fetched from API
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false); // State to control the dialog visibility
  const [selectedComment, setSelectedComment] = useState(null); // State to hold the selected comment data
  const [openReplyPopup, setOpenReplyPopup] = useState(false); // State to control the reply popup visibility
  const [openEditPopup, setOpenEditPopup] = useState(false); //state to open update comment popup

  // Function to handle click event on "رد على التعليق"
  const handleReplyClick = (comment) => {
    setSelectedComment(comment);
    setOpenReplyPopup(true);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const postId = post.id;
  const isPeople = post.isPeople;

  const handleCommentSubmit = async () => {
    try {
      // Send the comment data to the API
      await axios.post(
        AddCommentToPost,
        {
          userId: "string",
          content: comment,
          postId: postId, // You might need to adjust this depending on where you get the postId from
          isPeople: isPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the comment count in the post object
      setSelectedPost((prevPostDetails) => ({
        ...prevPostDetails,
        commentCount: prevPostDetails.commentCount + 1,
      }));

      // Reload comments after submission
      fetchComments();

      // Clear the comment input field after submission
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  //fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${GetCommentsByPostId}`, {
        params: {
          PostId: postId,
          IsPeople: isPeople,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization token in headers
        },
      });
      // console.log("comment token", token);
      // console.log("Comments response:", response.data.data);
      setCommentsDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentIconClick = () => {
    setOpenCommentsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenCommentsDialog(false);
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

  //delete comment
  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
    try {
      await axios.delete(`${DeleteComment}`, {
        data: {
          userId: "string",
          commentId: commentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful deletion, fetch comments again
      console.log("successfully");
      setSelectedPost((prevPostDetails) => ({
        ...prevPostDetails,
        commentCount: prevPostDetails.commentCount - 1,
      }));
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  //edit comment
  const handleEditComment = (comment) => {
    setSelectedComment(comment);
    setOpenEditPopup(true);
  };

  const handleUpdateComment = (commentId, updatedContent) => {
    // Send updated comment to API
    // Example code to send request to API

    axios
      .put(
        `${UpdateComment}`,
        {
          userId: "string",
          commentId: commentId,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle response
        console.log("Comment updated successfully:", response.data);
        fetchComments();
        // You may want to fetch comments again after updating
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });

    // For demonstration purposes, log the updated comment
    // console.log("Updated comment content:", updatedContent);
  };

  // Conditional rendering based on post.condition
  const renderDetails = () => {
    if (!post.condition) {
      return (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.6)",

              zIndex: 998,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: 5,
              zIndex: 999,
              width: { xs: "90%", xl: "1628px" },
              height: { xs: "auto", xl: "900px" },
              display: "flex",
              flexDirection: { xs: "column", xl: "row" },
              flexWrap: "wrap",
              overflowY: { xs: "auto", xl: "hidden" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", xl: "50%" },
                overflow: "hidden",
                padding: { xs: "20px", xl: "40px 40px 0px 0px" },
                marginBottom: { xs: "20px", xl: "40px" },
              }}
            >
              <Box>
                <Box
                  sx={{
                    padding: "0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ padding: "0", display: "flex" }}>
                    <Box
                      component="img"
                      src={userImage}
                      alt="PostedPerson"
                      sx={{
                        marginRight: 0,
                        marginLeft: "15px",
                        width: { xs: "50px", sm: "60px", md: "75px" },
                        height: { xs: "50px", sm: "60px", md: "75px" },
                        borderRadius: "50%",
                      }}
                    />
                    <Box sx={{ marginTop: "20px" }}>
                      <span
                        style={{
                          marginRight: "30px",
                          fontSize: { xs: "18px", lg: "25px" },
                          color: "#373B55",
                        }}
                      >
                        {post.userName}
                      </span>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "10px",
                      marginLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={handleCommentIconClick}
                  >
                    <img
                      src={commentNumber}
                      alt="commentNumber"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "15px",
                        fontSize: "24px",
                        color: "#FFFFFF",
                        fontFamily: "defaultFont",
                        fontWeight: "400",
                      }}
                    >
                      {post.commentCount}
                    </span>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: { xs: "auto", xl: "500px" },
                  maxHeight: { xs: "230px", xl: "500px" },
                  border: "1px solid #9093FD",
                  borderRadius: "25px",
                  margin: { xs: "20px 0", lg: "50px 0" },
                  padding: "30px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "18px", lg: "25px" },
                    fontWeight: "400",
                  }}
                >
                  <span style={{ color: "#9093FD" }}>النوع: </span>
                  {post.type}
                </Typography>
                <hr
                  style={{
                    margin: "25px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "18px", lg: "25px" },
                    fontWeight: "400",
                  }}
                >
                  <span style={{ color: "#9093FD" }}>المحافظة: </span>
                  {post.city}
                </Typography>
                <hr
                  style={{
                    margin: "25px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "18px", lg: "25px" },
                    fontWeight: "400",
                  }}
                >
                  <span style={{ color: "#9093FD" }}>المدينة: </span>
                  {post.town}
                </Typography>
                <hr
                  style={{
                    margin: "25px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "18px", lg: "25px" },
                    fontWeight: "400",
                  }}
                >
                  <span style={{ color: "#9093FD" }}>المواصفات: </span>
                  {post.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  margin: "-20px 50px 30px 50px",
                  gap: "20px",
                }}
              >
                <img src={PhoneImage} alt="phone icon" />{" "}
                <Typography
                  sx={{
                    fontSize: { xs: "18px", lg: "25px" },
                    fontWeight: "400",
                  }}
                >
                  {post.phoneNumber}
                </Typography>
              </Box>
              <Box
                sx={{
                  margin: { xs: "10px 10px", sm: "10px 20px", md: "30px 50px" },
                }}
              >
                <TextField
                  placeholder="أضف تعليقا ....."
                  value={comment}
                  onChange={handleCommentChange}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleCommentSubmit}>
                          <img
                            src={commentBtn}
                            alt="comment btn"
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: "48px", sm: "56px", md: "64px" },
                      borderRadius: 8,
                      width: { xs: "100%", sm: "500px", md: "686px" },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 16, sm: 20, md: 25 },
                      fontWeight: "700",
                    },
                  }}
                />
                <Box
                  sx={{
                    borderBottom: "1px solid #E1E1E1",
                    width: { xs: "100%", sm: "200px", md: "167px" },
                    height: "35px",
                    marginTop: "15px",
                    marginRight: { xs: "0", sm: "10px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "defaultFont",
                      fontSize: { xs: 12, sm: 14, md: 15 },
                      fontWeight: "700",
                      color: "#C1C1C1",
                    }}
                  >
                    {post.commentCount} تعليقا علي المنشور
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", xl: "50%" },
                // height: { xs: "500px", xl: "auto" },
                maxHeight: { xs: "230px", xl: "100%" },
                position: "relative",
                overflowX: "auto",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  background: "#EBEBEB",
                  textAlign: "center",
                  padding: "2px",
                  position: "absolute",
                  top: "25px",
                  left: "25px",
                  zIndex: "1000",
                }}
              >
                <IconButton onClick={onClose}>
                  <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageUrl}
                  alt="lost image"
                  style={{ width: "100%", height: { xs: "300px", lg: "auto" } }}
                />
              </Box>
            </Box>
          </Box>

          {/* Popup Dialog for Comments */}

          <Dialog
            PaperProps={{
              sx: {
                maxWidth: "none",
                width: { xs: "500px", md: "800px", xl: "950px" },
                height: "979px",
                borderRadius: "30px",
                paddingBottom: "140px",
              },
            }}
            open={openCommentsDialog}
            onClose={handleCloseDialog}
          >
            <Box
              sx={{
                position: "absolute",
                top: { xs: "78%", xl: "83%" },
                left: "6.5%",
                width: { xs: "400px", md: "700px", xl: "830px" },

                height: "150px",
                borderRadius: "20px",
                border: "1px solid #9093FD",
                padding: "20px 10px 10px 10px",
                backgroundColor: "#fff",
                zIndex: "999",
              }}
            >
              <TextField
                placeholder="أضف تعليقا ....."
                variant="standard"
                value={comment}
                onChange={handleCommentChange}
                multiline
                rows={2}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "60px",
                    width: { xs: "380px", md: "680px", xl: "800px" },
                    border: "none !important",
                    marginBottom: "20px",
                    overflow: "hidden",
                  },
                  "& .MuiInputBase-input": {
                    padding: "20px",
                    fontSize: 20,
                    fontWeight: "700",
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "space-between" },
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: { xs: "wrap", md: "nowrap" },
                }}
              >
                <Button
                  sx={{
                    height: { xs: "16px", md: "20px", xl: "38px" },
                    fontSize: { xs: "14px", md: "18px", xl: "20px" },
                    background: "#5D8AFF",
                    padding: {
                      xs: "20px 20px",
                      xl: "20px 30px",
                    },
                    borderRadius: "20px",
                    order: { xs: 2, md: 1 },
                  }}
                  onClick={handleCommentSubmit}
                  variant="contained"
                >
                  ارسال الى
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#B7B6BE",
                      fontWeight: "400",
                    }}
                  >
                    {post.userName}
                  </Typography>
                  <img
                    src={post.userImage}
                    alt="PostedPerson"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Box>
            </Box>
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
                التعليقات
              </DialogTitle>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#EBEBEB",
                }}
                onClick={handleCloseDialog}
              >
                <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
              </IconButton>
            </Box>
            <DialogContent>
              {Array.isArray(commentsDetails) &&
                commentsDetails.map((comment) => (
                  <List key={comment.id}>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ListItemAvatar
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <Avatar
                          sx={{ width: "75px", height: "75px" }}
                          src={comment.userImage}
                        />
                        <Box>
                          <Typography
                            sx={{
                              color: "#373B55",
                              fontSize: "15px",
                              fontWeight: "700",
                              marginTop: "15px",
                            }}
                          >
                            {comment.displayName}
                          </Typography>
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
                        </Box>
                      </ListItemAvatar>
                      <Typography
                        sx={{
                          color: "#C1C1C1",
                          fontSize: "15px",
                          fontWeight: "700",
                          marginTop: "25px",
                        }}
                      >
                        {dateDifference(new Date(comment.date))}
                      </Typography>
                    </ListItem>
                    <Box
                      sx={{
                        padding: "20px 40px",
                        // overflowX: "hidden",
                        // whiteSpace: "pre-wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "15px",
                          fontWeight: "400",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      >
                        {comment.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#C1C1C1",
                            fontSize: "15px",
                            fontWeight: "700",
                          }}
                        >
                          {comment.commentCount} ردا علي التعليق
                        </Typography>
                        <Typography
                          onClick={() => handleReplyClick(comment)}
                          sx={{
                            color: "#2E74FD",
                            fontSize: "15px",
                            fontWeight: "400",
                            cursor: "pointer",
                          }}
                        >
                          رد علي التعليق
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                          gap: "50px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#EBEBEB",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditComment(comment)}
                        >
                          <img src={UpadateComment} alt="UpadateComment" />
                        </Box>

                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#EBEBEB",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <img src={deleteComment} alt="deleteComment" />
                        </Box>
                      </Box>
                    </Box>
                    <hr style={{ margin: "5px -15px" }} />
                  </List>
                ))}
            </DialogContent>
          </Dialog>
          {/* edit comment popup */}
          {openEditPopup && (
            <PostCommentEditPopup
              comment={selectedComment}
              onUpdateComment={handleUpdateComment}
              onClose={() => setOpenEditPopup(false)}
            />
          )}
        </>
      );
    }

    // Default rendering when post.condition is not null
    return (
      <>
    <Box sx={{position:"relative"}}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "#fff",
            borderRadius: 8,
            boxShadow: 5,
            zIndex: 999,
            width: { xs: "98%",md:"60%",xl: "1628px" },
            height: { xs: "98%",md:"90%",  xl: "1000px" },
            display: "flex",
            flexDirection: { md: "row" },
            justifyContent:"space-between",
            flexWrap: "wrap",
            // overflow: "hidden",
            overflowY:{xs:"auto",md:"visible"}
          }}
        >
          <Box
            sx={{
              width: { xs: "100%",md:"50%", xl: "50%" },
              // overflow: "hidden",
              padding: { xs: "20px",md: "10px", xl: "40px 40px 0px 40px" },
              marginBottom: { xs: "10px", xl: "40px" },
            }}
          >
            <Box>
              <Box
                sx={{
                  padding: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:"center",
                }}
              >
                <Box sx={{ padding: "0", display: "flex",justifyContent:"center",alignItems:"center" }}>
                  <Box
                    component="img"
                    src={userImage}
                    alt="PostedPerson"
                    sx={{
                      marginRight: 0,
                      marginLeft: {md:"0",xl:"15px"},
                      width: { xs: "50px", sm: "30px", md: "50px" ,xl:"75px"},
                      height: { xs: "50px", sm: "30px", md: "50px",xl:"75px"},
                      borderRadius: "50%",
                    }}
                  ></Box>
                  <Box >
                    <span
                      style={{
                        marginRight: {md:"0px",xl:"30px"},
                        fontSize: { xs: "18px", lg: "25px" },
                        color: "#373B55",
                      }}
                    >
                      {post.userName}
                    </span>
                  </Box>
                </Box>
                <Box
              sx={{
               
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                background: "#EBEBEB",
              
                padding: "2px",
             
                zIndex: "1000",
             display:{xs:"block",md:"none"}  

              }}
            >
              <Box >
              <IconButton onClick={onClose}>
                <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
              </IconButton>
              </Box>
             
             
               </Box>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    // marginTop: "10px",
                    // marginLeft: "30px",
                    cursor: "pointer",
                    display:{xs:"none",md:"block"}
                  }}
                  onClick={handleCommentIconClick}
                >
                  <img
                    src={commentNumber}
                    alt="commentNumber"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "15px",
                      fontSize: "24px",
                      color: "#FFFFFF",
                      fontFamily: "defaultFont",
                      fontWeight: "400",
                    }}
                  >
                    {post.commentCount}
                  </span>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop:"20px",
                height: {xs:"auto",md:"100%"},
                borderRadius: "8px",
                overflow: "hidden",
               display:{xs:"block",md:"none"},
               position:"relative"
              }}
            >
              <Box
              component="img"
               
                src={imageUrl}
                alt="lost image"
                sx={{ width: "100%", height: { xs: "auto",md:"100%", } }}
              ></Box>
                <Box
                  sx={{
                    position: "absolute",
                    top:"2%",
                    right:"2%",

                    display: "inline-block",
                    // marginTop: "10px",
                    // marginLeft: "30px",
                    cursor: "pointer",
                    display:{xs:"block",md:"none"}
                  }}
                  onClick={handleCommentIconClick}
                >
                  <img
                    src={commentNumber}
                    alt="commentNumber"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "15px",
                      fontSize: "24px",
                      color: "#FFFFFF",
                      fontFamily: "defaultFont",
                      fontWeight: "400",
                    }}
                  >
                    {post.commentCount}
                  </span>
                </Box>
            </Box>
            <Box
              sx={{
                width: {xs:"98%",md:"100%"},
                height: { xs: "600px",md:"600px", xl: "600px" },
                maxHeight: { xs: "380px",md:"270px", xl: "600px" },
                border: "1px solid #9093FD",
                borderRadius: "25px",
                margin: { xs: "20px 0",md:"0px 0", xl: "50px 0" },
                padding: {xs:"10px 10px",md:"10px 30px",xl:"30px"},
                
              }}
            >
              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>إسم المفقود : </span>
                {post.name}
              </Typography>
              <Divider
                sx={{
                  margin: {xs:"25px 0px",md:"10px -20px",xl:"25px -30px"},
                  backgroundColor: "rgb(216 216 216 / 60%)",
                  height: "0.5px",
                }}
              ></Divider>
              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>نوع المفقود : </span>
                {post.condition === "Losties"
                  ? "تائه"
                  : post.condition === "Accidents"
                  ? "حوادث"
                  : post.condition === "Shelters"
                  ? "ملاجئ"
                  : post.condition}
              </Typography>
              <Divider
                sx={{
                  margin: {xs:"25px 0px",md:"10px -20px",xl:"25px -30px"},
                  backgroundColor: "rgb(216 216 216 / 60%)",
                }}
              ></Divider>

              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>عمر المفقود : </span>
                {post.age} عاما
              </Typography>
              <Divider
                sx={{
                  margin: {xs:"25px 0px",md:"10px -20px",xl:"25px -30px"},
                  backgroundColor: "rgb(216 216 216 / 60%)",
                }}
              ></Divider>
              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>النوع : </span>
                {post.gendre}
              </Typography>
              <Divider
                sx={{
                  margin: {xs:"25px 0px",md:"10px -20px",xl:"25px -30px"},
                  backgroundColor: "rgb(216 216 216 / 60%)",
                }}
              ></Divider>
              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>المدينة : </span>
                {post.city}
              </Typography>
              <Divider
                sx={{
                  margin: {xs:"25px 0px",md:"10px -20px",xl:"25px -30px"},
                  backgroundColor: "rgb(216 216 216 / 60%)",
                }}
              ></Divider>
              <Typography
                sx={{ fontSize: { xs: "12px",md:"15px", xl: "25px" }, fontWeight: "400" }}
              >
                <span style={{ color: "#9093FD" }}>المواصفات : </span>

                {post.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                margin: {xs:"20px 50px 30px 50px",md:"10px 0 0px 0",xl:"-20px 50px 30px 50px"},
                gap: {xs:"20px",md:"0",xl:"20px"},
              }}
            >
              <img src={PhoneImage} alt="phone icon" />{" "}
              <Typography
                sx={{ fontSize: { xs: "18px",md:"12px", lg: "25px" }, fontWeight: "400" }}
              >
                {post.phoneNumber}
              </Typography>
            </Box>
            <Box
              sx={{
                margin: {
                  xs: "20px 10px",
                  sm: "20px 20px",
                  md: "5px 0px",
                  xl: "30px 50px",
                },
              }}
            >
              <TextField
                placeholder="أضف تعليقا ....."
                value={comment}
                onChange={handleCommentChange}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentSubmit}>
                        <img
                          src={commentBtn}
                          alt="comment btn"
                          style={{
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    height: { xs: "48px", sm: "56px", md: "64px" },
                    borderRadius: 8,
                    width: { xs: "100%", sm: "500px", md: "100%",xl:"686px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: 3,
                    fontSize: { xs: 16, sm: 20, md: 15,xl:25 },
                    fontWeight: "700",
                  },
                }}
              />
              <Box
                sx={{
                  borderBottom: "1px solid #E1E1E1",
                  width: { xs: "100%", sm: "200px", md: "167px" },
                  height: "35px",
                  marginTop: "15px",
                  marginRight: { xs: "0", sm: "10px" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "defaultFont",
                    fontSize: { xs: 12, sm: 14, md: 15 },
                    fontWeight: "700",
                    color: "#C1C1C1",
                  }}
                >
                  {post.commentCount} تعليقا علي المنشور
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: "100%",md:"50%", xl: "50%" },
              // height: { xs: "500px", xl: "auto" },
              height: { xs: "300px",md:"100%", xl: "100%" },
              // height:"100px",
              // position: "relative",
              // overflowX: "auto",
              padding:{xs:"20px",md:"0",xl:"0"},
              display:{xs:"none",md:"block"}
            }}
          >
            <Box
              sx={{
               
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                background: "#EBEBEB",
                textAlign: "center",
                padding: "2px",
               position:"absolute",
               left:0,
               top:0,
                zIndex: "1000",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box >
              <IconButton onClick={onClose}>
                <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
              </IconButton>
              </Box>
             
             
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                overflow: "hidden",
               
              }}
            >
              <Box
              component="img"
             
                src={imageUrl}
                alt="lost image"
                sx={{ width: "100%", height: { xs: "300px",md:"100%", } }}
              ></Box>
            </Box>
          </Box>
        </Box>
    </Box>
       
       
        {/* Popup Dialog for Comments */}

        <Dialog
          PaperProps={{
            sx: {
              maxWidth: "none",
              width: { xs: "500px", md: "800px", xl: "950px" },
              height: "979px",
              borderRadius: "30px",
              paddingBottom: "140px",
            },
          }}
          open={openCommentsDialog}
          onClose={handleCloseDialog}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "78%", xl: "83%" },
              left: "6.5%",
              width: { xs: "400px", md: "700px", xl: "830px" },

              height: "150px",
              borderRadius: "20px",
              border: "1px solid #9093FD",
              padding: "20px 10px 10px 10px",
              backgroundColor: "#fff",
              zIndex: "999",
            }}
          >
            <TextField
              placeholder="أضف تعليقا ....."
              variant="standard"
              value={comment}
              onChange={handleCommentChange}
              multiline
              rows={2}
              sx={{
                "& .MuiInputBase-root": {
                  height: "60px",
                  width: { xs: "380px", md: "680px", xl: "800px" },
                  border: "none !important",
                  marginBottom: "20px",
                  overflow: "hidden",
                },
                "& .MuiInputBase-input": {
                  padding: "20px",
                  fontSize: 20,
                  fontWeight: "700",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "space-between" },
                alignItems: "center",
                gap: "20px",
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              <Button
                sx={{
                  height: { xs: "16px", md: "20px", xl: "38px" },
                  fontSize: { xs: "14px", md: "18px", xl: "20px" },
                  background: "#5D8AFF",
                  padding: {
                    xs: "20px 20px",
                    xl: "20px 30px",
                  },
                  borderRadius: "20px",
                  order: { xs: 2, md: 1 },
                }}
                onClick={handleCommentSubmit}
                variant="contained"
              >
                ارسال الى
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#B7B6BE",
                    fontWeight: "400",
                  }}
                >
                  {post.userName}
                </Typography>
                <img
                  src={post.userImage}
                  alt="PostedPerson"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            </Box>
          </Box>
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
              التعليقات
            </DialogTitle>
            <IconButton
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#EBEBEB",
              }}
              onClick={handleCloseDialog}
            >
              <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
            </IconButton>
          </Box>
          <DialogContent>
            {Array.isArray(commentsDetails) &&
              commentsDetails.map((comment) => (
                <List key={comment.id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <Avatar
                        sx={{ width: "75px", height: "75px" }}
                        src={comment.userImage}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "#373B55",
                            fontSize: "15px",
                            fontWeight: "700",
                            marginTop: "15px",
                          }}
                        >
                          {comment.displayName}
                        </Typography>
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
                      </Box>
                    </ListItemAvatar>
                    <Typography
                      sx={{
                        color: "#C1C1C1",
                        fontSize: "15px",
                        fontWeight: "700",
                        marginTop: "25px",
                      }}
                    >
                      {dateDifference(new Date(comment.date))}
                    </Typography>
                  </ListItem>
                  <Box
                    sx={{
                      padding: "20px 40px",
                      // overflowX: "hidden",
                      // whiteSpace: "pre-wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "15px",
                        fontWeight: "400",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {comment.content}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#C1C1C1",
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        {comment.commentCount} ردا علي التعليق
                      </Typography>
                      <Typography
                        onClick={() => handleReplyClick(comment)}
                        sx={{
                          color: "#2E74FD",
                          fontSize: "15px",
                          fontWeight: "400",
                          cursor: "pointer",
                        }}
                      >
                        رد علي التعليق
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        gap: "50px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#EBEBEB",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditComment(comment)}
                      >
                        <img src={UpadateComment} alt="UpadateComment" />
                      </Box>

                      <Box
                        sx={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#EBEBEB",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <img src={deleteComment} alt="deleteComment" />
                      </Box>
                    </Box>
                  </Box>
                  <hr style={{ margin: "5px -15px" }} />
                </List>
              ))}
          </DialogContent>
        </Dialog>
        {/* edit comment popup */}
        {openEditPopup && (
          <PostCommentEditPopup
            comment={selectedComment}
            onUpdateComment={handleUpdateComment}
            onClose={() => setOpenEditPopup(false)}
          />
        )}
      </>
    );
  };

  return (
    <>
      {/* Rest of your component */}
      {renderDetails()}
      {/* Popup for replying to comments */}
      {openReplyPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <PostCommentReplyPopup
            token={token}
            comment={selectedComment}
            onClose={() => setOpenReplyPopup(false)}
          />
        </div>
      )}
    </>
  );
};
export default PostDetails;
