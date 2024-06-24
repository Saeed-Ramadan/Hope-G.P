import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import user from "../../assets/creatPostImage/User.png";
import devices from "../../assets/creatPostImage/Devices.png";

const CreatePostThings = ({ getDataForthings }) => {
  const [UploadImg, setUpladImg] = useState(devices);
  const [type, settype] = useState("");
  const [Description, setDescription] = useState("");
  const [imagePhoto, setimagePhoto] = useState("");
  getDataForthings(type, Description, imagePhoto);
  const handleimge = (e) => {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpladImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setimagePhoto(e.target.files[0]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:{xs:"column",md:"row"},
        gap:{xs:"30px",md:"0"},
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F1F4FC",
          width:{xs:"100%",md:"58%"},
          height: {xs:"fit-content",md:"480px"},
          borderRadius: "25px",
          padding: "2rem",
          paddingBottom: "5rem",
          display: "flex",
          flexDirection: "column",
          gap: {xs:"40px",md:"60px"},
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography sx={{ fontSize:{xs:"20px",md:"25px",xl:"30px"}, fontWeight: "400" }}>
            نوع المتعلق المفقود{" "}
          </Typography>

          <TextField
            value={type}
            onChange={(e) => settype(e.target.value)}
            sx={{
              width: {md:"100%",xl:"90%"},

              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderRadius: {xs:"20px",md:"20px",xl:"30px"},
                  height: {xs:"50px",md:"65px",xl:"85px"},
                  color: "#000",
                  backgroundColor: "#ffffff42",
                },
              },
            }}
            inputProps={{
              sx: {
                borderRadius:{md:"0px",xl:"10px"},
                paddingTop: {xs:"20px",md:"30px",xl:"35px"},
                fontSize: {xs:"18px",md:"20px",xl:"30px"},
                fontWeight: "400",
              },
            }}
            placeholder="نوع الشئ المفقود    "
            type="text"
            InputProps={{}}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography sx={{ fontSize:{xs:"20px",md:"25px",xl:"30px"}, fontWeight: "400" }}>
            مواصفات المفقود
          </Typography>

          <TextField
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              width: {md:"100%",xl:"90%"},

              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderRadius: {xs:"20px",md:"20px",xl:"30px"},
                  height: {xs:"50px",md:"65px",xl:"85px"},
                  color: "#000",
                  backgroundColor: "#ffffff42",
                },
              },
            }}
            inputProps={{
              sx: {
                borderRadius: "10px",
                paddingTop: {xs:"20px",md:"30px",xl:"35px"},
                fontSize: {md:"20px",xl:"30px"},
                fontWeight: "400",
              },
            }}
            placeholder="مواصفات الشئ المفقود"
            type="text"
            InputProps={{}}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: {xs:"100%",md:"40%"},
          height: {xs:"350px",md:"480px"},
          borderRadius: "35px",
          border: "3px dashed #2555FF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={UploadImg}
            alt="addphoto"
            style={{
              width: "90%",
              height: "90%",
              padding: "1px",
              borderRadius: "35px",
              objectFit: "contain",
            }}
          />
        </Box>

        <input
          style={{ display: "none" }}
          type="file"
          name="image-upload"
          id="input"
          accept="image/*"
          onChange={handleimge}
        />
        <label
          style={{
            background: "#5D8AFF",
            color: "#fff",
            borderRadius: "25px",
            fontSize: "20px",
            fontWeight: "400",
            padding: ".5rem 2rem",
            cursor: "pointer",
          }}
          htmlFor="input"
        >
          أضف صورة المتعلق
        </label>
      </Box>
    </Box>
  );
};

export default CreatePostThings;
