import { Link, NavLink, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

import userProfile from "../../assets/user profile.png";
import userProfileDataImage from "../../assets/userProfileData.png";
import userProfilePostsImage from "../../assets/userProfilePosts.png";
import userProfileLogout from "../../assets/logout.png";
import togglebar from "../../assets//toggleBar.png";
import homepag from "../../assets//homeP.png";
import LogOut from "./LogOut";
import { useState } from "react";

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

function   UserProfileNavigation({ getProfileDateEmail }) {
  console.log(getProfileDateEmail);
  const [openPopUp, setopenPopUp] = useState(false);
  const [toggleOpen, setotoggleOpen] = useState(false);
  const profile = localStorage.getItem("avater");

  const navigationBarData = [
    {
      img: userProfileDataImage,
      path: "/userProfileData",
    },

    {
      img: userProfilePostsImage,
      path: "/userProfilePosts",
    },
  ];
  const popUpLogout = (data) => {
    setopenPopUp(data);
  };
  const toggle=()=>{
    setotoggleOpen((prev)=>!prev)
  }
  console.log(toggleOpen)
  return (
    <Box sx={{position: "relative",}}>
      <Box sx={{background: {xs:toggleOpen?"#c1c1c147":"none",md:"none"},
      width: {xs:"100%",md:"100px",xl:"120px"},
      borderRadius:{xs:"15px",md:"0"},
      // padding:{xs:"5px 10px",md:"0"},
      display:'flex',flexDirection:"column",justifyContent:"space-between",alignItems:"center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: {xs:"10px",md:"50px",xl:"90px"},
          }}
        >
          
             <Box
              component="img"
              src={togglebar}
              onClick={toggle}
              sx={{ display:{xs:"block",md:"none"},width: {md:"50px",xl:"75px"}, height: {md:"50px",xl:"75px"}, borderRadius: "50%",cursor:"pointer" }}
              alt="toggle"
            >
             
            </Box>
           
            <Box
              component="img"
              src={profile ? profile : userProfile}
              sx={{display:{xs:"none",md:"block"}, width: {md:"50px",xl:"75px"}, height: {md:"50px",xl:"75px"}, borderRadius: "50%" }}
              alt="user profile image"
            ></Box>
         
          
        </Box>
       
     <Link to="/HomePage">
          <Box
                component="img"
                src={homepag}
                sx={{marginBottom: {xs:"10px",md:"50px",xl:"90px"},display:{xs:toggleOpen?"block":"none",md:"none"},
                 width: {xs:"47px",md:"57px"},
                 height: {xs:"47px",md:"57px"},
                borderRadius: "10px",cursor:"pointer"}}
                alt="homepag"
              ></Box></Link>
                {navigationBarData.map((data, index) => (
          <Box key={index}>
            <Navigationbar to={data.path}>
              <Box
                sx={{
                  display:{xs:toggleOpen?"flex":"none",md:"flex"},
                  justifyContent: "center",
                  marginBottom: {xs:"10px",md:"80px"},
                }}
              >
                <Box
                  sx={{
                    width: {xs:"47px",md:"57px"},
                    height: {xs:"47px",md:"57px"},
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
        <Box
          onClick={popUpLogout}
          sx={{
            display:{xs:toggleOpen?"flex":"none",md:"flex"},
            justifyContent: "center",
            alignItems: "flex-end",
            height: {md:"50vh",xl:"65vh"},
          }}
        >
          <img
            src={userProfileLogout}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            alt="user profile image"
          />
          {openPopUp && (
            <LogOut
              getProfileDateEmail={getProfileDateEmail}
              popUpLogout={popUpLogout}
            />
          )}
        </Box>
      
      </Box>
    </Box>
  );
}

export default UserProfileNavigation;
