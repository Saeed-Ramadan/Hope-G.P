import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CaretLeft from "../../assets/profileUser/CaretLeft.png";

import password from "../../assets/Lock.png";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UpdateUserData } from "../../apiRequests/apiRequest";
import Cookie from "cookie-universal";
import SuccessMsg from "./SuccessMsg";
const cookies = Cookie();
const token = cookies.get("Cookie");

export default function EditProgile({
  openPopUp,
  setopenPopUp,
  ProfileData,
  getProfileDate,
}) {
  const [succesMsg, setsuccesMsg] = useState("");
  const [Err, setErr] = useState(false);
  const [Form, setForm] = useState({
    displayName: ProfileData.displayName,
    city: ProfileData.city,
    password: "",
  });
  console.log(Form);
  const handlChanges = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setsuccesMsg("");
    try {
      await axios
        .put(`${UpdateUserData}`, Form, {
          headers: {
            Authorization: "Bearer " + token,
            "Accept-Language": "ar-EG",
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.isSuccess) {
            setErr(true);
            setsuccesMsg(response.data.message);
            getProfileDate();
            setInterval(() => {
              setopenPopUp(false);
            }, 1000);
          } else {
            setsuccesMsg(response.data.message);
            setErr(false);
          }
        });
    } catch (err) {
      setsuccesMsg("حدث خطا خارجي");
      setErr(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {succesMsg !== "" && <SuccessMsg succesMsg={succesMsg} Err={Err} />}
      {
        <Backdrop
          sx={{ color: "#483131", zIndex: 11 }}
          open={open}
          // onClick={handleClose}
        >
          <Card
            sx={{
              width: { xs: "350px", md: "450px", xl: "739px" },
              borderRadius: "35px",
              height: { xs: "450px", md: "530px", xl: "950px" },
              minHeight: { xl: "920px" },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: { xs: "20px", md: "40px", xl: "60px" },
                position: "relative",
                padding: { md: "20px 30px", xl: "40px 30px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  gap: "30px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#2E74FD",

                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  معلومات الحساب
                </Typography>
                <Typography
                  onClick={() => setopenPopUp(false)}
                  sx={{
                    backgroundColor: "#EBEBEB",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "35px",
                    fontWeight: "400",
                    fontSize: "25px",
                    position: "absolute",
                    left: "20px",
                    cursor: "pointer",
                  }}
                >
                  x
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: "10px", md: "10px", xl: "20px" },

                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: { xs: "0 10px", md: "0px 10px", xl: "30px 20px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "11px", md: "13px", xl: "17px" },
                      color: "#373B55",
                    }}
                  >
                    الاسم
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "11px", md: "13px", xl: "17px" },
                      color: "#373B55",
                    }}
                  >
                    {" "}
                    {ProfileData.userName}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    background: "#C1C1C1",
                    height: { md: "1px", xl: "2px" },
                    width: "98%",
                  }}
                />
                <Box component="form" onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      padding: { md: "0px 10px", xl: "30px 20px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      إسم الدخول
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        display: "flex",
                        alignItems: { md: "flex-end", xl: "flex-start" },
                        position: "relative",
                        flexDirection: "column",
                        gap: { xs: "10px", md: "10px", xl: "20px" },
                        width: "100%",
                      }}
                    >
                      <FormControl
                        // variant="outlined"
                        fullWidth
                      >
                        <TextField
                          fullWidth
                          id="dName"
                          name="displayName"
                          value={Form.displayName}
                          onChange={handlChanges}
                          sx={{
                            "& .MuiInputBase-root": {
                              // height: 95,
                              borderRadius: 8,
                            },
                            "& .MuiInputBase-input": {
                              padding: 3,
                              fontSize: { xs: "11px", md: 14, xl: 25 },
                              textAlign: "center",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": { border: "none" },
                            },
                          }}
                        />
                      </FormControl>
                    </Box>
                    <Typography>
                      <img src={CaretLeft} alt="CaretLeft" />
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      background: "#C1C1C1",
                      height: { md: "1px", xl: "2px" },
                      width: "98%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      padding: { md: "0px 10px", xl: "30px 20px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      المحافظة
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        position: "relative",
                        flexDirection: "column",
                        gap: { xs: "10px", md: "10px", xl: "20px" },
                        width: "100%",
                      }}
                    >
                      <FormControl
                        // variant="outlined"
                        fullWidth
                      >
                        <TextField
                          fullWidth
                          id="dcity"
                          name="city"
                          value={Form.city}
                          onChange={handlChanges}
                          sx={{
                            "& .MuiInputBase-root": {
                              // height: 95,
                              borderRadius: 8,
                            },
                            "& .MuiInputBase-input": {
                              padding: 3,
                              fontSize: { xs: "12px", md: 14, xl: 25 },
                              textAlign: "center",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": { border: "none" },
                            },
                          }}
                        />
                      </FormControl>
                    </Box>
                    <Typography>
                      <img src={CaretLeft} alt="CaretLeft" />
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      background: "#C1C1C1",
                      height: { md: "1px", xl: "2px" },
                      width: "98%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      padding: {
                        xs: "10px 10px",
                        md: "10px 10px",
                        xl: "30px 20px",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      حسابك علي Hope
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      {ProfileData.email}{" "}
                    </Typography>
                    <Typography>
                      <img src={CaretLeft} alt="CaretLeft" />
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      background: "#C1C1C1",
                      height: { md: "1px", xl: "2px" },
                      width: "98%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: { md: "10px 10px", xl: "30px 20px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      رقم الهاتف{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "11px", md: "13px", xl: "17px" },
                        color: "#373B55",
                      }}
                    >
                      {ProfileData.phoneNumber}{" "}
                    </Typography>
                    <Typography>
                      <img src={CaretLeft} alt="CaretLeft" />
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      background: "#C1C1C1",
                      height: { md: "1px", xl: "2px" },
                      width: "98%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      position: "relative",
                      flexDirection: "column",
                      gap: { xs: "8px", md: "10px", xl: "30px" },
                      width: "100%",
                      marginTop: { xs: "15px", md: "20px", xl: "40px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", md: "14px" },
                        fontWeight: "600",
                        color: "#2E74FD",
                      }}
                    >
                      أدخل كلمة المرور لتأكيد العملية
                    </Typography>
                    <FormControl variant="outlined" fullWidth>
                      <OutlinedInput
                        sx={{
                          "& .MuiInputBase-input": {
                            padding: 3,
                            fontSize: { xs: "12px", md: 14, xl: 25 },
                            textAlign: "center",
                          },
                          "& .MuiFormLabel-root": {
                            fontSize: { xs: "12px", md: 14, xl: 25 },
                            textAlign: "center",
                            color: "#000",
                            marginLeft: -1,
                          },

                          // "& .MuiOutlinedInput-root": {
                          //   "& > fieldset": showErrpass !== "" && {
                          //     borderColor: "red",
                          //   },
                          // },
                          height: { xs: "40px", md: 50, xl: 80 },
                          borderRadius: { xs: 4, md: 5, xl: 8 },
                          padding: 2,
                        }}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "Password"}
                        startAdornment={
                          <IconButton aria-label="toggle" edge="end">
                            <img src={password} alt="Password" />
                          </IconButton>
                        }
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle Password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        required
                        value={Form.password}
                        onChange={handlChanges}
                        inputProps={{ maxLength: 9 }}
                      />
                      <InputLabel htmlFor="outlined-adornment-password">
                        كلمة المرور
                      </InputLabel>
                    </FormControl>

                    <Box sx={{ width: "80%" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          padding: "10px 40px",
                          fontWeight: "700",
                          fontSize: { xs: "10px", md: "15px", xl: "20px" },
                          borderRadius: "20px",
                        }}
                      >
                        حفظ التعديلات
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Backdrop>
      }
    </>
  );
}
