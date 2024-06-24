import { Box, Divider, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import {
  AddAdminRole,
  DeleteUser,
  GetAllUsers,
} from "../../apiRequests/apiRequest";
import { useEffect, useState } from "react";
import userIcon from "../../assets/admin/adminDetails/userNotification icon.png";
import chatadmin from "../../assets/admin/adminDetails/chatAdmin.png";
import deletetUser from "../../assets/admin/adminDetails/deleteuser.png";
import userImg from "../../assets/user profile.png";
import axios from "axios";
import SuccesturnOperate from "./SuccesturnOperate";
function Users() {
  const [alluser, setAlluser] = useState([]);
  const [succMsg, setsuccMsg] = useState(false);
  const [succMsgText, setsuccMsgtext] = useState("");
  const getAllUserFun = () => {
    axios
      .get(GetAllUsers)
      .then((response) => {
        setAlluser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllUserFun();
  }, []);
  const deleteuserAcc = async (id) => {
    console.log(id);
    setsuccMsg(false);
    try {
      await axios
        .delete(`${DeleteUser}`, { data: { userId: id } })
        .then((res) => {
          setsuccMsg(true);
          if (res.data.isSuccess) {
            setsuccMsgtext(res.data.message);
          } else {
            setsuccMsgtext(res.data.message);
          }
        });
      getAllUserFun();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const UseradminRole = async (id) => {
    setsuccMsg(false);
    try {
      const formData = new FormData();

      formData.append("userId", id);
      await axios.post(`${AddAdminRole}`, formData).then((res) => {
        setsuccMsg(true);
        if (res.data.isSuccess) {
          setsuccMsgtext(res.data.message);
        } else {
          setsuccMsgtext(res.data.message);
        }
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const popUp = (data) => {
    setsuccMsg(data);
  };
  return (
    <>
      {succMsg && <SuccesturnOperate succMsgText={succMsgText} popUp={popUp} />}
      <Box
        sx={{
          background: "#D3E4FF",
          padding: "30px",
          height: "100vh",
        }}
      >
        <Box sx={{ width: "100%", height: "10%" }}>
          <AdminDashboardOuterNavigation />
        </Box>
        <Box
          sx={{
            background: "#FFF",
            height: { xl: "85vh", md: "81vh" },
            // height: "850px",
            width: "100%",
            borderRadius: "35px",
            padding: "50px",
            gap: "30px",
            display: "flex",
            flexDirection: "column",
            // overflow:"auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                width: "190px",
                height: "60px",
                borderRadius: "50%",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#EDEEEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "-20px",
                  zIndex: "2",
                }}
              >
                <MoreTimeIcon style={{ width: "32px", height: "32px" }} />
              </Box>
              <Box
                sx={{
                  width: "150px",
                  height: "50px",
                  backgroundColor: "#F8F9FA",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "500px",
                  zIndex: "1",
                }}
              >
                <Typography
                  sx={{ fontSize: "15px", fontWeight: "400", color: "#252746" }}
                >
                  20 April 2024
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                width: "185px",
                height: "60px",
              }}
            >
              <Box
                sx={{
                  width: "140px",
                  height: "50px",
                  backgroundColor: "#F8F9FA",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "500px",
                }}
              >
                <Typography
                  sx={{ fontSize: "15px", fontWeight: "400", color: "#252746" }}
                >
                  PM 12 : 07
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#EDEEEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "-20px",
                }}
              >
                <MoreTimeIcon style={{ width: "32px", height: "32px" }} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #D9D9D9",
              borderRadius: "35px",
              height: { xl: "90%", md: "85%" },
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: { xl: "30px 40px", md: "20px 30px" },
              }}
            >
              <Typography
                component="h2"
                sx={{ color: "#2E74FD", fontSize: { xl: "40px", md: "30px" } }}
              >
                المستخدمين
              </Typography>
              <Box component="img" src={userIcon} alt="userIcon"></Box>
            </Box>
            <Divider
              sx={{
                backgroundColor: "#D9D9D9",
                height: "3px",
                marginTop: "5px",
                marginBottom: { xl: "50px", md: "30" },
              }}
            />
            <Box
              sx={{
                padding: "0px 40px",
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                justifyContent: "space-between",
                alignItems: "center",
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: "56vh",
              }}
            >
              {alluser.map((user) => {
                return (
                  <Box
                    key={user.id}
                    sx={{
                      background: "#E4ECF6",
                      display: "flex",
                      width: "45%",

                      borderRadius: "60px",
                      padding: { xl: "30px 20px", md: "20px 20px" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: { xl: "20px", md: "5px" },
                        width: "35%",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          background: "white",
                          width: { xl: "80px", md: "40px" },
                          height: { xl: "80px", md: "40px" },
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            user.userImage == null ? userImg : user.userImage
                          }
                          alt="chatadmin"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xl: "20px", md: "16" },
                            fontWeight: "600",
                          }}
                        >
                          {user.displayName}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#7E7E7E",
                            fontSize: { xl: "20px", md: "16" },
                            fontWeight: "600",
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "50%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        onClick={() => UseradminRole(user.id)}
                        sx={{
                          fontSize: { xl: "23px", md: "18" },
                          fontWeight: { xl: "700", md: "300" },
                          color: "#171938",
                          background: "#fff",
                          borderRadius: "30px",
                          height: "60px",
                          width: "300px",
                          textAlign: "center",
                          lineHeight: "60px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        {" "}
                        تحويله إلي مشرف{" "}
                      </Typography>
                      <Box
                        component="img"
                        src={deletetUser}
                        alt="deletetUser"
                        onClick={() => deleteuserAcc(user.id)}
                      ></Box>
                      {/* <Box
                        component="img"
                        src={chatadmin}
                        alt="chatadmin"
                      ></Box> */}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Users;
