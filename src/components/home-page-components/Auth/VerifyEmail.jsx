import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { color } from "framer-motion";
import gmail from "../../../assets/AuthImage/Gmail logo - United States 1.png";
import hopeLogo from "../../../assets/AuthImage/hope.png";
import EmailVector from "../../../assets/AuthImage/EMAILVector.png";
import axios from "axios";
import { SendEmail } from "../../../apiRequests/apiRequest";
import CodeToResetPass from "./CodeToVerifyEmail";
import CodeToVerifyEmail from "./CodeToVerifyEmail";
import { NavLink } from "react-router-dom";

export default function VerifyEmail({ compareEmail }) {
  const [open, setOpen] = useState(true);
  const [userEmail, setuserEmail] = useState("");
  const [msgErr, setmsgErr] = useState("");
  const [msgSucc, setmsgsucc] = useState(false);

  const handleChange = (e) => {
    setuserEmail(e.target.value);
  };
  compareEmail(userEmail);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setmsgErr("");
    setmsgsucc(false);
    try {
      const data = {
        userEmail: userEmail,
      };

      await axios
        .post(`${SendEmail}`, data, {
          headers: {
            "Content-Type": "application/problem+json",
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          if (response.data.statusCode == 200) {
            setmsgsucc(true);
          } else if (response.data.StatusCode == 400) {
            setmsgsucc(false);
            if (userEmail == "") {
              setmsgErr("ادخل الايميل");
            }
          }
        });
    } catch (err) {
      setmsgsucc(false);
      console.log(err);
      setmsgErr("ادخل الايميل");
    }
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
        <CodeToVerifyEmail userEmail={userEmail} />
      ) : (
        <Box>
          <Backdrop
            sx={{
              color: "#483131",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
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
              <Box sx={{display:'flex',
              justifyContent:"space-between",alignItems:"center", 
              borderBottom: "1px solid #C9C8CE",}}>
              <CardHeader
                sx={{
                  gap: { xs: "50px", md: "20px" },
                
                  color: "#000000",
                  padding: { xs: "10px", md: "15px", xl: "30px" },
                }}
                titleTypographyProps={{
                  variant: "h6",
                  fontSize: { xs: "15px", md: "18px", xl: "25px" },
                }}
                avatar={
                  <Avatar sx={{ background: "transparent" }} variant="square">
                    <img src={gmail} alt="gmail" />
                  </Avatar>
                }
                title="تسجيل بواسطه الجيميل"
              />
              <NavLink style={{paddingLeft:"20px"}}  to={"/login"}>
                السابق
              </NavLink>
              </Box>
           
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
                    سجل الدخول
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
                    gap: { xs: "10px", md: "10px",xl: "30px"  },
                    
                  }}
                >
                  <Box
                    component="img"
                    src={EmailVector}
                    alt="EmailVector"
                    sx={{
                      position: "absolute",
                      right: { xs: "10px", md: "20px" },
                      top: { xs: "13%", md: "12%", xl: "6%" },
                      zIndex: "11",
                      width: { xs: "20px", md: "30px", xl: "50px"  },
                    }}
                  ></Box>
                  <TextField
                    type="email"
                    placeholder="أدخل حسابك"
                    value={userEmail}
                    name="userEmail"
                    onChange={handleChange}
                    inputProps={{
                      sx: {
                        fontSize: { xs: "12px", md: "18px", xl: "20px" },
                        textAlign: "start",
                        marginRight: { xs: "30px", md: "50px" },
                        padding: { xs: "20px", md: "30px 50px" },
                      },
                    }}
                    sx={{
                      width: { md: "400px",xl: "500px" },
                      borderRadius: "20px",
                      fontSize: { xs: "10px", md: "50px" },
                      textAlign: "center",
                      lineHeight: "30px",

                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": msgErr !== "" && { borderColor: "red" },
                        borderRadius: "10px",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: { md: "20px" },
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
                      التالي{" "}
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ width: { xs: "100%", md: "80%" } }}>
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
        </Box>
      )}
    </>
  );
}
