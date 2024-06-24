import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetails from "../components/home-page-components/PostDetails";
import { GetPostByPostId } from "../apiRequests/apiRequest";

function SharedPost() {
  const postId = useParams().postId;
  const isPeople = useParams().isPeople;
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookies = Cookie();
  const token = cookies.get("Cookie");
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(GetPostByPostId, {
          params: { postId, IsPeople: isPeople },
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPostData();
    // Cleanup function
    return () => {
      // Cancel the request if component unmounts
    };
  }, [postId, isPeople, token]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={200} />
      </Box>
    );

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "100px",
          borderRadius: "20px",
        }}
      >
        <Alert severity="error">
          <AlertTitle sx={{ fontSize: "100px" }}>Error</AlertTitle>
          {error.message}
        </Alert>
      </Box>
    );
  }
  const postDetailsProps = { post: postData, token };
  return (
    <Box>
      {/* Render post data here */}
      {postData && (
        <Box sx={{ width: "100%", height: "100%" }}>
          <PostDetails {...postDetailsProps} />
        </Box>
      )}
    </Box>
  );
}

export default SharedPost;
