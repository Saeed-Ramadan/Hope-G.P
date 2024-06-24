import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import passwordimg from "../../../assets/Lock.png";

import gmail from "../../../assets/AuthImage/Gmail logo - United States 1.png";
import hopeLogo from "../../../assets/AuthImage/hope.png";

import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { forgetPassword } from "../../../apiRequests/apiRequest";

const ForgetPassword = ({ userEmail }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [msgErr, setmsgErr] = useState("");
  const [msgSucc, setmsgsucc] = useState(false);
  const [checkChangePass, setcheckChangePass] = useState(false);
  const [password, setpassword] = useState("");
  const handlChange = (e) => {
    setpassword(e.target.value);
  };
  console.log(userEmail, password);
  const handleEmailSubmit = async (e) => {
    console.log("clik");
    e.preventDefault();
    try {
      const data = {
        userEmail: userEmail,
        password,
      };
      await axios
        .post(`${forgetPassword}`, data, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.isSuccess) {
            setmsgsucc(true);
          } else {
            setmsgsucc(false);
            setmsgErr(response.data.message);
          }
        });
    } catch (err) {
      setmsgsucc(false);
      console.log(err);
      setmsgErr("ادخل الايميل");
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(false);
  };
  return (
    <>
      {msgSucc ? (
        ""
      ) : (
        <Backdrop
          sx={{ color: "#483131", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <Card
            sx={{
              width: { xs: "300px", md: "450px",xl: "739px" },
              borderRadius: "35px",
              height: { xs: "435px", md: "530px", xl: "826px" },
            }}
          >
            <CardHeader
              sx={{
                gap: "20px",
                borderBottom: "1px solid #C9C8CE",
                color: "#000000",
                padding: { xs: "10px", md: "15px", xl: "30px" },
              }}
              titleTypographyProps={{
                variant: "h6",
                fontSize: { xs: "12px", md: "18px", xl: "25px" },
              }}
              avatar={
                <Avatar sx={{ background: "transparent" }} variant="square">
                  <img src={gmail} alt="gmail" />
                </Avatar>
              }
              title="تسجيل بواسطه الجيميل"
            />

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: { xs: "20px", md: "20px", xl: "60px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: "15px", md: "15px", xl: "30px" },
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  alt="hope logo."
                  sx={{
                    width: { xs: "60px", md: "80px",xl: "110px"  },
                    height: { xs: "22px", md: "30px",xl: "40px" },
                    marginTop: { xs: "0px", md: "10px",xl: "20px"  },
                  }}
                  src={hopeLogo}
                ></Box>
                <Typography
                  sx={{
                    color: "#000000",

                    fontWeight: "400",
                    fontSize: { xs: "12px", md: "25px",xl: "35px" },
                  }}
                >
                  تغير كلمه السر
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",

                    fontWeight: "400",
                    fontSize: { xs: "12px", md: "18px",xl: "25px" },
                  }}
                >
                  لإستخدام Hope
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleEmailSubmit}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  position: "relative",
                  flexDirection: "column",
                  gap: { xs: "14px", md: "10px",xl: "30px"  },
                  width: { xs: "100%", md: "90%" },
                }}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": msgErr !== "" && { borderColor: "red" },
                    },
                  }}
                >
                  <OutlinedInput
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: 3,
                        fontSize: { xs: 12, md: 20,xl: 25 },
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: { xs: 12, md: 20,xl: 25 },
                        color: "#000",
                        marginLeft: -1,
                      },

                      height: { xs: 55, md: 65,xl: 95 },
                      borderRadius: { xs: 4, md: 5,xl: 8 },
                      padding: 2,
                    }}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "Password"}
                    startAdornment={
                      <IconButton aria-label="toggle" edge="end">
                        <img src={passwordimg} alt="password" />
                      </IconButton>
                    }
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{ minLength: 8 }}
                    name="password"
                    value={password}
                    onChange={handlChange}
                  />
                </FormControl>
                <Typography
                  sx={{
                    color: "red",
                    fontSize: { xs: "12px", md: "16px", xl: "20px" },
                    fontWeight: "400",
                  }}
                >
                  {msgErr}
                </Typography>
                <Box sx={{ width: "80%" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: "10px 40px",
                      fontWeight: "700",
                      fontSize: { xs: "12px", md: "15px",xl: "20px" },
                      borderRadius: { xs: "16px", md: "15px",xl: "20px" },
                    }}
                  >
                    تغيير{" "}
                  </Button>
                </Box>
              </Box>

              <Box sx={{ width: "80%" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", md: "15px",xl: "25px"  },
                    fontWeight: "400",
                  }}
                >
                  للمتابعة، سوف تشارك اسمك، عنوان البريد الإلكتروني، وتفضيلات
                  اللغة، صورة الملف الشخصي مع Hope. قبل استخدام هذا الموقع،
                  يمكنك مراجعة
                  <Link sx={{ marginRight: "10px" }}>سياسة الخصوصية </Link>و
                  <Link>شروط الخدمة.</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Backdrop>
      )}
    </>
  );
};

export default ForgetPassword;
