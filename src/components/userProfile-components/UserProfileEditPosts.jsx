import { useState } from "react";
import { Box, IconButton, Input, Typography, Button } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import defaultLostPersonImage from "../../assets/person-not-found-default.png";

import defaultUserImage from "../../assets/userDefaultImage.png";
import PhoneImage from "../../assets/phoneDetails.png";
import Cookie from "cookie-universal";
import {
  UpdatePostOfPeoplePost,
  UpdatePostOfThingsPost,
} from "../../apiRequests/apiRequest";
function UserProfileEditPosts({ open, onClose, post }) {
  //   const imageUrl = post.imageUrl || defaultLostPersonImage;
  const imageUrl = defaultLostPersonImage;
  //   const userImage = post.userImage || defaultUserImage;
  const userImage = defaultUserImage;
  // console.log(post);
  const [editedPost, setEditedPost] = useState({ ...post }); // Initialize editedPost state with post data
  console.log(editedPost);
  const [imageFile, setImageFile] = useState(null);
  console.log(imageFile);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    if (name === "Image" && files.length > 0) {
      // If the input is a file input for image
      setImageFile(files[0]);
    } else {
      // For other inputs, update the state directly
      setEditedPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }
  };
  const cookies = Cookie();
  const token = cookies.get("Cookie");

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append each key-value pair to formData
      formData.append("UserId", post.userId);
      formData.append("MissigDate", post.missigDate);
      formData.append("City", editedPost.City || post.city);
      formData.append("Town", editedPost.Town || post.town);
      formData.append("PhoneNumber", post.phoneNumber);
      formData.append("Type", editedPost.Type || post.type);
      formData.append("Id", post.id);
      // Append the image file if it exists
      if (imageFile) {
        formData.append("Image", imageFile);
        formData.append("Image", imageFile || post.imageUrl);
      }

      formData.append(
        "Description",
        editedPost.Description || post.description
      );
      formData.append("IsSearcher", post.isSearcher);

      let apiUrl = "";
      if (!post.condition) {
        apiUrl = UpdatePostOfThingsPost;
      } else {
        apiUrl = UpdatePostOfPeoplePost;
        formData.append("Gendre", editedPost.Gendre || post.gendre);
        formData.append("Name", editedPost.Name || post.name);
        formData.append("Condition", editedPost.Condition || post.condition);
        formData.append("Age", editedPost.Age || post.age);
      }

      // Perform API request
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      console.log(formData);
      // Close the dialog
      onClose();

      // Reload the page after successfully unpinning the post
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  // Conditional rendering based on post.condition
  const renderDetails = () => {
    if (!post) {
      // Handle the case where post is null or undefined
      return;
    }
    if (!post.condition) {
      return (
        <>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust opacity as needed
            }}
          />
          <Box
            sx={{
              marginTop: "50px",
              backgroundColor: "#fff",
              borderRadius: "25px",
              border: " 1px solid #C1C1C1",
              width: "100%",
              height: "580px",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "70%",
                height: "100%",
                padding: "40px 40px 0px 0px",
                marginBottom: "40px",
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
                    <img
                      // src={userImage}

                      src={post.userImage}
                      alt="PostedPerson"
                      style={{
                        marginRight: 0,
                        marginLeft: "15px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <Box sx={{ marginTop: "10px" }}>
                      <span
                        style={{
                          marginRight: "30px",
                          fontSize: "20px",
                          color: "#373B55",
                        }}
                      >
                        {post.userName}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  height: "415px",

                  borderRadius: "25px",
                  margin: "50px 50px",
                  padding: "30px",
                  overflowY: "auto",
                }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>النوع: </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Type}
                    placeholder={post.type}
                    onChange={handleChange}
                    name="Type"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>المحافظة: </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.City}
                    placeholder={post.city}
                    onChange={handleChange}
                    name="City"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>المدينة: </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Town}
                    placeholder={post.town}
                    onChange={handleChange}
                    name="Town"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>المواصفات: </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Description}
                    placeholder={post.description}
                    onChange={handleChange}
                    name="Description"
                  />
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "30%" }}>
              <input
                type="file"
                accept="image/*"
                id="imageInput"
                style={{ display: "none" }}
                name="Image" // Make sure the name attribute is set to "Image"
                onChange={handleChange}
              />

              <Box
                sx={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  background: "#EBEBEB",
                  textAlign: "center",
                  padding: "2px",
                  float: "left",
                  margin: "10px",
                  zIndex: "1000",
                }}
              >
                <IconButton onClick={onClose}>
                  <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
                </IconButton>
                <Box
                  sx={{
                    marginTop: "100px",
                    marginRight: "-15px",
                  }}
                >
                  <label htmlFor="imageInput" style={{ marginTop: "100px" }}>
                    <IconButton
                      component="span"
                      sx={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    >
                      <PhotoCameraIcon
                        sx={{ fontSize: "50px", color: "#000" }}
                      />
                    </IconButton>
                  </label>
                </Box>
              </Box>
              <Box sx={{ width: "100%", height: "100%" }}>
                <img
                  src={
                    (imageFile && URL.createObjectURL(imageFile)) ||
                    editedPost.imageUrl ||
                    defaultLostPersonImage
                  }
                  alt="lost image"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    } else {
      // Default rendering when post.condition is not null
      return (
        <>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust opacity as needed
            }}
          />
          <Box
            sx={{
              // marginTop: "100px",

              marginTop: "50px",

              backgroundColor: "#fff",
              borderRadius: "25px",
              border: " 1px solid #C1C1C1",
              width: "100%",
              height: "600px",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "70%",
                overflow: "hidden",
                padding: "40px 40px 0px 0px",
                marginBottom: "40px",
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
                    <img
                      // src={userImage}

                      src={post.userImage}
                      alt="PostedPerson"
                      style={{
                        marginRight: 0,
                        marginLeft: "15px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <Box sx={{ marginTop: "10px" }}>
                      <span
                        style={{
                          marginRight: "30px",
                          fontSize: "20px",
                          color: "#000000",
                          fontWeight: "500",
                        }}
                      >
                        {post.userName}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  maxWidth: "100%",
                  maxHeight: "480px",

                  margin: "50px 50px",
                  padding: "20px",
                  overflowY: "auto",
                }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>إسم المفقود : </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Name}
                    placeholder={post.name}
                    onChange={handleChange}
                    name="Name"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                    height: "0.5px",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>نوع المفقود : </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Condition}
                    placeholder={post.condition}
                    onChange={handleChange}
                    name="Condition"
                  />
                </Typography>

                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>عمر المفقود : </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Age}
                    placeholder={post.age}
                    onChange={handleChange}
                    name="Age"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>النوع : </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Gendre}
                    placeholder={post.gendre}
                    onChange={handleChange}
                    name="Gendre"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>المدينة : </span>
                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.City}
                    placeholder={post.city}
                    onChange={handleChange}
                    name="City"
                  />
                </Typography>
                <hr
                  style={{
                    margin: "20px -30px",
                    backgroundColor: "rgb(216 216 216 / 60%)",
                  }}
                />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  <span style={{ color: "#9093FD" }}>المواصفات : </span>

                  <Input
                    sx={{
                      width: "80%",
                      fontSize: "20px",
                      fontWeight: "400",
                      "&.MuiInput-root:before": {
                        border: "none !important", // Remove the border
                      },
                      outline: "none", // Remove the outline when focused
                    }}
                    value={editedPost.Description}
                    placeholder={post.description}
                    onChange={handleChange}
                    name="Description"
                  />
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "30%" }}>
              <input
                type="file"
                accept="image/*"
                id="imageInput"
                style={{ display: "none" }}
                name="Image" // Make sure the name attribute is set to "Image"
                onChange={handleChange}
              />
              <Box
                sx={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  background: "#EBEBEB",
                  textAlign: "center",
                  padding: "2px",
                  float: "left",
                  margin: "10px",
                  zIndex: "1000",
                }}
              >
                <IconButton onClick={onClose}>
                  <ClearIcon sx={{ fontSize: "30px", color: "#000" }} />
                </IconButton>
                <Box
                  sx={{
                    marginTop: "100px",
                    marginRight: "-15px",
                  }}
                >
                  <label htmlFor="imageInput" style={{ marginTop: "100px" }}>
                    <IconButton
                      component="span"
                      sx={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    >
                      <PhotoCameraIcon
                        sx={{ fontSize: "50px", color: "#000" }}
                      />
                    </IconButton>
                  </label>
                </Box>
              </Box>
              <Box sx={{ width: "100%", height: "100%" }}>
                <img
                  src={
                    (imageFile && URL.createObjectURL(imageFile)) ||
                    editedPost.imageUrl ||
                    defaultLostPersonImage
                  }
                  alt="lost image"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
  };
  return (
    <>
      {/* Rest of your component */}
      {renderDetails()}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
        <Button
          onClick={handleSave}
          variant="contained"
          style={{ background: "#9093FD", padding: "10px 20px" }}
        >
          حقظ التعديلات
        </Button>
      </Box>
    </>
  );
}

export default UserProfileEditPosts;
