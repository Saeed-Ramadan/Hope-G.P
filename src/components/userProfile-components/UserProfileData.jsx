import { Box, Divider, Grid, Input, InputLabel, Paper, Typography } from "@mui/material";
import UserProfileNavigation from "./UserProfileNavigation";
import addphoto from "../../assets/user profile.png";
import CaretLeft from "../../assets/profileUser/CaretLeft.png";
import camera from "../../assets/profileUser/camera.png";
import { useEffect, useState } from "react";
import EditProgile from "./EditProgile";
import { Link } from "react-router-dom";
import axios from "axios";
import { AddUserImage, GetProfile } from "../../apiRequests/apiRequest";
import Cookie from "cookie-universal";
import userProfile from "../../assets/user profile.png";
import ChangeImge from "./ChangeImge";
import SuccessMsg from "./SuccessMsg";

const cookies = Cookie();
const token = cookies.get("Cookie");
console.log(token);
function UserProfileData() {
  const [openPopUp, setopenPopUp] = useState(false);
  const [UploadImg, setUpladImg] = useState(
    localStorage.getItem("avater") == null
      ? addphoto
      : localStorage.getItem("avater")
  );
  const [profileData, setProfileData] = useState([]);
  const [Image, setImage] = useState("");
  const [succesMsg, setsuccesMsg] = useState("");
  const [Err, setErr] = useState(false);

  useEffect(() => {
    getProfileDate();
  }, []);
  const getProfileDate = () => {
    axios
      .get(`${GetProfile}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProfileData(response.data.data);
        console.log(response);
      });
  };
  const handleimge = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpladImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handlSendImg = (e) => {
    console.log("object");
    setsuccesMsg("");
    try {
      let formData;
      formData = new FormData();
      formData.append("Image", Image, Image.name);
      axios
        .post(AddUserImage, formData, {
          headers: {
            "Accept-Language": "ar-EG",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.isSuccess) {
            setErr(true);
            setsuccesMsg(response.data.message);
            setImage("");
            localStorage.setItem("avater", UploadImg);
          } else {
            setsuccesMsg(response.data.message);
            setErr(false);
          }
        });
    } catch (err) {
      console.log(err);
      setsuccesMsg("حدث خطا خارجي");
      setErr(false);
    }
  };
  const popUp = () => {
    setopenPopUp(true);
  };
  const profile = localStorage.getItem("avater");
  return (
    <>
      {succesMsg !== "" && <SuccessMsg succesMsg={succesMsg} Err={Err} />}
      <Grid
      
        container
        className="grid"
        sx={{position:"relative", background:{xs:"#fff",md:"#c1c1c147"}, padding: {xs:"0px 0px 0px 0",md:"50px 50px 50px 0",xl:"80px 50px 80px 0"} }}
      >
        
        <Grid
          item
          xs={12}
          md={11}
          
          sx={{
            background: "#FFF",

            height: {md:"120vh",xl:"calc(140vh - 0px)"},
            width: {md:"600px",xl:"1242px"},
            borderRadius: "35px",
            padding: {xs:"33px",md:"20px"},
            display: "grid",
            
            gap: {xs:"120px",md:"40px"},
          }}
        >
          <Grid item xs={11}>
            <Box>
            <Box
              component="img"
              src={profile ? profile : userProfile}
              sx={{display:{xs:"block",md:"none"}, width: {xs:"50px",md:"50px",xl:"75px"}, height: {xs:"50px",md:"50px",xl:"75px"}, borderRadius: "50%" }}
              alt="user profile image"
            ></Box>
              <Link to="/HomePage" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    width: "200px",
                    height: "50px",
                    borderRadius: "50px",
                    background: "#EBEBEB",
                    display: {xs:"none",md:"flex"},
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#171938",
                      fontWeight: "600",
                    }}
                  >
                    الصفحة الرئيسية
                  </Typography>
                </Box>
              </Link>
              <Box
                component="form"
                sx={{
                  width: "100%",

                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                component="img"
                  src={UploadImg}
                  alt="addphoto"
                  sx={{
                    objectFit: "cover",
                    width: {xs:"120px",md:"150px",xl:"200px"},
                    width: {xs:"120px",md:"150px",xl:"200px"},
                    borderRadius: "50%",
                    border: "10px solid #c1c1c147",
                  }}
                ></Box>
                <Input
                  style={{ display: "none" }}
                  type="file"
                  name="image-upload"
                  id="input"
                  accept="image/*"
                  onChange={handleimge}
                />
                <InputLabel 
                  sx={{
                    position: "absolute",
                    right:{xs:"27%",sm:"38%",md:"42%"},
                    bottom: "0px",
                  }}
                  htmlFor="input"
                >
                <Box component="img"
                sx={{
                  width:{xs:"24px",md:"30px",xl:"50px"},height:{xs:"24px",md:"30px",xl:"50px"}
                }}
                 src={camera} alt="camera" ></Box>
                </InputLabel>
                
                {Image !== "" && (
                  <ChangeImge
                    UploadImg={UploadImg}
                    handlSendImg={handlSendImg}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          <Grid container spacing={{xs:4,md:3,xl:10}}>
          <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {md:"0px",xl:"30px"},
                  padding: {md:"0px",xl:"30px 20px"},
                  border: "1px solid #C1C1C1",
                  borderRadius: "25px",
                  height:"fit-content",
                }}
              >
                <Typography
                  sx={{
                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                    fontWeight: "600",
                    fontSize: {xs:"12",md:"17px"},
                    color: "#2E74FD",
                  }}
                >
                  معلومات الحساب الأساسية
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    الاسم
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {profileData.userName}{" "}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
                <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    إسم الدخول{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {" "}
                    {profileData.displayName}{" "}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
                <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    المحافظة
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {" "}
                    {profileData.city}{" "}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
                <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    حسابك علي Hope
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {profileData.email}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} >
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {md:"15px",xl:"20px"},
                  padding: {md:"20px 10px",xl:"30px 20px"},
                  border: "1px solid #C1C1C1",
                  borderRadius: "25px",
                  height:"fit-content",
                  justifyContent:"space-between",
                }}
              >
                <Typography
                  sx={{
                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                    fontWeight: "600",
                    fontSize: {xs:"12px",md:"17px"},
                    color: "#2E74FD",
                  }}
                >
                  معلومات التواصل{" "}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    الايميل
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {profileData.email}{" "}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
                <Divider sx={{ background: "#C1C1C1", height: "2px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    padding: {xs:"20px 10px",md:"20px 10px",xl:"30px 20px"},
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    رقم الهاتف{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: {xs:"10px",md:"13px",xl:"17px"},
                      color: "#373B55",
                    }}
                  >
                    {profileData.phoneNumber}{" "}
                  </Typography>
                  <Typography>
                    <img src={CaretLeft} alt="CaretLeft" />
                  </Typography>
                </Box>
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    backgroundColor: "#2E74FD",
                    color: "white",
                    width: "60%",
                    marginTop: "30px",
                    height: "45px",
                    fontWeight: "700",
                    fontSize: "18px",
                    borderRadius: "10px",
                    textAlign: "center",
                    lineHeight: "45px",
                    cursor: "pointer",
                  }}
                  onClick={popUp}
                >
                  تعديل
                </p>
                {openPopUp && (
                  <EditProgile
                    getProfileDate={getProfileDate}
                    openPopUp={openPopUp}
                    setopenPopUp={setopenPopUp}
                    ProfileData={profileData}
                  />
                )}
              </Box>
            </Grid>
           
          </Grid>
        </Grid>
        <Grid 
        sx={{position:{xs:"absolute",md:"static"},
        left:{xs:"5%",md:"inherit"},
        top:{xs:"3%",md:"inherit",

        }}}
         item xs={2} md={1}>
          <Box sx={{ display: "grid"}}>
            <UserProfileNavigation getProfileDateEmail={profileData.email} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileData;
