//  saeed128@gmail.com
// S@eed12345
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  // duration,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LoginImage from "../assets/login-image.jpg";
import instgram from "../assets/instagram 1.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook-logo.png";
import email from "../assets/email.png";
import password from "../assets/Lock.png";
import { NavLink } from "react-router-dom";
import {
  // AnimatePresence,
  motion,
} from "framer-motion";
import axios from "axios";
import { LoginApi } from "../apiRequests/apiRequest";
import Loading from "../components/home-page-components/Loading";
import ChangePassword from "../components/home-page-components/Auth/ChangePassword";
import SuccessOrFailMsg from "../components/SuccessOrFailMsg";

import { useNav } from "../context/EmailContext";

function Login() {
  const { Nav, handlNav } = useNav();
  console.log(Nav);
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const [changePass, setChangePass] = useState(false);
  const isOpen = () => {
    setChangePass(true);
  };
  const popUpchangPass = (data) => {
    setChangePass(data);
  };

  const cookies = Cookie();
  const handlChanges = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  // const [passwordLogin, setPasswordLogin] = useState("");
  const [err, seterr] = useState("");
  const [errInpemail, seterrInpemail] = useState(false);
  const [errInppass, seterrInppass] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [msgforsuccess, setMsgforsuccess] = useState(false);
  const [succesOrFAIL, setsuccesOrFAIL] = useState("");
  const [msg, setmsg] = useState(false);
  const [ErrForImg, setErrForImg] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //to send token to home page

  // const [city, setCity] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setmsg(false);
    seterrInppass(false);
    seterrInpemail(false);
    try {
      await axios
        .post(`${LoginApi}`, Form, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          console.log("response", response);
          if (response.data.isSuccess) {
            setmsg(true);
            console.log("object");

            setMsgforsuccess(false);
            setsuccesOrFAIL("تم التسجيل بنجاح");
            const token = response.data.data.token;
            // console.log(response.data.data.token);
            const city = response.data.data.city; // Capture city value
            localStorage.setItem("city", city);

            cookies.set("Cookie", token);
            const role = response.data.data.roles;
            // Check if the role is "Admin"
            if (role.includes("Admin")) {
              sessionStorage.setItem("role", "Admin");
              // Navigate to admin dashboard page

              setInterval(() => {
                window.location.pathname = "/adminDashboard";
              }, 1000);
              // Replace the current URL so the user cannot go back
              window.history.replaceState(null, "", "/adminDashboard");
            } else if (role.includes("User")) {
              sessionStorage.setItem("role", "User");
              // Navigate to home page
              setInterval(() => {
                window.location.pathname = "/HomePage";
              }, 1000);

              // Replace the current URL so the user cannot go back
              window.history.replaceState(null, "", "/HomePage");
            }
            // Redirect to home page with token
            // navigate("/home", { state: { token } });

            setErrForImg(true);
            // setInterval(() => {
            //   window.location.pathname = "/HomePage";
            // }, 1000);
          } else {
            setmsg(true);
            if (response.data.data == null) {
              setsuccesOrFAIL(response.data.message);
            } else if (Form.email == "" && Form.password == "") {
              setsuccesOrFAIL(response.data.data[0] + response.data.data[1]);
              seterrInppass(true);
              seterrInpemail(true);
            } else if (Form.email == "" && Form.password !== "") {
              setsuccesOrFAIL(response.data.data[0]);
              seterrInpemail(true);
            } else if (Form.password == "" && Form.email !== "") {
              setsuccesOrFAIL(response.data.data[0]);
              seterrInppass(true);
            }

            setMsgforsuccess(false);
          }
        });
    } catch (err) {
      console.log(err);

      if (response.data.data == null) {
        console.log("helll");
        setsuccesOrFAIL(response.data.message);
      }
      setsuccesOrFAIL("حدث خطا خارجي");
    }
  };
  const [stopAnim, setstopAnim] = useState(false);
  useEffect(() => {
    setstopAnim(true);
  });

  return (
    <>
      {msg && (
        <SuccessOrFailMsg
          succesOrFAIL={succesOrFAIL}
          ErrForImg={ErrForImg}
          setmsg={setmsg}
        />
      )}
      {msgforsuccess ? (
        <SuccessOrFailMsg
          succesOrFAIL={succesOrFAIL}
          ErrForImg={ErrForImg}
          setmsg={setmsg}
        />
      ) : (
        ""
      )}
      {changePass && <ChangePassword popUpchangPass={popUpchangPass} />}
      <Grid
        container
        component="main"
        sx={{
          height: { md: "100vh", xl: "130vh" },
          overflowX: "hidden",
          flexWrap: "nowrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Grid
          component={motion.div}
          initial={{ left: -840 }}
          animate={{ left: 0 }}
          transition={{ duration: 1.2 }}
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage: `url(${LoginImage})`,
            backgroundRepeat: "no-repeat",
            position: "relative",
            backgroundPosition: { xs: "center", md: "-300px" },
            backgroundSize: "cover",
            zIndex: 11,
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgb(0 0 0 / 32%)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 8, md: 8, xl: 10 },
                padding: { xs: "50px 0", md: "30px 0", xl: "0" },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  color: "#fff",
                  fontFamily: "Inter",
                  fontSize: { xs: "20px", md: "30px", xl: "50px" },
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                مرحبا بك مجددا
              </Typography>

              <Typography
                component="h4"
                variant="h4"
                sx={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Rubik",
                  fontSize: { xs: "15px", md: "20px", xl: "25px" },
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: 2,
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                أدخل بياناتك في حالة كنت <br />
                مستخدم للموقع بالفعل
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider
                  sx={{
                    backgroundColor: "#fff",
                    width: { xs: 50, md: 167 },
                    height: -1,
                    marginLeft: 2,
                  }}
                />
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontFamily: "Inter",
                    fontSize: { xs: "15px", md: "25px" },
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    textTransform: "capitalize",
                  }}
                >
                  أو
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "#fff",
                    width: { xs: 50, md: 167 },
                    height: -1,
                    marginRight: 2,
                  }}
                />
              </Box>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#53FF98",
                  borderRadius: 100,
                  width: { xs: 134, md: 200, xl: 250 },
                  height: { xs: 45, md: 60, xl: 85 },

                  fontFamily: "Inter",
                  fontSize: { xs: 12, md: "20px", xl: "25px" },
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                  textTransform: "capitalize",
                  marginBottom: { xs: "100px", md: "0" },
                }}
              >
                <NavLink
                  to={"/register"}
                  style={{
                    textDecoration: "none",
                    color: "#D3D3D3",
                  }}
                >
                  انشاء حساب جديد
                </NavLink>
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          elevation={6}
          square
          sx={{
            background: { xs: "white", sm: "transparent" },
            marginTop: { xs: "-50px", sm: "0" },
            borderTopLeftRadius: { xs: "50px", sm: "0" },
            borderTopRightRadius: { xs: "50px", sm: "0" },
            position: "relative",
            zIndex: "111",
          }}
        >
          <Box
            sx={{
              my: { xs: 4, md: 2, xl: 8 },
              mx: { xs: 2, md: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                color: "#888",

                fontFamily: "Inter",
                fontSize: { xs: "18px", md: "25px", xl: "50px" },
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                textTransform: "capitalize",
              }}
            >
              تسجيل الدخول
            </Typography>
            <Box
              sx={{
                my: { md: 0, xl: 8 },
                mx: { md: 4 },
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* <img src={instgram} alt="" /> */}
              <img src={google} alt="" />
              {/* <img src={facebook} alt="" /> */}
            </Box>

            <Typography
              component="h3"
              variant="h5"
              sx={{
                color: "#939393",
                fontFamily: "Inter",
                fontSize: { xs: "12px", md: "15px", xl: "20px" },
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                textTransform: "capitalize",
              }}
            >
              او قم بإستخدام حسابك
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 5,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: { xs: 5, md: 3, xl: 5 },
                width: { xs: 300, md: 550, xl: 620 },
              }}
            >
              <FormControl
                // variant="outlined"
                fullWidth
              >
                <TextField
                  fullWidth
                  id="email"
                  label="الايميل"
                  name="email"
                  value={Form.email}
                  onChange={handlChanges}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 55, md: 55, xl: 95 },
                      borderRadius: { xs: 4, md: 4, xl: 8 },
                    },
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 12, md: 15, xl: 25 },
                      paddingLeft: 0,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": errInpemail && { borderColor: "red" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="toggle">
                          <img src={email} alt="email" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": errInppass && { borderColor: "red" },
                  },
                }}
              >
                <OutlinedInput
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: 3,
                      fontSize: { xs: 12, md: 15, xl: 25 },
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: { xs: 12, md: 15, xl: 25 },
                      color: "#000",
                      marginLeft: -1,
                    },

                    height: { xs: 55, md: 55, xl: 95 },
                    borderRadius: { xs: 4, md: 4, xl: 8 },
                    padding: 2,
                  }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "Password"}
                  startAdornment={
                    <IconButton aria-label="toggle" edge="end">
                      <img src={password} alt="password" />
                    </IconButton>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  inputProps={{ minLength: 8 }}
                  name="password"
                  value={Form.password}
                  onChange={handlChanges}
                />
                <InputLabel htmlFor="outlined-adornment-password">
                  كلمة المرور
                </InputLabel>
              </FormControl>

              <FormControlLabel
                sx={{ marginTop: { md: "0px" }, marginBottom: { md: "-25px" } }}
                control={<Checkbox value="remember" color="primary" />}
                label="تذكرنى"
              />

              <Box
                // transition={{duration:.5}}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  component={motion.button}
                  sx={{
                    width: { xs: 114, md: 180, xl: 200 },
                    height: { xs: 45, md: 50, xl: 60 },
                    borderRadius: 100,
                    background: "#408CFF",
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: { xs: 10, md: 15, xl: 20 },
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    textTransform: "capitalize",
                    zIndex: 13,
                  }}
                  initial={{ x: 600, y: 100, backgroundColor: "#5FE164" }}
                  animate={{ x: 0, y: 0, backgroundColor: "#408CFF" }}
                >
                  تسجيل الدخول
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: { xs: 10, md: 5, xl: 10 },
              marginBottom: 3,
            }}
          >
            <Typography
              onClick={isOpen}
              component="h3"
              variant="h5"
              sx={{
                color: "blue",
                textAlign: "center",
                fontFamily: "Inter",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                textTransform: "capitalize",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              هل نسيت كلمه المرور الخاصة بك؟
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
