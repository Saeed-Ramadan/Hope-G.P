import { Box, Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import succesImg from "../assets/profileUser/MacBook Air - 5 (2).png";
import errImg from "../assets/profileUser/err.png";

export default function SuccessOrFailMsg({ succesOrFAIL, ErrForImg, setmsg }) {
  console.log("succesOrFAIL", succesOrFAIL);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setmsg(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {open && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
          style={{ opacity: 1, visibility: "visible" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: { xs: "250px", md: "350px",xl: "450px" },
              height: { xs: "200px", md: "250px" ,xl: "300px" ,},
              position: "absolute",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              textAlign: "center",
              lineHeight: "300px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              open={open}
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
                top: "20px",
                color: "#000",
                cursor: "pointer",
              }}
            >
              x
            </Typography>
            <Typography
              sx={{
                zIndex: "11",
                width: { xs: "50px", md: "80px",xl: "100px" },
                height: { xs: "50px", md: "80px",xl: "100px" },
              }}
            >
              {ErrForImg ? (
                <img
                  src={succesImg}
                  alt="succesImg"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <img
                  src={errImg}
                  alt="errImg"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </Typography>
            <Typography
              sx={{
                color: "black",

                fontSize: { xs: "20px", md: "25px",xl: "35px" },
                fontWeight: "400",
              }}
            >
              {succesOrFAIL}
            </Typography>
          </Box>
        </Backdrop>
      )}
    </div>
  );
}
