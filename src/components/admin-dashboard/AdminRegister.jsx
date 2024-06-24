import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import google from "../../assets/google.png";

import username from "../../assets/User.png";
import email from "../../assets/email.png";
import password from "../../assets/Lock.png";
import city from "../../assets/government.png";
import fingerprint from "../../assets/Fingerprint.png";
import phone from "../../assets/Phone.png";

import axios from "axios";

import Cookie from "cookie-universal";

import { AdminRegisterApi, getAllCities } from "../../apiRequests/apiRequest";
import SuccessOrFailMsg from "../SuccessOrFailMsg";

const AdminRegister = () => {
  const [getCity, setGetCity] = useState([]);
  const [ErrForImg, setErrForImg] = useState(false);

  useEffect(() => {
    axios.get(`${getAllCities}`, {}).then((response) => {
      setGetCity(response.data.data);
    });
  }, []);
  const [userData, setUserData] = useState({
    UserName: "",
    DisplayName: "",
    City: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [err, setErr] = useState(false);
  const [MatchPassword, setMatchPassword] = useState("");
  const [succesOrFAIL, setsuccesOrFAIL] = useState("");
  const [showErrname, setShowErrname] = useState("");
  const [showErrnum, setShowErrnum] = useState("");
  const [showErremail, setShowErremail] = useState("");
  const [showErrpass, setShowErrpass] = useState("");
  const [msg, setmsg] = useState(false);
  const [msgforsuccess, setMsgforsuccess] = useState(false);
  // const refForm = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cookies = Cookie();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    const { name, value, type, checked } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (userData.Password !== userData.ConfirmPassword) {
      setMatchPassword("Passwords do not match.");
    }

    try {
      const formData = new FormData();
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      await axios
        .post(`${AdminRegisterApi}`, formData, {
          headers: {
            "Content-Type": "application/problem",
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            setmsg(true);
            setMsgforsuccess(false);
            setsuccesOrFAIL("تم التسجيل بنجاح");
            window.location.pathname = "adminDashboard/admins";
            setErrForImg(true);
          } else {
            setMsgforsuccess(false);
            setmsg(true);

            const finalRes = response.data.data;
            if (finalRes != null) {
              finalRes.map((resErr) => {
                if (resErr == "هذا الرقم مستخدم بالفعل") {
                  setShowErrnum(resErr);
                } else if (resErr == "هذا البريد الاليكترونى مستخدم بالفعل") {
                  setShowErremail(resErr);
                } else if (
                  resErr ==
                  " يجب ان تتكون كلمة المرور من 8 احرف على الاقل وتحتوى على رمز وحرف كبير وحرف صغير و رقم"
                ) {
                  setShowErrpass(resErr);
                } else if (resErr == "هذا الاسم مستخدم  بالفعل") {
                  setShowErrname(resErr);
                }
              });
            }

            if (response.data.data == null) {
              setsuccesOrFAIL(response.data.message);
            } else {
              setsuccesOrFAIL(response.data.data[0]);
              setmsg(true);
            }
          }
        });
    } catch (err) {
      if (
        userData.UserName == "" ||
        userData.DisplayName == "" ||
        userData.City == "" ||
        userData.PhoneNumber == "" ||
        userData.Password == "" ||
        userData.ConfirmPassword == ""
      ) {
        setmsg(true);
        setsuccesOrFAIL("ادخل جميع الحقول");
      } else {
        setmsg(false);
      }
    }
  };

  return (
    <>
      {msg && (
        <SuccessOrFailMsg
          succesOrFAIL={succesOrFAIL}
          ErrForImg={ErrForImg}
          setmsg={setmsg}
        />
      )}
      <Box>
        <Typography
          sx={{
            fontSize: { xl: "30px", md: "25px" },
            fontWeight: "600",
            color: "#2E74FD",
          }}
        >
          إضافة بيانات المشرف
        </Typography>
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            // ref={refForm}
            noValidate
            onSubmit={handleRegisterSubmit}
            sx={{
              mt: 5,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { lg: "30px", md: "40px" },
              width: "90%",

              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "50px",
              }}
            >
              <FormControl
                // variant="outlined"
                fullWidth
              >
                <TextField
                  fullWidth
                  id="UserName"
                  label="اسم المستخدم"
                  name="UserName"
                  required
                  value={userData.UserName}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: {
                      fontSize: 30,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 55, md: 50, xl: 80 },
                      borderRadius: { xs: 5, md: 10 },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },

                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": showErrname !== "" && {
                        borderColor: "red",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle">
                          <img src={username} alt="userName" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl
                // variant="outlined"
                fullWidth
              >
                <TextField
                  fullWidth
                  id="DisplayName"
                  label=" اسم المستخدم الحقيقى"
                  name="DisplayName"
                  required
                  value={userData.DisplayName}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 55, md: 50, xl: 80 },
                      borderRadius: { xs: 5, md: 10 },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 30,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle">
                          <img src={username} alt="DisplayNAme" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "50px",
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: { xs: 55, md: 50, xl: 80 },
                    borderRadius: { xs: 5, md: 10 },
                  },
                  "& .MuiInputBase-input": {
                    padding: 3,
                    fontSize: { xs: 15, md: 35 },
                  },
                }}
              >
                <InputLabel
                  htmlFor="City"
                  sx={{ background: "white", fontSize: "30px" }}
                >
                  اختر محافظتك
                </InputLabel>
                <Select
                  fullWidth
                  label="اختر محافظتك"
                  name="City"
                  required
                  value={userData.City}
                  onChange={handleInputChange}
                  input={
                    <OutlinedInput
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton aria-label="toggle">
                            <img src={city} alt="City" />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  }
                  IconComponent={() => null} // This line removes the dropdown arrow
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Set the max height to control the number of visible items
                        borderRadius: 16,
                        marginTop: { xs: "100px" },
                        fontSize: "35px",
                      },
                    },
                  }}
                >
                  {getCity.map((item) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "30px" }}
                        key={item.id}
                        value={item.name}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                // variant="outlined"
                fullWidth
              >
                <TextField
                  fullWidth
                  id="Email"
                  label="الايميل"
                  name="Email"
                  type={"email"}
                  required
                  value={userData.Email}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: {
                      fontSize: 30,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 55, md: 50, xl: 80 },
                      borderRadius: { xs: 5, md: 10 },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },

                    "& .MuiOutlinedInput-root": {
                      //    "& > fieldset":showErremail!=="" && {borderColor:"red"}
                    },
                    // "& .MuiFormLabel-root": {
                    //   fontSize: 25,
                    //   color: "#000",
                    //   marginLeft: -1,
                    // },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle">
                          <img src={email} alt="Email" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "50px",
              }}
            >
              <FormControl
                // variant="outlined"
                fullWidth
              >
                <TextField
                  fullWidth
                  id="PhoneNumber"
                  label="رقم الهاتف"
                  name="PhoneNumber"
                  required
                  value={userData.PhoneNumber}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: {
                      fontSize: 30,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 55, md: 50, xl: 80 },
                      borderRadius: { xs: 5, md: 10 },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },

                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": showErrnum !== "" && {
                        borderColor: "red",
                      },
                    },
                    // "& .MuiFormLabel-root": {
                    //   fontSize: 25,
                    //   color: "#000",
                    //   marginLeft: -1,
                    // },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle">
                          <img src={phone} alt="PhoneNumber" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  InputLabelProps={{
                    style: {
                      fontSize: 30,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: { xs: 15, md: 35 },
                      color: "#000",
                      marginLeft: -1,
                    },

                    "& .MuiOutlinedInput-root": {
                      //    "& > fieldset":showErrpass!=="" && {borderColor:"red"}
                    },
                    height: { xs: 55, md: 50, xl: 80 },
                    borderRadius: { xs: 5, md: 10 },
                    padding: 2,
                  }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "Password"}
                  startAdornment={
                    <IconButton aria-label="toggle" edge="end">
                      <img src={password} alt="Password" />
                    </IconButton>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle Password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="Password"
                  required
                  value={userData.Password}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 8 }}
                />
                <InputLabel
                  sx={{ fontSize: "30px" }}
                  htmlFor="outlined-adornment-password"
                >
                  كلمة المرور
                </InputLabel>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "50%",
                gap: "50px",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 15, md: 35 },
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: { xs: 15, md: 35 },
                      color: "#000",
                      marginLeft: -1,
                    },
                    height: { xs: 55, md: 50, xl: 80 },
                    borderRadius: { xs: 5, md: 10 },
                    padding: 2,
                  }}
                  id="outlined-adornment-password confirmPassword"
                  type={showConfirmPassword ? "text" : "Password"}
                  startAdornment={
                    <IconButton aria-label="toggle" edge="end">
                      <img src={fingerprint} alt="Password" />
                    </IconButton>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="confirmPassword"
                  name="ConfirmPassword"
                  value={userData.ConfirmPassword}
                  onChange={handleInputChange}
                  required
                  inputProps={{ minLength: 8 }}
                />
                <InputLabel
                  sx={{ fontSize: "30px" }}
                  htmlFor="outlined-adornment-password"
                >
                  تأكيد كلمة المرور
                </InputLabel>
              </FormControl>
              {/*
            {MatchPassword == "" ? (
              ""
            ) : (
              <Typography
                sx={{ fontSize: "20px", fontWeight: "400", color: "red" }}
              >
                {MatchPassword}
              </Typography>
            )} */}
            </Box>
            <Box>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  borderColor: "#53E0FF",
                  borderRadius: 100,
                  width: 390,
                  height: { xl: 80, md: 40 },

                  color: "#D3D3D3",
                  fontFamily: "Inter",
                  fontSize: { xl: "30px", md: "20px" },
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  textTransform: "capitalize",
                  background: "#2E74FD",
                }}
              >
                تسجيل الدخول
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminRegister;
