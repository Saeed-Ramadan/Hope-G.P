import { Box, Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import succesImg from "../../assets/profileUser/MacBook Air - 5 (2).png";
import errImg from "../../assets/profileUser/err.png";

export default function ChangeImge({ UploadImg, handlSendImg }) {
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
              maxWidth: {xs:"200px",md:"500px"},
              maxHeight: {xs:"400px",md:"800px"},
            }}
          >
            <img src={UploadImg} alt="UploadImg" />
            <button
              onClick={handlSendImg}
              style={{
                background: "#2E74FD",
                color: "white",
                borderRadius: "10px",
                width: "fit-content",
                margin: "0 auto",
                padding: "15px 50px",
                fontSize: "20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </Box>
        </Backdrop>
      )}
    </div>
  );
}
