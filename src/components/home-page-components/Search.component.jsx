import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import searchIcon from "../../assets/Search.png";
import FilteredUserList from "./FilteredUserList";

import { GetAllUsers } from "../../apiRequests/apiRequest";

function Search() {
  const [searchVisible, setSearchVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cookies = Cookie();
  const token = cookies.get("Cookie");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GetAllUsers, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures fetchUsers is called once

  const handleClearClick = () => {
    setSearchVisible(false);
  };

  const handleSearchIconClick = () => {
    // Implement your search logic here
    // console.log("Search icon clicked");
  };

  // Use useMemo to memoize the filtered users based on users and searchTerm
  const filteredUsers = useMemo(() => {
    return users.filter((item) =>
      item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <>
      <Box sx={{ display: {xs:"flex",md:searchVisible ? "flex" : "none"},flexDirection:"column"}}>
        <Paper
          component="form"
          sx={{
            p: {xs:3,md:5},
            px:{xs:0,md:5},
            display: {xs:"flex",md:searchVisible ? "flex" : "none"},
            alignItems: "center",
            width: {xs:"250px",md:"450px",xl:"725px"},
            height: {xs:"10px",md:"60px",xl:"91px"},
            borderRadius: "25px 25px 0px 0px",
            background: "#ffff",
          }}
        >
          <IconButton onClick={handleClearClick}>
            <ClearIcon sx={{ fontSize: "30px",display:{xs:"none",md:"block"} }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: "defaultFont" }}
            placeholder="البحث عن مستخدم ..."
            inputProps={{
              "aria-label": "Search",
              sx: {
                zIndex: "11",
                direction: "rtl",
                fontSize: {xs:"13px",md:"25px"},
                color: "#C1C1C1",
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearchIconClick}
          >
            <Box component="img" src={searchIcon} alt="searchIcon" sx={{width:{xs:"18px",md:"26px"},height:{xs:"18px",md:"26px"}}}></Box>
          </IconButton>
        </Paper>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ borderColor: "#64656C" }}
        />
        {/* Only display filtered users if searchTerm has a value */}
        {searchTerm && <FilteredUserList filteredUsers={filteredUsers} />}
      </Box>
    </>
  );
}

export default Search;
