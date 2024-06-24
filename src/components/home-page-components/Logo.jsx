import { Box } from "@mui/material";
import Hope_Logo from "../../assets/Hope-Logo.png";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/HomePage">
      <Box>
        <Box component="img"
          sx={{ width: {xs:"34px",md:"106px"}, height: {xs:"15px",md:"41px"},objectFit:"cover" }}
          src={Hope_Logo}
          alt="Logo"
        />
      </Box>
    </Link>
  );
}

export default Logo;
