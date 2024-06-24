import { Box, Button, Typography } from "@mui/material";
import Logo from "../components/home-page-components/Logo";
import ErrorImg from "../assets/error.png";
// import { useHistory } from "react-router-dom";

function Error404() {
  //   const history = useHistory();

  //   const goBack = () => {
  //     history.goBack();
  //   };

  //   const goToHomePage = () => {
  //     history.push("/HomePage");
  //   };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", padding: "70px" }}>
        <Logo />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 70px 70px 70px",
        }}
      >
        <Box>
          <img src={ErrorImg} alt="error image" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "70px",
                    fontWeight: "400",
                    color: "#303030",
                    textAlign: "center",
                  }}
                >
                  404
                </Typography>
                <Typography
                  sx={{ fontSize: "120px", fontWeight: "400", color: "#000" }}
                >
                  !oops
                </Typography>
                <hr
                  style={{
                    background: "#6CBEDD",
                    height: "6px",
                    border: "none",
                    borderRadius: "5px",
                    width: "150px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "300",
                    color: "#000",
                    marginTop: "20px",
                  }}
                >
                  حدث خطأ ما, لا يجب أن تكون هنا
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "80px",
              }}
            >
              <Button
                sx={{
                  width: "214px",
                  height: "65px",
                  borderRadius: "100px",
                  border: "5px #6CBEDD solid",
                  color: "#000",
                }}
                // onClick={goBack}
              >
                الرجوع
              </Button>
              <Button
                sx={{
                  width: "214px",
                  height: "65px",
                  borderRadius: "100px",
                  background: "#6CBEDD",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6cbedd73",
                    color: "#fff",
                    boxShadow: "none",
                    transform: "0.5 ease",
                  },
                }}
                // onClick={goToHomePage}
              >
                الصفحة الرئيسية
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Error404;
