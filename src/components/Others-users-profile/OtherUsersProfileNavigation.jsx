import { NavLink, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

import userProfile from "../../assets/user profile.png";

// import axios from 'axios';

function Navigationbar({ to, children }) {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      style={{
        backgroundColor: match ? "#fff" : "#000",
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

function OtherUsersProfileNavigation() {
  const profile = localStorage.getItem("avater");

  const navigationBarData = [];
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{}}>
        {" "}
        {/* Wrap the profile image with NavLink */}
        <Box
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
            marginBottom: { md: "150px", xs: "0px" },
          }}
        >
          <Box
            component="img"
            src={profile || userProfile}
            sx={{
              width: { md: "75px", xs: "50px" },
              height: { md: "75px", xs: "50px" },
              borderRadius: "50%",
            }}
            alt="user profile image"
          />
        </Box>
        {navigationBarData.map((data, index) => (
          <Box key={index}>
            <Navigationbar to={data.path}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "50px",
                }}
              >
                <Box
                  sx={{
                    width: "57px",
                    height: "57px",
                    borderRadius: "10px",
                    border: "1px solid #C1C1C1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
              </Box>
            </Navigationbar>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default OtherUsersProfileNavigation;
