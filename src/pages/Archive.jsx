import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import RestoreIcon from "@mui/icons-material/Restore";
import userProfile from "../assets/user profile.png";
import ArchiveIcon from "../assets/bookmark(archive).png";
import PostDetails from "../components/home-page-components/PostDetails";
import { Link } from "react-router-dom";
import { GetArchivedPosts, UnHidePosts } from "../apiRequests/apiRequest";

function Archive() {
  const profile = localStorage.getItem("avater");

  //selected post state to show details
  const [selectedArchivedPost, setSelectedArchivedPost] = useState(null);
  console.log(selectedArchivedPost);
  const [activeSection, setActiveSection] = useState("messages");

  const [archivedPosts, setArchivedPosts] = useState([]);
  console.log(archivedPosts);
  const [successMsg, setSuccessMsg] = useState("");
  const cookies = Cookie();
  const token = cookies.get("Cookie");
  console.log(token);
  useEffect(() => {
    const fetchArchivedPosts = async () => {
      try {
        const response = await axios.get(GetArchivedPosts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArchivedPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching archived posts:", error);
      }
    };

    fetchArchivedPosts();
  }, []);

  //set data to selected
  const handleArchivedPostClick = (post) => {
    setSelectedArchivedPost(post);
  };
  const handleClosePostDetails = () => {
    setSelectedArchivedPost(null);
  };

  const handleUnhidePost = async (post) => {
    try {
      const response = await axios.post(
        UnHidePosts,
        {
          postId: post.id,
          isPeople: post.isPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg(response.data.message);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error unhiding post:", error);
    }
  };

  return (
    <Box sx={{ background: "#c1c1c147", padding: {xS:"0px",md:"50px 50px 50px 50px" }}}>
      {successMsg && (
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2, // Set a high z-index to ensure it appears above other content
            background: "rgba(0, 255, 0, 0.2)",
            padding: "10px",
          }}
        >
          تم استعادة المنشور بنجاح
        </Box>
      )}
      <Grid
        item
        xs={12}
        sx={{
          background: "#FFF",
          height: "calc(100vh - 100px)",

          borderRadius: {xs:"0",md:"35px"},
          padding: "50px",
          overflowY: "scroll",
          width:"100%",
          // overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <Box sx={{
            display:"flex",
            gap:"10px",
            alignItems:"center"
          }}>
            <img
              src={ArchiveIcon}
              style={{ width: "50px", height: "50px" }}
              alt="ArchiveIcon"
            />
            <Box>
            {" "}
            <Typography
              sx={{ fontSize: {xs:"12px",md:"25px"}, fontWeight: "600", color: "#2E74FD" }}
            >
              المؤرشفة
            </Typography>
          </Box>
          </Box>
          
          <Box>
            <Box
            component="img"
              src={profile}
              sx={{ width: {xs:"50px",md:"75px"}, height: {xs:"50px",md:"75px"}, borderRadius: "50%" }}
              alt="user profile image"
            ></Box>
          </Box>
        </Box>
        <Grid
          container
          
          className="grid"
          sx={{
            padding: {xs:"0",md:"50px 50px 50px 0"},
            display: "grid",
            gridTemplateRows: "auto 1fr",
           
          }}
        >
          <Box sx={{width:{xs:"50%",sm:"90%",md:"100%"}}}>
            <Link to="/HomePage" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  width: "200px",
                  height: "50px",
                  borderRadius: "50px",
                  background: "#EBEBEB",
                  display: "flex",
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
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: {xs:"500px",md:"776px"},
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      borderBottom:
                        activeSection === "messages"
                          ? "7px solid #9093FD"
                          : "none",
                      paddingBottom: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("messages")}
                  >
                    <Typography
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      الرسائل
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderBottom:
                        activeSection === "posts"
                          ? "7px solid #9093FD"
                          : "none",
                      paddingBottom: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("posts")}
                  >
                    <Typography
                      sx={{
                        fontSize: "17px",
                        fontWeight: "600",
                      }}
                    >
                      المنشورات
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
                <Divider sx= {{width: {xs:"250px",md:"776px"},}} ></Divider>
              </Box>
            </Grid>
            <Grid item sx={{padding:{xs:"20px",md:"0"}}}>
              {/* Render content based on the active section */}
              {activeSection === "messages" && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: {xs:"0",md:"30px 55px"},
                      justifyContent: "space-around",
                      padding: "20px",
                    }}
                  >
                    رسايل مؤرشفة
                  </Box>
                </>
              )}
              {activeSection === "posts" && (
                <Box
                  sx={{
                   
                    display: "flex",
                    flexWrap: "wrap",
                    gap: {xs:"20px 25px",sm:"20px 0px",md:"20px 25px"},
                    justifyContent: {xs:"center",md:"flex-start"},
                    padding: "20px",
                    border: "1px solid #C1C1C1",
                    borderRadius: "0 35px 30px 0",
                    height: "700px",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#fff0",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#9093FD",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {archivedPosts.map((post) => (
                    <Card
                      key={post._id}
                      sx={{
                        width: "270px",
                        height: "321px",
                        direction: "rtl",
                        // margin: {xs:"20px auto",md:"0px auto"},
                        borderRadius: "20px",
                        backgroundImage: `url(${post.imageUrl})`,
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
                          height: "270px",
                        }}
                        onClick={() => handleArchivedPostClick(post)}
                      ></CardContent>
                      <Box
                        sx={{
                          height: "50px",
                          display: "flex",
                          justifyContent: "end",
                          padding: "0",
                          margin: "0",
                          alignItems: "end",
                        }}
                      >
                        <IconButton
                          sx={{
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#FFA94F",
                            textAlign: "center",
                            padding: "2px",
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                            marginBottom: "15px",
                            marginLeft: "15px",
                          }}
                          onClick={() => handleUnhidePost(post)}
                        >
                          <RestoreIcon
                            sx={{ fontSize: "25px", color: "#fff" }}
                          />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                </Box>
              )}
              {/* Render the success message if available */}
            </Grid>
          </Box>
        </Grid>
        {selectedArchivedPost && (
          <PostDetails
            token={token}
            post={selectedArchivedPost}
            onClose={handleClosePostDetails}
            setSelectedPost={setSelectedArchivedPost}
          />
        )}
      </Grid>
    </Box>
  );
}

export default Archive;
