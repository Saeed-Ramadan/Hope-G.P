import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginBottom="100px"
    >
      <CircularProgress size="60px" color="primary" />
    </Box>
  );
};

export default Loader;
