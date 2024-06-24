import { Box, Grid } from "@mui/material";
import UserProfileNavigation from "../components/userProfile-components/UserProfileNavigation";

function UserOwnProfilePage() {
  return (
    <Grid
      container
      className="grid"
      sx={{ background: "#c1c1c147", padding: "50px 50px 50px 0" }}
    >
      <Grid
        item
        xs={11}
        sx={{
          background: "#FFF",

          height: "calc(100vh - 100px)",
          width: "1242px",
          borderRadius: "35px",
          padding: "20px",
        }}
      ></Grid>
      <Grid item xs={1}>
        <Box sx={{ display: "grid" }}>
          <UserProfileNavigation />
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserOwnProfilePage;
