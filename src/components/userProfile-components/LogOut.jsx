import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import hopeLogo from "../../assets/AuthImage/hope.png";
import addphoto from "../../assets/user profile.png";
import alert from "../../assets/profileUser/alert.png";
import Cookie from "cookie-universal";

const cookies = Cookie();

export default function LogOut({ getProfileDateEmail, popUpLogout }) {
  const user =
    localStorage.getItem("avater") == null
      ? addphoto
      : localStorage.getItem("avater");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  popUpLogout(open);
  const logout = () => {
    cookies.remove("Cookie");
    localStorage.clear();
  };
  return (
    <Backdrop
      sx={{ color: "#483131", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Card
        sx={{
          width: { xs: "350px", md: "450px",xl: "539px" },
          borderRadius: "35px",
          height: { xs: "435px", md: "500px", xl: "626px" },
          position: "relative",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap:{ xs: "20px", md: "20px", xl: "60px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "15px", md: "15px", xl: "30px" },
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <Typography
              onClick={handleClose}
              sx={{
                backgroundColor: "#EBEBEB",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "35px",
                fontWeight: "400",
                fontSize: "25px",
                position: "absolute",
                left: "20px",
                cursor: "pointer",
                top: "30px",
              }}
            >
              x
            </Typography>
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
                color: "#2E74FD",

                fontWeight: "600",
                fontSize: { xs: "12px", md: "20px",xl: "24px" },
              }}
            >
              تسجيل الخروج من الموقع
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <img
                src={user}
                alt=""
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography>{getProfileDateEmail}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "80%" }}>
            <Typography
              sx={{
                color: "#373B55",
                fontSize: { xs: "12px", md: "15px",xl: "18px"  },
                fontWeight: "400",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: {xs:"20px",md:"32px"},
              }}
            >
              <span style={{ marginLeft: "20px" }}>
                <img src={alert} alt="alert " />
              </span>
              سوف يتم تسجيل الخروج من الموقع ولكن سوف تحفظ منشوراتك ومحفوظاتك في
              حالة تسجيل الدخول مرة أخري لاحقا
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              position: "relative",
              flexDirection: "column",
              gap: "30px",
              width: "90%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
              }}
            >
              <Button
                onClick={logout}
                variant="contained"
                sx={{
                  height:{md:"50px",xl:"60px"},
                  padding: {md:"0px 30px",xl:"20px 30px"},
                  fontWeight: "700",
                  fontSize: { xs: "12px", md: "15px",xl: "22px" },
                      borderRadius: { xs: "16px", md: "15px",xl: "20px" },
                  background: "#ac2020",
                  cursor: "pointer",
                  "&.MuiButtonBase-root:hover": {
                    background: "#ac2020",
                  },
                }}
              >
                <Link to={"/"} style={{ color: "white" }}>
                  {" "}
                  تسجيل الخروج{" "}
                </Link>
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  padding: "20px 40px",
                  fontWeight: "700",
                  fontSize: "22px",
                  borderRadius: "20px",
                  color: "#2E74FD",
                  background: "none",
                  cursor: "pointer",
                  boxShadow: "none",
                  "&.MuiButtonBase-root:hover": {
                    background: "none",
                  },
                }}
              >
                إستمرار{" "}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
}
