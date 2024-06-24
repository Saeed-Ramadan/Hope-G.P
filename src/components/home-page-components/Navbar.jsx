import { Box, Button, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Logo from "./Logo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import NightShelterOutlinedIcon from "@mui/icons-material/NightShelterOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
// import notification from "../../assets/Bell.png";
import bookMark from "../../assets/archive icon.png";

import user from "../../assets/user.jpg";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import cartLeft from "../../assets/CaretLeft (1).png"
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";

function Navbar({
  onNotificationIconClick,

  isOpen,
  anchorEl,
  onClose,
  onSelectCategory
}) 
{
  const [selectedCategory, setSelectedCategory] = useState("all");

  const profile = localStorage.getItem("avater");
  const role = sessionStorage.getItem("role");
  const [anchorEle, setAnchorEle] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const open = Boolean(anchorEle);
  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
    onSelectCategory("all");
    setSelectedCategory("all");
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEle(null);
  };
  const handleClose = () => {
    setAnchorEle(null);
  };
  const options = [
    'الكل',
    'مفقودين',
    'حوادث',
    'ملاجي',
   "متعلقات شخصيه"
  ];
 
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: {xs:0,sm:1,xl:3},
        
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between",gap:{xs:"10px",md:"50px"} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: {xs:"0px",md:"20px"},
          }}
        >
          <Link to="/userProfileData" style={{ textDecoration: "none" }}>
            <Box component="img" sx={{ width: {xs:"30px",md:"60px",xl:"75px"},
             height:{xs:"30px",md:"60px",xl: "75px"}, borderRadius: "50%" }} src={profile ? profile : user}
                alt="user image">
            </Box>
          </Link>
          <Box sx={{ display: "flex", gap:{xs:"0px",md: "15px"} }}>
            <Tooltip title="Notifications" arrow="true">
              <IconButton onClick={onNotificationIconClick}>
                <NotificationsNoneIcon
                  sx={{
                    fontSize:{xs:"20px",sm:"25px",md:"45px"},
                    borderRadius: "15px",
                    backgroundColor: isOpen ? "#F68084" : "default",
                    color: isOpen ? "#fff" : "#000",
                  }}
                  open={isOpen}
                  anchorEl={anchorEl}
                  onClose={onClose}
                />
              </IconButton>
            </Tooltip>
            <IconButton component={Link} to="/archive">
              <Box component="img" sx={{width:{xs:"13px",sm:"16px",md:"35px"},height:{xs:"13px",sm:"16px",md:"35px"}}} src={bookMark} alt="bookMark" ></Box>
            </IconButton>
            {role === "Admin" && (
              <Link to="/adminDashboard" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    width: "75px",
                    height: "75px",
                    background: "#A6C0FE",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    marginTop: "10px",
                  }}
                >
                  <DashboardIcon sx={{ fontSize: "40px", color: "#fff" }} />
                </Box>
              </Link>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center",justifyContent:"space-between"}}>
       
          <Box sx={{display:{xs:"flex",md:"none"}}}> 
            <Link to="/MainCreatePost" style={{fontSize:"12px"}}>انشاءمنشور</Link>
           </Box>
          <Box sx={{display:{xs:"flex",md:"none"}}}>
             {/* <Button sx={{fontSize:"15px",color:"#000"}} aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} 
          
           >
               <img src={cartLeft} alt="cartLeft" style={{marginLeft:"10px"}}/>
             الكل
            
             </Button> */}
             <List
        component="nav"
       
      
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          sx={{padding:{xs:"5px",sm:"10px"}}}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <img src={cartLeft} alt="cartLeft" style={{marginLeft:"4px"}}/>
          <ListItemText
            primary={options[selectedIndex]}
            
          />
        </ListItemButton>
           </List>
             <Menu
            id="basic-menu"
            anchorEl={anchorEle}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem   selected={1 === selectedIndex}
            onClick={(event) => handleMenuItemClick("الكل", 0)} sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
            <Typography sx={{fontSize:"15px"}} 
              onClick={() => {
                onSelectCategory("Missing");
                setSelectedCategory("Missing");
              }}
            >الكل</Typography>
            <PersonOutlineOutlinedIcon sx={{fontSize:"25px"}}/>
            </MenuItem>
            <MenuItem  selected={2 === selectedIndex}
            onClick={(event) => handleMenuItemClick("مفقودين", 1)} sx={{display:'flex',justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
            <Typography sx={{fontSize:"15px"}} 
              onClick={() => {
                onSelectCategory("Missing");
                setSelectedCategory("Missing");
              }}
            >مفقودين</Typography>
            <PersonOutlineOutlinedIcon sx={{fontSize:"25px"}}/>
            </MenuItem>
            <MenuItem selected={3 === selectedIndex}
            onClick={(event) => handleMenuItemClick("حوادث", 2)} sx={{display:'flex',justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
            <Typography sx={{fontSize:"15px"}}
             onClick={() => {
              onSelectCategory("accidents");
              setSelectedCategory("accidents");
            }}
            >حوادث</Typography>
            <HealingOutlinedIcon sx={{fontSize:"25px"}}/>
            </MenuItem>
            <MenuItem selected={4 === selectedIndex}
            onClick={(event) => handleMenuItemClick("ملاجي", 3)} sx={{display:'flex',justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
            <Typography sx={{fontSize:"15px"}}
             onClick={() => {
              onSelectCategory("shelters");
              setSelectedCategory("shelters");
            }}
            >ملاجي</Typography>
            <NightShelterOutlinedIcon sx={{fontSize:"25px"}}/>
            </MenuItem>
            <MenuItem selected={5 === selectedIndex}
            onClick={(event) => handleMenuItemClick("متعلقات شخصيه", 4)} sx={{display:'flex',justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
            <Typography sx={{fontSize:"15px"}} 
             onClick={() => {
              onSelectCategory("things");
              setSelectedCategory("things");
            }}
            >متعلقات شخصيه</Typography>
            <LaptopOutlinedIcon sx={{fontSize:"25px"}}/>
            </MenuItem>
            
          </Menu>
          </Box>
          <Logo />
          
        </Box>
      </Toolbar>
    </Box>
  );
}
export default Navbar;
