import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material";
import hope from "../../assets/hope.jpg";
import "../../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { Link } from "react-router-dom";

function Notification() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [error, setError] = useState(null);
  const cookies = Cookie();
  const token = cookies.get("Cookie");

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    console.log(storedCity);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hope3221-001-site1.btempurl.com/api/Posts/GetRecommendedPosts?city=${storedCity}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [token]); // Include token in the dependency array to ensure useEffect runs when token changes

  return (
    <Box
      sx={{
        width: "350px",
        height: "690px",
        borderRadius: "50px",
        padding: "30px",
        overflowY: "scroll",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          color: "#2E74FD",
        }}
      >
        مطابق لمنشورك
      </Typography>
      <Box sx={{ padding: "15px" }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              maxWidth: "330px",
              margin: "auto",
              position: "relative",
              marginBottom: "15px",
              height: "auto",
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={post.imageUrl ? post.imageUrl : hope}
              alt={post.userImage}
              className="card-image"
            />

            <Box className="card-info">
              <Box>
                <Link to={`/profile/${post.userId}`}>
                  <Avatar
                    src={post.userImage}
                    alt="PostedPerson"
                    sx={{
                      marginRight: 0,
                      marginLeft: "15px",
                      width: "65px",
                      height: "65px",
                      marginBottom: "10px",
                    }}
                  />
                </Link>
                <Typography gutterBottom variant="h5" component="div">
                  {post.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {post.condition}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.gendre}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Notification;
