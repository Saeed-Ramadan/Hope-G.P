import { Box, Divider, styled } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import NightShelterOutlinedIcon from "@mui/icons-material/NightShelterOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import Search from "../../assets/home-search.png";
import { useState } from "react";

const Links = styled("a")({
  fontSize: "27px",
  fontWeight: "400",
  lineHeight: "33.75px",
  display: "block",
  marginBottom: "20px",
});
const ListItemStyle = styled("li")({
  width: "fit-content",
  listStyle: "none",
  textAlign: "center",
});
const NavigationBar = ({ toggleSearchVisibility, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isIconRotated, setIsIconRotated] = useState(false);

  const handleIconClick = () => {
    setIsIconRotated((prev) => {
      // If the icon is already rotated, reset it to its initial state
      if (prev) {
        return false;
      }
      // Otherwise, toggle the rotation
      return !prev;
    });
    // If the icon is already rotated, reset the color to the initial state
    if (isIconRotated) {
      setIsIconRotated(false);
    }
    // Toggle the visibility of the search bar
    toggleSearchVisibility();
  };

  return (
    <Box
      sx={{
        background: "#fff",
        
        height: {md:"100px",xl:"171px"},
        width: {md:"100%",xl:"100%"},
       
        py:{md:1,xl:5},
        px: {md:2,xl:8},
        borderRadius: {md:"0 40px 40px 40px",xl:"0 52px 52px 52px"},
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // gap: "30px",
        }}
      >
        <ListItemStyle>
          <Links onClick={handleIconClick}>
            <Box
              sx={{
                width: {md:"60px",xl:"93px"},
                height: {md:"60px",xl:"93px"},
                borderRadius: "50%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                background: isIconRotated ? "#F68084" : "#2A3355",
                padding: "25px",
                transform: isIconRotated ? "rotate(90deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img style={{ width: "40px" }} src={Search} alt="Search" />
            </Box>
          </Links>
        </ListItemStyle>
        <Divider sx={{marginBottom:"10px",background:"#b9b5b5", width: "1px", height: {md:"75px",xl:"100px"} }} />
        <ListItemStyle>
          <Links
            onClick={() => {
              onSelectCategory("all");
              setSelectedCategory("all");
            }}
            sx={{
              color: selectedCategory === "all" ? "#F68084" : "#2A3355",
              cursor: "pointer",
              fontSize:{md:'24px',xl:"35px"}
            }}
          >
            الكل
            <HomeOutlinedIcon
              sx={{
                display: "block",
                margin: "10px auto",
                fontSize: {md:"40px",xl:"65px"},
                fill: selectedCategory === "all" ? "#F68084" : "#2A3355",
              }}
            />
          </Links>
        </ListItemStyle>
        <Divider sx={{marginBottom:"10px",background:"#b9b5b5", width: "1px", height: {md:"75px",xl:"100px"} }} />
        <ListItemStyle>
          <Links
            onClick={() => {
              onSelectCategory("Missing");
              setSelectedCategory("Missing");
            }}
            sx={{
              color: selectedCategory === "Missing" ? "#F68084" : "#2A3355",
              cursor: "pointer",
              fontSize:{md:'24px',xl:"35px"}
            }}
          >
            مفقودين{" "}
            <PersonOutlineOutlinedIcon
              sx={{
                display: "block",
                margin: "10px auto",
                fontSize: {md:"40px",xl:"65px"},
                fill: selectedCategory === "Missing" ? "#F68084" : "#2A3355",
              }}
            />
          </Links>
        </ListItemStyle>
        <Divider sx={{marginBottom:"10px",background:"#b9b5b5", width: "1px", height: {md:"75px",xl:"100px"} }} />
        <ListItemStyle>
          <Links
            onClick={() => {
              onSelectCategory("accidents");
              setSelectedCategory("accidents");
            }}
            sx={{
              color: selectedCategory === "accidents" ? "#F68084" : "#2A3355",
              cursor: "pointer",
              fontSize:{md:'24px',xl:"35px"}
            }}
          >
            حوادث{" "}
            <HealingOutlinedIcon
              sx={{
                display: "block",
                margin: "10px auto",
                fontSize: {md:"40px",xl:"65px"},
                fill: selectedCategory === "accidents" ? "#F68084" : "#2A3355",
              }}
            />
          </Links>
        </ListItemStyle>
        <Divider sx={{marginBottom:"10px",background:"#b9b5b5", width: "1px", height: {md:"75px",xl:"100px"} }} />
        <ListItemStyle>
          <Links
            onClick={() => {
              onSelectCategory("shelters");
              setSelectedCategory("shelters");
            }}
            sx={{
              color: selectedCategory === "shelters" ? "#F68084" : "#2A3355",
              cursor: "pointer",
              fontSize:{md:'24px',xl:"35px"}
            }}
          >
            ملاجئ{" "}
            <NightShelterOutlinedIcon
              sx={{
                display: "block",
                margin: "10px auto",
                fontSize: {md:"40px",xl:"65px"},
                fill: selectedCategory === "shelters" ? "#F68084" : "#2A3355",
              }}
            />
          </Links>
        </ListItemStyle>
        <Divider sx={{marginBottom:"10px",background:"#b9b5b5", width: "1px", height: {md:"75px",xl:"100px"} }} />
        <ListItemStyle>
          <Links
            onClick={() => {
              onSelectCategory("things");
              setSelectedCategory("things");
            }}
            sx={{
              color: selectedCategory === "things" ? "#F68084" : "#2A3355",
              cursor: "pointer",
              fontSize:{md:'24px',xl:"35px"}
            }}
          >
            متعلقات شخصية{" "}
            <LaptopOutlinedIcon
              sx={{
                display: "block",
                margin: "10px auto",
                fontSize: {md:"40px",xl:"65px"},
                fill: selectedCategory === "things" ? "#F68084" : "#2A3355",
              }}
            />
          </Links>
        </ListItemStyle>
      </Box>
    </Box>
  );
};

export default NavigationBar;
