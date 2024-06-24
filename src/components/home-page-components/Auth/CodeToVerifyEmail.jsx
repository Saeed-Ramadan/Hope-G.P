import React, { useEffect, useRef, useState } from "react";
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
  inputClasses,
} from "@mui/material";
import { color } from "framer-motion";
import gmail from "../../../assets/AuthImage/Gmail logo - United States 1.png";
import hopeLogo from "../../../assets/AuthImage/hope.png";
import { NavLink, useLocation } from "react-router-dom";
import { ConfirmationNum } from "../../../apiRequests/apiRequest";
import axios from "axios";
import ForgetPassword from "./ForgetPassword";

export default function CodeToVerifyEmail({ userEmail, checkChangePass }) {
  console.log("reseteem", userEmail);
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [msgSucc, setmsgsucc] = useState(false);
  const [msgErr, setmsgErr] = useState("");
  const length = 6;
  const [lenInp, setLeninp] = useState(new Array(length).fill(""));
  const inpRefs = useRef([]);

  useEffect(() => {
    if (inpRefs.current[5]) {
      inpRefs.current[5].children[0].children[0].focus();
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(false);
  };

  const handleChange = (i, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...lenInp];
    console.log(newOtp);
    newOtp[i] = value.substring(value.length - 1);
    setLeninp(newOtp);
    const compineOtp = newOtp.join("").split("").reverse().join("");
    if (compineOtp.length == length) {
      setOtp(compineOtp);
    }

    if (value && i > 0 && inpRefs.current[i - 1]) {
      console.log("11object");

      inpRefs.current[i - 1].children[0].children[0].focus();
    }
  };
  console.log(otp);
  const handleClick = (i) => {
    inpRefs.current[i].children[0].children[0].setSelectionRange(0, 1);
    console.log(i);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const data = {
        userEmail: userEmail,
        num: otp,
      };

      await axios
        .post(`${ConfirmationNum}`, data, {
          headers: {
            "Content-Type": "application/problem+json",
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            setmsgsucc(true);
            setmsgErr(response.data.message);
          } else {
            setmsgsucc(false);
            setmsgErr(response.data.message);
          }

          console.log("response", response.data);
        });
    } catch (err) {
      setmsgsucc(false);
      setmsgErr("حدث خطا خارجي");
      console.log(err);
      // setmsgErr("ادخل الايميل")
    }
  };
const backPrev=()=>{
  console.log("11111")
  window.history.back();
}
  return (
    <>
      {checkChangePass && <ForgetPassword userEmail={userEmail} />}
      {msgSucc ? (
        ""
      ) : (
        <Box>
          <Backdrop
            sx={{
              color: "#483131",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
          >
            {msgErr !== "" && (
              <Typography
                sx={{
                  backgroundColor: "white",
                  color: "#000",
                  width: { xs: "250px", md: "420px" },
                  height: { xs: "50px", md: "70px" },
                  position: "fixed",
                  left: { xs: "8%", sm: "34%",xl: "42%" },
                  top: "3%",
                  textAlign: "center",
                  fontSize: { xs: "15px", md: "25px" },
                  fontWeight: "400",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "111",
                  boxShadow: "0px 0px 5px 1px #1266ac",
                }}
              >
                {msgErr}
              </Typography>
            )}

            <Card
              sx={{
                width: { xs: "300px", md: "450px",xl: "739px" },
                borderRadius: "35px",
                height: { xs: "435px", md: "530px", xl: "826px" },
              }}
            >
              <Box sx={{display:'flex',
              justifyContent:"space-between",alignItems:"center",
              borderBottom: "1px solid #C9C8CE",
              }}>
              
              <CardHeader
                sx={{
                  gap: "20px",
                  color: "#000000",
                  padding: { xs: "10px", md: "15px", xl: "30px" },
                }}
                titleTypographyProps={{
                  variant: "h6",
                  fontSize: { xs: "15px",md: "18px", xl: "25px"  },
                }}
                avatar={
                  <Avatar sx={{ background: "transparent" }} variant="square">
                    <img src={gmail} alt="gmail" />
                  </Avatar>
                }
                title="تسجيل بواسطه الجيميل"
              />
              <NavLink style={{paddingLeft:"20px"}}  onClick={backPrev}>
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
                <Box>
                  <Typography>قد تم إرسال رقم للتأكيد علي حسابك</Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={HandleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "20px", md: "30px",xl: "40px"  },
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: "10px", md: "25px",xl: "40px"  },
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {lenInp.map((value, i) => {
                      return (
                        <TextField
                          key={i}
                          onChange={(e) => handleChange(i, e)}
                          onClick={() => handleClick(i)}
                          ref={(input) => (inpRefs.current[i] = input)}
                          type="text"
                          placeholder="*"
                          value={value}
                          inputProps={{
                            maxLength: 1,
                            sx: {
                              fontSize: { xs: "20px", md: "30px",xl: "40px" },
                              textAlign: "center",
                              padding: { xs: "0", md: "16.5px 14px" },
                              paddingTop: { xs: "14px", md: "35px" },
                            },
                          }}
                          sx={{
                            width: { xs: "45px", md: "55px" },
                            borderRadius: "20px",
                            fontSize: "50px",
                            textAlign: "center",
                            lineHeight: "30px",

                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": {
                                borderColor: "#252746",
                                borderRadius: "10px",
                                height: { xs: "45px", md: "70px" },
                              },
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        width: "85%",
                      }}
                    >
                      <Link href="#">إعادة إرسال رمز التأكيد</Link>
                    </Typography>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        fontSize: { xs: "12px", md: "20px" },
                        borderRadius: "20px",
                        width: "fit-content",
                        padding: "10px 20px",
                      }}
                    >
                      تأكيد الدخول
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Backdrop>
        </Box>
      )}
    </>
  );
}
