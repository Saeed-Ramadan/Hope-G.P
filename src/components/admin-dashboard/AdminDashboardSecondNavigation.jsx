import { Box, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";
import PropTypes from "prop-types";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { NavLink, useMatch } from "react-router-dom";
function Navigationbar({ to, children }) {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      style={{
        backgroundColor: match ? "#F68084" : "#fff", // Conditionally set background color
        color: "#fff", // Adjust the text color as needed
        textDecoration: match ? "none" : "block",
      }}
    >
      {children}
    </NavLink>
  );
}

Navigationbar.propTypes = {
  to: PropTypes.string.isRequired, // Validate that 'to' is a required string prop
  children: PropTypes.node.isRequired, // Validate that 'children' is a required node prop
};
function AdminDashboardSecondNavigation() {
  const navigationBarData = [
    {
      title: "المنشورات",
      path: "/adminDashboard/adminDashboardPostsStatistic",
    },
    {
      title: "المستخدمين",
      path: "/adminDashboard/adminDashboardUsersStatistic",
    },
  ];
  return (
    <Box
      sx={{
        padding: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // marginBottom: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "284px",
            padding: "20px",
          }}
        >
          {navigationBarData.map((data, index) => (
            <Box key={index}>
              <Navigationbar to={data.path}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "20px", color: "#252746" }}>
                    {data.title}
                  </Typography>
                </Box>
              </Navigationbar>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboardSecondNavigation;
