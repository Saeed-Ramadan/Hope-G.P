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
import addphoto from "../../assets/creatPostImage/add photo.png";

const CreatePostPeople = ({ getDataForLosePeople }) => {
  const [UploadImg, setUpladImg] = useState(addphoto);
  const [Name, setName] = useState("");
  const [condition, setcondition] = useState("");
  const [Gendre, setGendre] = useState("");
  const [Age, setAge] = useState("");
  const [Description, setDescription] = useState("");
  const [imagePhoto, setimagePhoto] = useState("");

  getDataForLosePeople(Name, condition, Gendre, Age, Description, imagePhoto);
  const handleimge = (e) => {
    const reader = new FileReader();

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
          width: {xs:"100%",md:"68%",xl:"60%"},
          // height:"836px",
          borderRadius: "25px",
          padding: "2rem",
          paddingBottom: "5rem",
          display: "flex",
          flexDirection: "column",
          gap:{xs:"30px",md:"30px",xl:"60px"},
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography sx={{ fontSize:{xs:"18px",md:"20px",xl:'30px'}, fontWeight: "400" }}>
            إسم الشخص المفقود{" "}
          </Typography>

          <TextField
            name="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: {xs:"100%",md:"600px",xl:"800px"},

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
                borderRadius:"10px",
                paddingTop: {md:"30px",xl:"35px"},
                fontSize:{xs:"15px",md:"20px",xl:"30px"},
                fontWeight: "400",
              },
            }}
            placeholder="أدخل إسم المفقود  "
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" 
                sx={{ marginTop: "15px" }}>
                  <img src={user} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography sx={{ fontSize:{xs:"15px",md:"20px",xl:"30px"}, fontWeight: "400" }}>
            حدد نوع حالة المفقود{" "}
          </Typography>
          <FormControl
            sx={{
              borderRadius: "100px",
              
              width: {xs:"100%",md:"600px",xl:"800px"},
              
              "& .MuiOutlinedInput-input": {
               padding:{xs:"6.5px 14px",md:"16.5px 14px"}
              },
              "& .MuiOutlinedInput-root": {
                
                "& > fieldset": {
                  borderRadius: {xs:"20px",md:"20px",xl:"30px"},
                  height: {xs:"50px",md:"65px",xl:"85px"},
                  backgroundColor: "#ffffff42",
                  
                 
                },
              },
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{fontSize:{md:"20px",xl:"30px"}, fontWeight: "400" ,marginTop:{xs:"0px",md:"0px"}}}
            >
              إختر نوع حالة المفقود
            </InputLabel>
            <Select
              name="condition"
              value={condition}
              onChange={(e) => setcondition(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                fontSize: "30px",
                fontWeight: "400",
                
              }}
              label="Age"
            >
              <MenuItem value={"Losties "}>شخص تائه</MenuItem>
              <MenuItem value={"Accidents"}>حوادث</MenuItem>
              <MenuItem value={"Shelters"}>ملاجئ</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: {xs:"30px",md:"30px",xl:"60px"} }}>
          <Box>
            <Typography sx={{ fontSize:{md:"20px",xl:"30px"},fontWeight: "400" }}>
              نوع المفقود{" "}
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "50px",
              }}
            >
              <FormControlLabel
                sx={{
                  color: "#2E74FD",
                  "& .MuiFormControlLabel-label": {
                    fontWeight: "600",
                    fontSize:{md:"20px",xl:"25px"},
                  },
                }}
                value=" ذكر"
                control={<Radio />}
                label="ذكر   "
                onChange={() => setGendre("male")}
              />
              <FormControlLabel
                sx={{
                  color: "#2E74FD",
                  "& .MuiFormControlLabel-label": {
                    fontWeight: "600",
                    fontSize:{md:"20px",xl:"25px"},
                  },
                }}
                value=" انثي  "
                control={<Radio />}
                label=" انثي  "
                onChange={() => setGendre("female")}
              />
            </RadioGroup>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", }}>
            <Typography sx={{  fontSize:{md:"20px",xl:"30px"},fontWeight: "400" }}>
              عمر الشخص المفقود
            </Typography>

            <TextField
              name="Age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              sx={{
                width: {xs:"100%",md:"400px"},

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
                  paddingTop: {md:"30px",xl:"35px"},
                  fontSize: {md:"20px",xl:"35px"},
                  fontWeight: "400",
                },
              }}
              placeholder="   السنه "
              type="number"
              InputProps={{}}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography sx={{  fontSize: {md:"20px",xl:"30px"}, fontWeight: "400" }}>
              مواصفات المفقود
            </Typography>

            <TextField
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                width: {md:"600px",xl:"800px"},

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
                  paddingTop: {md:"30px",xl:"35px"},
                  fontSize: {md:"20px",xl:"30px"},
                  fontWeight: "400",
                },
              }}
              placeholder="مواصفات المفقود "
              InputProps={{}}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: {xs:"100%",md:"30%",xl:"35%"},
          height: {xs:"350px",md:"500px",xl:"900px"},
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
          أضف صورة المفقود
        </label>
      </Box>
    </Box>
  );
};

export default CreatePostPeople;
