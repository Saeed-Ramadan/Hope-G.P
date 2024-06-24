// FilteredUserList.jsx
import { Box, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const FilteredUserList = ({ filteredUsers }) => {
  console.log(filteredUsers);
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width:{xs:"250px",md:"450px",xl: "725px"},
        height: {xs:"100px",md:"200px",xl:"328px"},
        borderRadius: "0px 0px 25px 25px",
        overflowY: "auto",
      }}
    >
      {filteredUsers.map((item) => (
        // Wrap user information with Link component
        <Link
          key={item.id}
          to={`/profile/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: {xs:"5px 10px",md:"20px 30px"},
            }}
          >
            <Typography
              sx={{ fontSize: {xs:"12px",md:"17px",xl:"20px"}, fontWeight: "400", color: "#252746" }}
            >
              {item.displayName}
            </Typography>
            <Avatar
              sx={{ width:{xs:"20px",md:"30px",xl:"75px"}, height: {xs:"20px",md:"30px",xl:"75px"}, borderRadius: "50%" }}
              src={item.userImage}
            />
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default FilteredUserList;
