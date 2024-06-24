import { Box, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AdminDashboardSecondNavigation from "./AdminDashboardSecondNavigation";
import PostAdminDash from "./PostAdminDash";

function AdminDashboardPostsStatistic() {
  return (
    <Box
      sx={{
        background: "#D3E4FF",
        padding: "30px",
      }}
    >
      <Box sx={{ width: "100%", height: "10%" }}>
        <AdminDashboardOuterNavigation />
      </Box>

      <Box
        sx={{
          background: "#FFF",
          height: { md: "81vh", xl: "85vh" },
          width: "100%",
          borderRadius: "35px",
          padding: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              width: "190px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#EDEEEF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "-20px",
                zIndex: "2",
              }}
            >
              <MoreTimeIcon style={{ width: "32px", height: "32px" }} />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "50px",
                backgroundColor: "#F8F9FA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "500px",
                zIndex: "1",
              }}
            >
              <Typography
                sx={{ fontSize: "15px", fontWeight: "400", color: "#252746" }}
              >
                20 April 2024
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              width: "185px",
              height: "60px",
            }}
          >
            <Box
              sx={{
                width: "140px",
                height: "50px",
                backgroundColor: "#F8F9FA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "500px",
              }}
            >
              <Typography
                sx={{ fontSize: "15px", fontWeight: "400", color: "#252746" }}
              >
                PM 12 : 07
              </Typography>
            </Box>

            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#EDEEEF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "-20px",
              }}
            >
              <MoreTimeIcon style={{ width: "32px", height: "32px" }} />
            </Box>
          </Box>
        </Box>
        <AdminDashboardSecondNavigation />
        <PostAdminDash />
      </Box>
    </Box>
  );
}

export default AdminDashboardPostsStatistic;
