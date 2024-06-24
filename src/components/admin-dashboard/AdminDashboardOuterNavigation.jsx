import { NavLink, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import LogOut from "../userProfile-components/LogOut";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import statisticAll from "../../assets/admin/statisticAll.png";
import statisticsUP from "../../assets/admin/statisticsUP.png";
import Logo from "../home-page-components/Logo";
import userProfile from "../../assets/profileUser/user_profile.png";
function Navigationbar({ to, children }) {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      style={{
        backgroundColor: match ? "#F68084" : "#fff", // Conditionally set background color
        color: "#fff", // Adjust the text color as needed
        textDecoration: "none",
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

function AdminDashboardOuterNavigation() {
  const [openPopUp, setopenPopUp] = useState(false);
  const profile = localStorage.getItem("avater");
  console.log("profile", profile);
  const navigationBarData = [
    {
      title: "الاعدادات",
      path: "/adminDashboard/adminSetting",
    },
    {
      title: "المستخدمين",
      path: "/adminDashboard/users",
    },
    {
      title: "المشرفين",
      path: "/adminDashboard/admins",
    },

    {
      img: statisticsUP,
      path: "/adminDashboard/adminDashboardPostsStatistic",
    },
    {
      img: statisticAll,
      path: "/adminDashboard/adminDashboardGeneralStatistic",
    },
  ];
  const popUpLogout = () => {
    setopenPopUp(true);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <img
            src={profile ? profile : userProfile}
            style={{ width: "65px", height: "65px", borderRadius: "50%" }}
            alt="user profile image"
          />
          <Box
            sx={{
              width: "60px",
              height: "60px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "2px solid #DEDEDEB2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotificationsNoneIcon style={{ width: "28px", height: "28px" }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "749px",
            height: "83px",
            borderRadius: "100px",
            backgroundColor: "#303030",
            padding: "20px",
          }}
        >
          <SearchIcon
            style={{ width: "40px", height: "40px", color: "#fff" }}
          />
          {navigationBarData.map((data, index) => (
            <Box key={index}>
              <Navigationbar to={data.path}>
                <Box>
                  {data.img ? (
                    <Box
                      sx={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        border: "1px solid #C1C1C1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#fff",
                      }}
                    >
                      <img
                        src={data.img}
                        style={{
                          width: "28px",
                          height: "28px",
                        }}
                        alt="user profile image"
                      />
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "20px", color: "#ffff" }}>
                      {data.title}
                    </Typography>
                  )}
                </Box>
              </Navigationbar>
            </Box>
          ))}
        </Box>
        <Box>
          <Logo />
        </Box>

        {/* <Box
          onClick={popUpLogout}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "calc(100vh - 700px)",
          }}
        >
          logout
          {openPopUp && <LogOut getProfileDateEmail={getProfileDateEmail} />}
        </Box> */}
      </Box>
    </Box>
  );
}

export default AdminDashboardOuterNavigation;
