import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UserProfileNavigation from "./UserProfileNavigation";
import axios from "axios";
import Cookie from "cookie-universal";

import pushIcon from "../../assets/pin icon.png";
import pined from "../../assets/pined.png";
import PostDetails from "../home-page-components/PostDetails";
import UserProfileEditPosts from "./UserProfileEditPosts";
import { Link } from "react-router-dom";
import userProfile from "../../assets/user profile.png";
import {
  DeletePostUser,
  GetPostsByUserId,
  GetPinnedPostsByUserId,
} from "../../apiRequests/apiRequest";

function UserProfilePosts() {
  // State to keep track of the active section
  const [activeSection, setActiveSection] = useState("createdPosts");
  //posts logic
  //fetch all data state
  const [apiAllProfilePosts, setApiAllProfilePosts] = useState([]);
  const [apiAllProfilePinedPosts, setApiAllProfilePinedPosts] = useState([]);
  const [selectedPinedPost, setSelectedPinedPost] = useState(null);

  //selected post state to show details
  const [selectedPost, setSelectedPost] = useState(null);

  const [postsLoading, setPostsLoading] = useState(true);
  // State to manage the visibility of the delete confirmation popup
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  // State to keep track of the post to be deleted
  const [postToDelete, setPostToDelete] = useState(null);

  const [isPinned, setIsPinned] = useState(false);

  const cookies = Cookie();
  const token = cookies.get("Cookie");

  //set data to selected
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };

  //fetch all data
  const handleFetchProfilePosts = async () => {
    try {
      const response = await axios.get(`${GetPostsByUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data.data;
      // Set the state with the new data fetched from the API
      setApiAllProfilePosts(responseData);
      setPostsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //fetch all data
  const handleFetchProfilePinedPosts = async () => {
    try {
      const response = await axios.get(`${GetPinnedPostsByUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data.data;

      // Set the state with the new data fetched from the API
      setApiAllProfilePinedPosts(responseData);
      setPostsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePinedButtonClick = (pinedPostData) => {
    setSelectedPinedPost(pinedPostData); // Set the selected post data
  };

  useEffect(() => {
    handleFetchProfilePosts();
    handleFetchProfilePinedPosts();
  }, []); // Call the function once when component mounts

  const handleDeleteButtonClick = (postData) => {
    setPostToDelete(postData);
    setSelectedPost(postData); // Set the selected post data
    setDeleteConfirmationOpen(true); // Open the delete confirmation dialog
  };

  // Function to handle clicks on the post body
  const handleBodyClick = (event) => {
    // Prevent the event from bubbling up to the parent Card component
    event.stopPropagation();
    // Call the onClick function passed from the parent component
  };

  // Function to handle deletion of a post
  const handleDeletePost = async () => {
    try {
      // Make a DELETE request to the API endpoint
      await axios.delete(`${DeletePostUser}`, {
        data: {
          userId: selectedPost.userId, // Provide the userId
          postId: selectedPost.id, // Use selectedPost.id instead of postData.id
          isPeople: selectedPost.isPeople,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state to remove the deleted post from the list
      setApiAllProfilePosts(
        (prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id) // Use selectedPost.id instead of postData.id
      );
      console.log("تم الحذف يا معلم !");
      // After deletion, close the confirmation dialog
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const togglePinPost = async (postData) => {
    try {
      const pinStatus = postData.isPinned ? "PinPost" : "UnPinPost";
      await axios.post(
        `https://hope3221-001-site1.btempurl.com/api/Posts/${pinStatus}`,
        {
          userId: postData.userId,
          postId: postData.id,
          IsPeople: postData.isPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the state for the specific post to reflect the pin/unpin action
      setApiAllProfilePinedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postData.id ? { ...post, isPinned: !post.isPinned } : post
        )
      );
      // Reload the page after successfully unpinning the post
      window.location.reload();
    } catch (error) {
      console.error("Error pinning/unpinning post:", error);
    }
  };

  // Define separate state variables for managing the visibility of PostDetails and UserProfileEditPosts
  const [postDetailsOpen, setPostDetailsOpen] = useState(false);
  const [editPostOpen, setEditPostOpen] = useState(false);

  // Function to handle clicks on the تعديل button
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setEditPostOpen(true); // Show the UserProfileEditPosts component
    setPostDetailsOpen(false); // Close the PostDetails component
  };

  // Function to close the UserProfileEditPosts component
  const handleCloseEditPost = () => {
    setEditPostOpen(false);
  };
  const profile = localStorage.getItem("avater");
  return (
    <Grid
      container
      className="grid"
      sx={{
        position: "relative",
        background: { xs: "#fff", md: "#c1c1c147" },
        padding: { md: "50px 50px 50px 0", xl: "50px 50px 50px 0" },
      }}
    >
      <Grid
        item
        xs={12}
        md={11}
        sx={{
          background: "#FFF",
          height: { md: "120vh", xl: "calc(130vh - 100px)" },
          width: { md: "600px", xl: "1242px" },
          borderRadius: "35px",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <Box>
          <Box
            component="img"
            src={profile ? profile : userProfile}
            sx={{
              display: { xs: "block", md: "none" },
              width: { xs: "50px", md: "50px", xl: "75px" },
              height: { xs: "50px", md: "50px", xl: "75px" },
              borderRadius: "50%",
            }}
            alt="user profile image"
          ></Box>
          <Link to="/HomePage" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                width: "200px",
                height: "50px",
                borderRadius: "50px",
                background: "#EBEBEB",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#171938",
                  fontWeight: "600",
                }}
              >
                الصفحة الرئيسية
              </Typography>
            </Box>
          </Link>
          <Grid
            container
            className="grid"
            sx={{
              padding: { xs: "0", md: "50px 50px 50px 0" },
              display: "grid",
              gridTemplateRows: "auto 1fr",
              marginTop: { xs: "100px", md: "0" },
            }}
          >
            <Grid
              item
              sx={{
                background: "#FFF",
                borderRadius: "35px",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "150px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#2E74FD" }}
                >
                  منشوراتك
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "80%" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      borderBottom:
                        activeSection === "createdPosts"
                          ? "7px solid #9093FD"
                          : "none",
                      paddingBottom: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("createdPosts")}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "17px" },
                        fontWeight: "600",
                      }}
                    >
                      منشوراتك التي قمت بإنشائها
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderBottom:
                        activeSection === "savedPosts"
                          ? "7px solid #9093FD"
                          : "none",
                      paddingBottom: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("savedPosts")}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "17px" },
                        fontWeight: "600",
                      }}
                    >
                      منشورات محفوظة
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider sx={{ width: { xs: "100%", md: "80%" } }}></Divider>
              </Box>
            </Grid>
            <Grid item>
              {/* Render content based on the active section */}
              {activeSection === "createdPosts" && (
                <>
                  {/* Replace the existing Box with UserProfileEditPosts component */}
                  {editPostOpen && (
                    <UserProfileEditPosts
                      open={editPostOpen}
                      onClose={handleCloseEditPost}
                      post={selectedPost}
                    />
                  )}
                  {!editPostOpen && (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "30px 55px",
                        justifyContent: "center",
                        padding: "20px",
                      }}
                    >
                      {apiAllProfilePosts &&
                        apiAllProfilePosts.map((postData) => (
                          <Card
                            key={postData._id}
                            sx={{
                              width: { xs: "100%", md: "285px" },
                              height: { xs: "340px", md: "340px" },
                              direction: "rtl",
                              margin: { xs: "0px auto", md: "15px auto" },
                              borderRadius: "20px",
                              backgroundImage: `url(${postData.imageUrl})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              position: "relative",
                            }}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                height: "300px",
                              }}
                              onClick={() => handlePostClick(postData)}
                            >
                              {/* Your CardHeader content here */}
                              <CardHeader
                                sx={{ padding: "0" }}
                                avatar={
                                  <Avatar
                                    src={postData.userImage}
                                    alt="PostedPerson"
                                    sx={{
                                      marginRight: 0,
                                      marginLeft: "15px",
                                      width: "50px",
                                      height: "50px",
                                      marginBottom: "10px",
                                    }}
                                  />
                                }
                              />
                              <Box>
                                <Box sx={{ height: "calc(464px - 70px)" }}>
                                  <span
                                    style={{
                                      // marginRight: "30px",
                                      marginTop: "10px",
                                      fontSize: "17px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {postData.userName}
                                  </span>
                                </Box>
                              </Box>
                            </CardContent>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0",
                                margin: "0",
                                gap: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  height: "45px",
                                  width: { xs: "110px", md: "130px" },
                                  borderRadius: "10px 0px 30px 0px",
                                  backgroundColor: "#9093FD",
                                  color: "#fff",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: { xs: "10px", md: "12px" },
                                  fontWeight: "600",

                                  cursor: "pointer",
                                }}
                              >
                                ارشفة
                              </Box>
                              <Box
                                sx={{
                                  margin: "0",
                                  height: "45px",
                                  width: { xs: "110px", md: "130px" },
                                  borderRadius: "0px 10px 0px 30px",
                                  backgroundColor: "#9093FD",
                                  color: "#fff",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: { xs: "10px", md: "12px" },
                                  fontWeight: "600",

                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleDeleteButtonClick(postData)
                                }
                              >
                                عمليات على المنشور
                              </Box>
                            </Box>

                            {/* Confirmation dialog */}
                            <Dialog
                              open={
                                deleteConfirmationOpen &&
                                !editPostOpen &&
                                postToDelete === postData
                              }
                              onClose={() => setDeleteConfirmationOpen(false)}
                              PaperProps={{
                                sx: {
                                  maxWidth: "none",
                                  width: "310px",
                                  height: "235px",
                                  borderRadius: "20px",
                                },
                              }}
                            >
                              <DialogContent
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "15px",
                                  fontWeight: "400",
                                }}
                              >
                                تأكيد حذف المنشور
                              </DialogContent>
                              <DialogActions
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Button
                                  sx={{
                                    background: "#9093FD",
                                    color: "#000",
                                    width: "86px",
                                    height: "31px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    "&:hover": {
                                      background: "#9093fd70",
                                    },
                                  }}
                                  onClick={() => handleEditClick(selectedPost)}
                                >
                                  تعديل
                                </Button>
                                <Button
                                  onClick={handleDeletePost}
                                  sx={{
                                    background: "#FDAA90",
                                    color: "#000",
                                    width: "86px",
                                    height: "31px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    "&:hover": {
                                      background: "#fdaa908a",
                                    },
                                  }}
                                >
                                  حذف
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Card>
                        ))}
                    </Box>
                  )}
                </>
              )}
              {activeSection === "savedPosts" && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px 55px",
                    justifyContent: "space-around",
                    padding: "20px",
                  }}
                >
                  {apiAllProfilePinedPosts &&
                    apiAllProfilePinedPosts.map((postData) => (
                      <Card
                        key={postData._id}
                        sx={{
                          width: { xs: "100%", md: "285px" },
                          direction: "rtl",
                          margin: { xs: "0px auto", md: "15px auto" },
                          borderRadius: "20px",
                          backgroundImage: `url(${postData.imageUrl})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          position: "relative",
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          onClick={() => handlePostClick(postData)}
                        >
                          {/* Your CardHeader content here */}
                          <CardHeader
                            sx={{ padding: "0" }}
                            avatar={
                              <Avatar
                                src={postData.userImage}
                                alt="PostedPerson"
                                sx={{
                                  marginRight: 0,
                                  marginLeft: "15px",
                                  width: "50px",
                                  height: "50px",
                                  marginBottom: "10px",
                                }}
                              />
                            }
                          />
                          <Box onClick={handleBodyClick}>
                            <Box sx={{ height: "calc(464px - 70px)" }}>
                              <span
                                style={{
                                  // marginRight: "30px",
                                  marginTop: "10px",
                                  fontSize: "17px",
                                  fontWeight: "600",
                                }}
                              >
                                {postData.userName}
                              </span>
                            </Box>
                          </Box>
                        </CardContent>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0",
                            margin: "0",
                          }}
                          onClick={() => handlePinedButtonClick(postData)}
                        >
                          <IconButton
                            onClick={() => togglePinPost(postData)} // Pass the postData to togglePinPost
                            sx={{
                              height: "60px",
                              width: "100%",
                              borderRadius: "0px",
                              backgroundColor: postData.isPinned
                                ? "#B7B6BE"
                                : "#A6C0FE",
                              textAlign: "center",
                              padding: "2px",
                              border: "1px solid rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            <img
                              src={postData.isPinned ? pushIcon : pined}
                              alt="isPinned"
                            />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                </Box>
              )}
            </Grid>
          </Grid>
          {selectedPost && !deleteConfirmationOpen && (
            <PostDetails
              token={token}
              post={selectedPost}
              onClose={handleClosePostDetails}
              setSelectedPost={setSelectedPost}
            />
          )}
        </Box>
      </Grid>
      <Grid
        sx={{
          position: { xs: "absolute", md: "static" },
          left: { xs: "3%", md: "inherit" },
          top: { xs: "2%", md: "inherit" },
        }}
        item
        xs={2}
        md={1}
      >
        <Box sx={{ display: "grid" }}>
          <UserProfileNavigation />
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfilePosts;
