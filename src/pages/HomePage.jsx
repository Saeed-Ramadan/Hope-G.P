import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import {
  GetAllPosts,
  GetPostThings,
  GetPostOfShelters,
  GetPostOfAccidents,
  GetPostOfLosties,
} from "../apiRequests/apiRequest";
import bgImage from "../assets/cover.png";
import CreatePostIcon from "../assets/createPost-icon.png";
import palastine from "../assets/PALAST.jpg";

import Navbar from "../components/home-page-components/Navbar";
import Post from "../components/home-page-components/Post";
import NavigationBar from "../components/home-page-components/NavigationBar";
import Search from "../components/home-page-components/Search.component";
import axios from "axios";
import PostDetails from "../components/home-page-components/PostDetails";
import Notification from "../components/home-page-components/Notification";

import Cookie from "cookie-universal";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function HomePage() {
  // Function to navigate to user profile
  const navigateToUserProfile = (userId) => {
    // Navigate to the user profile page with userId parameter
    history.push(`/profile/${userId}`);
  };
  //fetch all data state
  const [apiAllData, setApiAllData] = useState([]);
  // Define a state variable to track whether more data is available
  const [moreDataAvailable, setMoreDataAvailable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  //notification logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotificationCategory, setSelectedNotificationCategory] =
    useState("incoming");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Incoming Notification 1", category: "incoming" },
    { id: 2, message: "Outgoing Notification 1", category: "outgoing" },
    { id: 3, message: "Archived Notification 1", category: "archived" },
  ]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  //selected post state to show details
  const [selectedPost, setSelectedPost] = useState(null);
  console.log("selectedPost" + selectedPost);

  const [PageNumber, setPageNumber] = useState(0);
  const hasIncrementedPage = useRef(false);
  const [postsLoading, setPostsLoading] = useState(true);

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };
  //set data to selected
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };
  //to get token from login page
  const cookies = Cookie();
  const token = cookies.get("Cookie"); // Assuming "Cookie" is the key where the token is stored in cookies
  //fetch all data
  const handleFetchData = async (apiEndpoint, pageNumber) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}?PageNumber=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data.data;

      if (responseData.length === 0) {
        setMoreDataAvailable(false);
      } else {
        // Append new data to existing state
        setApiAllData((prevData) => {
          // Use a Set to avoid duplicates
          const uniqueData = new Set([...prevData, ...responseData]);
          return Array.from(uniqueData);
        });
      }
      setPostsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //handle scroll to get another data
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user has scrolled to the very bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      // Load more posts only if the page number has not been incremented in this scroll event
      if (!hasIncrementedPage.current && moreDataAvailable) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1); // Increment page number
        hasIncrementedPage.current = true; // Set the flag to true to indicate that the page number has been incremented
        setPostsLoading(true);
      }
    } else {
      // Reset the flag when the user scrolls back up
      hasIncrementedPage.current = false;
    }
  };

  // Use useEffect to trigger the API request when the component mounts
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSearchVisible(true);
    }
    // Fetch initial data based on the selected category
    if (selectedCategory) {
      const apiEndpoint = getCategoryEndpoint(selectedCategory); // Include PageNumber in the API endpoint
      handleFetchData(apiEndpoint, PageNumber);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedCategory, PageNumber]); // Include PageNumber in the dependencies array

  console.log(PageNumber);
  const getCategoryEndpoint = (category) => {
    // Map category to corresponding API endpoint
    const categoryEndpoints = {
      all: `${GetAllPosts}`, // Include PageNumber in the endpoint
      things: `${GetPostThings}`,
      shelters: `${GetPostOfShelters}`,
      accidents: `${GetPostOfAccidents}`,
      Missing: `${GetPostOfLosties}`,
    };
    return categoryEndpoints[category] || "";
  };
  const handleCategorySelect = (event, category) => {
    setIsOpen(false);
    setApiAllData([]); // Reset apiAllData array
    setPageNumber(0); // Reset PageNumber to 0 when a new category is selected
    setSelectedCategory(category);
  };
  const handleNotificationClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };
  const handleNotificationIconClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the popover
    setIsOpen((prev) => !prev); // Toggle the open state
  };
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;
  const filteredNotifications = notifications.filter(
    (notification) => notification.category === selectedNotificationCategory
  );

  return (
    <>
      <Dialog
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: 8,
            padding: "0px",
            width: { xs: "95%", md: "60%" },
            margin: "0 10px",
            maxHeight: "465px",
          }, // Apply borderRadius and remove padding
        }}
      >
        <DialogTitle sx={{ padding: "0" }}>
          <Box
            onClick={() => setIsPopupOpen(false)}
            color="primary"
            sx={{
              width: { xs: "25px", md: "50px" },
              borderRadius: "50%",
              background: "#EBEBEB",
              color: "#000",
              position: "absolute",
              left: { xs: "10px", md: "20px" },
              cursor: "pointer",
              marginTop: { xs: "8px", md: "20px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            X
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            borderRadius: "0 0 8px 8px", // Apply borderRadius to bottom corners
            padding: "0px", // Remove padding from DialogContent
            overflow: "hidden", // Ensure content stays within rounded corners
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ height: { xs: "500px", md: "465px" } }}
            >
              <Box
                component="img"
                src={palastine}
                alt="palastine"
                sx={{
                  width: "100%",
                  height: { xs: "60%", md: "100%" },
                  borderBottomLeftRadius: { xs: "200%", md: "0" },
                }}
              ></Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: { xs: "-250px", md: "0" },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    whiteSpace: "pre-line",
                    textAlign: "center",
                    marginBottom: { xs: "20px", sm: "50px" },
                    fontSize: { xs: "20px", md: "36px" },
                    fontWeight: "600",
                  }}
                >
                  فلسطيني .....
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: "pre-line",
                    textAlign: "center",
                    fontSize: { xs: "12px", md: "20px" },
                    fontWeight: "300",
                  }}
                >
                  ستنتهي الحرب يوما{"\n"}
                  ويعود الزيتون فلسطينيا{"\n"}
                  واللحن عراقيا{"\n"}
                  والبن يمنيا{"\n"}
                  والياسمين سوريا{"\n"}
                  ويعود العز عربيا{"\n"}
                  والنصر إسلاميا
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Box>
        {/* <Navbar
          categories={["incoming", "outgoing", "archived"]}
          onCategorySelect={handleCategorySelect}
          isOpen={isOpen}
        /> */}
        <Navbar
          onNotificationIconClick={handleNotificationIconClick}
          isOpen={isOpen}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          onSelectCategory={(category) => handleCategorySelect(event, category)}
        />
        {/* Notification tooltip */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ marginTop: "20px" }}
        >
          <Notification />
        </Popover>
        <Box sx={{ padding: { xs: "10px 10px", md: "10px 50px" } }}>
          <Box
            sx={{
              backgroundImage: `url(${bgImage})`,
              height: { xs: "50vh", md: "85vh" },
              // width: "100vw",
              backgroundSize: { xs: "cover", md: "100%" },
              backgroundRepeat: "no-repeat",
              borderRadius: { xs: 5, md: 12 },
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                height: { xs: "100%", md: "85vh" },
                // width: "100vw",
                background:
                  "linear-gradient(to right, rgba(55, 59, 85, 1), rgba(196, 196, 196, 0))",
                borderRadius: { xs: 5, md: 12 },
              }}
            >
              <Box
                sx={{
                  textAlign: "left",
                  p: { xs: 2, sm: 5, md: 5, xl: 15 },
                  fontFamily: "defaultFont",
                }}
              >
                <Typography
                  variant="h1"
                  component="h2"
                  sx={{
                    fontSize: { xs: "18px", md: 50, xl: 75 },
                    fontFamily: "defaultFont",
                    color: "#fff",
                    fontWeight: 400,
                  }}
                >
                  Find
                  <span
                    style={{
                      background:
                        "-webkit-linear-gradient(45deg, #A1C4FD 100%, #C2E9FB 100%)",
                      webkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginLeft: "10px",
                      fontFamily: "defaultFont",
                    }}
                  >
                    Hope
                  </span>
                </Typography>
                <Typography
                  variant="h1"
                  component="h5"
                  sx={{
                    fontSize: { xs: "16px", md: 25, xl: 30 },
                    fontFamily: "defaultFont",
                    color: "#fff",
                  }}
                >
                  to find your lost
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "center",
                    bottom: { md: 100, xl: -150 },
                    position: "relative",
                  }}
                >
                  {isSearchVisible && <Search />}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          bottom: 120,
          // width: "100vw",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "baseline",
          justifyContent: "center",
          // right: {md:"3%",xl:"200px"},
          width: "70%",
          margin: "0 auto",
        }}
      >
        <Box
          className="creat"
          sx={{
            backgroundColor: "#fff",
            height: { md: "80px", xl: "101px" },
            width: { md: "240px", xl: "394px" },
            px: "10px",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px 50px 0px 0px",
            // float: "left",
            // left: {md:"120px",xl:"230px"},
            // bottom: {md:"150px",xl:"171px"},
            // position: "relative",
            cursor: "pointer",
          }}
        >
          <Link to="/MainCreatePost">
            {/* Specify the path to MainCreatePost page */}
            <Button
              sx={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: { md: "16px", xl: "20px" },
                fontWeight: "bold",

                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              انشاء منشور جديد
              <IconButton>
                <Box
                  component="img"
                  src={CreatePostIcon}
                  alt="CreatePostIcon"
                  sx={{
                    width: { md: "30px", xl: "50px" },
                    height: { md: "30px", xl: "50px" },
                  }}
                ></Box>
              </IconButton>
            </Button>
          </Link>
        </Box>
        <NavigationBar
          toggleSearchVisibility={toggleSearchVisibility}
          onSelectCategory={(category) => handleCategorySelect(event, category)}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { sm: "100px", md: "40px", xl: "100px" },
          justifyContent: "center",
          padding: "20px 50px",
        }}
      >
        {apiAllData &&
          apiAllData.map((postData) => (
            <Post
              key={postData.id}
              data={postData}
              onClick={() => handlePostClick(postData)}
              navigateToUserProfile={navigateToUserProfile}
            />
          ))}
      </Box>
      {postsLoading && <Loader />}
      {selectedPost && (
        <PostDetails
          token={token}
          post={selectedPost}
          onClose={handleClosePostDetails}
          setSelectedPost={setSelectedPost}
        />
      )}
    </>
  );
}

export default HomePage;
