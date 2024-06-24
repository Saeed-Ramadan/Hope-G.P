import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Avatar,
  Box,
  Button,

  Card,
  CardContent,
  CardHeader,

  Link,

  Typography,
} from "@mui/material";

import gmail from "../../../assets/AuthImage/Gmail logo - United States 1.png";
import hopeLogo from "../../../assets/AuthImage/hope.png";

import personVector from "../../../assets/AuthImage/UserCircle.png";

export default function ResetPasswortChoiseEmail() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#483131", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Card sx={{ width: "739px", borderRadius: "35px", minHeight: "826px" }}>
          <CardHeader
            sx={{
              gap: "20px",
              borderBottom: "1px solid #C9C8CE",
              color: "#000000",
              padding: "30px",
            }}
            titleTypographyProps={{ variant: "h6", fontSize: "25px" }}
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
              gap: "60px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                alt="hope logo."
                sx={{
                  width: "110px",
                  height: "40px",
                  marginTop: "20px",
                }}
                src={hopeLogo}
              ></Box>
              <Typography
                sx={{
                  color: "#000000",

                  fontWeight: "400",
                  fontSize: "35px",
                }}
              >
                اختر الجيميل
              </Typography>
              <Typography
                sx={{
                  color: "#000000",

                  fontWeight: "400",
                  fontSize: "25px",
                }}
              >
                للاستمرار في Hope
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CardHeader
                sx={{
                  gap: "20px",
                  borderBottom: "1px solid #C9C8CE",
                  color: "#000000",
                  padding: "30px",
                  width: "500px",
                }}
                titleTypographyProps={{ variant: "h6", fontSize: "25px" }}
                subheaderTypographyProps={{ variant: "h6", fontSize: "25px" }}
                avatar={
                  <Avatar
                    sx={{ background: "transparent", marginRight: "-45px" }}
                  >
                    <img src={personVector} alt="personVector" />
                  </Avatar>
                }
                title=" احمد صلاح"
                subheader="ahemd@gmail"
              />
              <CardHeader
                sx={{
                  gap: "20px",
                  borderBottom: "1px solid #C9C8CE",
                  color: "#000000",
                  padding: "30px",
                  width: "500px",
                }}
                titleTypographyProps={{ variant: "h6", fontSize: "25px" }}
                subheaderTypographyProps={{ variant: "h6", fontSize: "25px" }}
                avatar={
                  <Avatar
                    sx={{ background: "transparent", marginRight: "-45px" }}
                  >
                    <img src={personVector} alt="personVector" />
                  </Avatar>
                }
                title=" اختر حساب اخر "
              />
            </Box>
            <Box sx={{ width: "80%" }}>
              <Button
                variant="contained"
                sx={{
                  padding: "10px 40px",
                  fontWeight: "700",
                  fontSize: "20px",
                  borderRadius: "20px",
                }}
              >
                التالي{" "}
              </Button>
            </Box>
            <Box sx={{ width: "80%" }}>
              <Typography sx={{ fontSize: "25px", fontWeight: "400" }}>
                للمتابعة، سوف تشارك اسمك، عنوان البريد الإلكتروني، وتفضيلات
                اللغة، صورة الملف الشخصي مع Hope. قبل استخدام هذا الموقع، يمكنك
                مراجعة
                <Link sx={{ marginRight: "10px" }}>سياسة الخصوصية </Link>و
                <Link>شروط الخدمة.</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Backdrop>
    </Box>
  );
}
