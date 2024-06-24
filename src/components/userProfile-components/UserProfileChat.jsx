import { Box, Grid, Typography } from "@mui/material";
import UserProfileNavigation from "./UserProfileNavigation";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
function UserProfileChat() {
  return (
    <Grid
      container
      className="grid"
      sx={{ background: "#c1c1c147", padding: "50px 50px 50px 0" }}
    >
      <Grid
        item
        xs={11}
        sx={{
          background: "#FFF",
          gap: "50px",
          height: "calc(100vh - 100px)",
          width: "1242px",
          borderRadius: "35px",
          padding: "20px",
        }}
      >
          <Box>
          <Link to="/HomePage" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                width: "200px",
                height: "50px",
                borderRadius: "50px",
                background: "#EBEBEB",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#171938",
                  fontWeight: "600",
                }}
              >
                الصفحة الرئيسية
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "80px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "25px", fontWeight: "600", color: "#2E74FD" }}
            >
              الدردشة
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          className="grid"
          sx={{ gap: "80px", padding: "50px 50px 50px 0" }}
        >
          <Grid
            item
            xs={8}
            sx={{
              background: "#F5F5FA",
              height: "calc(100vh - 300px)",
              // width: "800px",
              borderRadius: "35px",
              padding: "20px",
            }}
          >
            UserProfileChat
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                background: "#FFF",
                display: "grid",
                height: "calc(100vh - 300px)",
                border: "1px solid #C1C1C1",
                // width: "800px",
                borderRadius: "35px",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "50px",
                }}
              >
                <SettingsIcon
                  sx={{
                    color: "#9747FF",
                    alignItems: "center",
                    fontSize: "35px",
                  }}
                />
                <Typography
                  sx={{ fontSize: "25px", fontWeight: "600", color: "#2E74FD" }}
                >
                  Chats
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Box sx={{ display: "grid" }}>
          <UserProfileNavigation />
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfileChat;
