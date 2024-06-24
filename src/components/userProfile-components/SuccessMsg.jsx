import { Box, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { useState } from "react";
import succesImg from "../../assets/profileUser/MacBook Air - 5 (2).png";
import errImg from "../../assets/profileUser/err.png";

function SuccessMsg({ succesMsg, Err }) {
  console.log(succesMsg, Err);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    console.log("e");
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
              width: {xs:"300px",md:"450px"},
              height: {xs:"200px",md:"300px"},
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
            <Typography sx={{ zIndex: "11" }}>
              {Err ? (
                <img src={succesImg} alt="succesImg" />
              ) : (
                <img src={errImg} alt="errImg" />
              )}
            </Typography>
            <Typography
              sx={{
                color: "black",

                fontSize: {xs:"25px",md:"35px"},
                fontWeight: "400",
              }}
            >
              {succesMsg}
            </Typography>
          </Box>
        </Backdrop>
      )}
    </div>
  );
}

export default SuccessMsg;
