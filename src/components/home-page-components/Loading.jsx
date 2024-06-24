import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function Loading({ succesOrFAIL }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        style={{ opacity: 1, visibility: "visible" }}
      >
        <Typography
          sx={{
            backgroundColor: "#C1C1C1BF",
            color: "white",
            width: "720px",
            height: "180px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            textAlign: "center",
            lineHeight: "180px",
            fontSize: "35px",
            fontWeight: "400",
            borderRadius: "20px",
          }}
        >
          {succesOrFAIL}
        </Typography>
      </Backdrop>
    </div>
  );
}
