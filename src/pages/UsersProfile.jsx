import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import OtherUsersProfileNavigation from "../components/Others-users-profile/OtherUsersProfileNavigation";
import { useEffect, useState } from "react";

import userProfile from "../assets/user.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import { GetProfileOfAnotherUser } from "../apiRequests/apiRequest";
import pushIcon from "../assets/pin icon.png";
import pined from "../assets/pined.png";
import PostDetails from "../components/home-page-components/PostDetails";

function UsersProfile() {
  const { userId } = useParams();
  const [ProfileOtherUser, setProfileOtherUser] = useState("");
  // console.log(userId);
  // State to keep track of the active section
  const [activeSection, setActiveSection] = useState("UserData");
  // State to store user posts
  const [userPosts, setUserPosts] = useState([]);
  // console.log(userPosts);

  const [selectedPinedPost, setSelectedPinedPost] = useState(null);
  // console.log(selectedPinedPost);

  const [postDetailsOpen, setPostDetailsOpen] = useState(false);
  //selected post state to show details
  const [selectedPost, setSelectedPost] = useState(null);
  console.log(selectedPost);

  //set data to selected
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };
  // Function to handle clicks on the post body
  const handleBodyClick = (event) => {
    // Prevent the event from bubbling up to the parent Card component
    event.stopPropagation();
    // Call the onClick function passed from the parent component
  };

  const cookies = Cookie();
  const token = cookies.get("Cookie");
  console.log(token);

  useEffect(() => {
    getProfileDate();
    const fetchUserPosts = async () => {
      try {
        // Fetch user posts using the provided API endpoint
        const response = await axios.get(
          `https://hope3221-001-site1.btempurl.com/api/Account/GetPostsByUserId?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set the fetched user posts to the state
        setUserPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Call the fetchUserPosts function when the component mounts and whenever userId changes
    fetchUserPosts();
  }, [userId]);

  const handlePinedButtonClick = (pinedPostData) => {
    setSelectedPinedPost(pinedPostData); // Set the selected post data
  };

  const togglePinPost = async (postData) => {
    console.log(postData);
    try {
      const pinStatus = postData.isPinned ? "PinPost" : "UnPinPost";
      await axios.post(
        `https://hope3221-001-site1.btempurl.com/api/Posts/${pinStatus}`,
        {
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
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postData.id ? { ...post, isPinned: !post.isPinned } : post
        )
      );
      // Reload the page after successfully unpinning the post
      // console.log("pinned");
      // window.location.reload();
    } catch (error) {
      console.error("Error pinning/unpinning post:", error);
    }
  };
  // GetPostByPostId
  console.log(ProfileOtherUser);
  const getProfileDate = () => {
    axios
      .get(`${GetProfileOfAnotherUser}${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProfileOtherUser(response.data.data);
      });
  };
  const { city, displayName, phoneNumber, userName, userImage, email } =
    ProfileOtherUser;

  return (
    <Grid
      container
      className="grid"
      sx={{ background: "#c1c1c147", padding: "50px 50px 50px 0" }}
    >
      <Grid
        item
        xs={11}
        sx={{
          background: "#FFF",

          height: "calc(100vh - 100px)",
          width: "1242px",
          borderRadius: "35px",
          padding: "20px",
        }}
      >
        <Box>
          <Link to="/HomePage" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                width: { md: "200px", xs: "150px" },
                height: { md: "50px", xs: "30px" },
                borderRadius: "50px",
                background: "#EBEBEB",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  color: "#171938",
                  fontWeight: "600",
                }}
              >
                الصفحة الرئيسية
              </Typography>
            </Box>
          </Link>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: { md: "50px", xs: "20px" },
                marginBottom: { md: "50px", xs: "20px" },
              }}
            >
              <Box
                sx={{
                  width: { md: "220px", xs: "100px" },
                  height: { md: "220px", xs: "100px" },
                  borderRadius: "50%",
                  border: { md: "10px solid #DAD7D7", xs: "3px solid #DAD7D7" },
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: { md: "200px", xs: "96px" },
                    height: { md: "200px", xs: "96px" },
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={userImage == null ? userProfile : userImage}
                  alt="user image"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "776px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    borderBottom:
                      activeSection === "UserData"
                        ? "7px solid #9093FD"
                        : "none",
                    paddingBottom: { md: "30px", xs: "10px" },
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSection("UserData")}
                >
                  <Typography
                    sx={{
                      fontSize: { md: "17px", xs: "12px" },
                      fontWeight: "600",
                    }}
                  >
                    بيانات المستخدم{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    borderBottom:
                      activeSection === "UserPosts"
                        ? "7px solid #9093FD"
                        : "none",
                    paddingBottom: { md: "30px", xs: "10px" },
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSection("UserPosts")}
                >
                  <Typography
                    sx={{
                      fontSize: { md: "17px", xs: "12px" },
                      fontWeight: "600",
                    }}
                  >
                    المنشورات{" "}
                  </Typography>
                </Box>
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
            <hr style={{ width: "776px" }} />
          </Box>
          {activeSection === "UserData" && (
            <>
              <Grid
                container
                spacing={4}
                sx={{
                  marginTop: "0px",
                  justifyContent: "center",
                }}
              >
                <Grid item md={8}>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      padding: "10px 10px",
                      border: "1px solid #C1C1C1",
                      borderRadius: "25px",
                      height: { md: "320px", xs: "300px" },
                      width: { md: "70%", xs: "100%" },
                      margin: "0 auto",
                      overflowY: "scroll",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: { md: "70%", xs: "100%" },
                        padding: { md: "20px 20px", xs: "5px 5px" },
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        الإسم
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {userName}
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: { md: "70%", xs: "100%" },
                        padding: { md: "20px 20px", xs: "5px 5px" },
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        إسم الدخول
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {displayName}{" "}
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "70%",
                        padding: { md: "20px 20px", xs: "5px 5px" },
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        الايميل
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {email}{" "}
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "70%",
                        padding: { md: "20px 20px", xs: "5px 5px" },
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        رقم الهاتف{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {phoneNumber}{" "}
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "70%",
                        padding: { md: "20px 20px", xs: "5px 5px" },
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {" "}
                        المحافظة{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { md: "17px", xs: "12px" },
                          color: "#373B55",
                        }}
                      >
                        {city}{" "}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
          {activeSection === "UserPosts" && (
            <>
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px 55px",
                    justifyContent: "space-around",
                    padding: "20px",
                    width: "1000px",
                    height: { md: "320px", xs: "300px" },
                    border: "1px solid #C1C1C1",
                    borderRadius: "35px",
                    marginTop: "40px",
                    overflowY: "scroll",
                  }}
                >
                  {userPosts &&
                    userPosts.map((postData) => (
                      <Card
                        key={postData._id}
                        sx={{
                          width: "200px",
                          height: "221px",
                          direction: "rtl",
                          margin: "50px auto",
                          borderRadius: "25px",
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
                            sx={{ padding: "0", height: "155px" }}
                            onClick={handleBodyClick}
                          />
                        </CardContent>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            padding: "0",
                            margin: "0",
                          }}
                          onClick={() => handlePinedButtonClick(postData)}
                        >
                          <IconButton
                            onClick={() => togglePinPost(postData)} // Pass the postData to togglePinPost
                            sx={{
                              height: "38px",
                              width: "64px",
                              borderRadius: "0px",
                              backgroundColor: postData.isPinned
                                ? "#A6C0FE"
                                : "#FFB86D",

                              textAlign: "center",
                              padding: "2px",
                              border: "1px solid rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            <img
                              src={postData.isPinned ? pined : pushIcon}
                              alt="isPinned"
                            />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                </Box>
                {selectedPost && (
                  <PostDetails
                    token={token}
                    post={selectedPost}
                    onClose={handleClosePostDetails}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Box sx={{ display: "grid" }}>
          <OtherUsersProfileNavigation />
        </Box>
      </Grid>
    </Grid>
  );
}

export default UsersProfile;
