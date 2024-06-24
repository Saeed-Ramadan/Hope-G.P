import { Box, Divider, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddUserRole, GetAllAdmins } from "../../apiRequests/apiRequest";
import adminIcon from "../../assets/admin/adminDetails/admin_Notificationicon.png";
import chatadmin from "../../assets/admin/adminDetails/chatAdmin.png";
import user from "../../assets/user profile.png";
import SuccesturnOperate from "./SuccesturnOperate";
function Admins() {
  const [allAdmin, setAllAdmin] = useState([]);
  const [succMsg, setsuccMsg] = useState(false);
  const [succMsgText, setsuccMsgtext] = useState("");

  useEffect(() => {
    axios
      .get(GetAllAdmins)
      .then((response) => {
        setAllAdmin(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const adminUserRole = async (id) => {
    console.log("succMsg", succMsg);
    setsuccMsg(false);
    try {
      const formData = new FormData();

      formData.append("userId", id);
      await axios.post(`${AddUserRole}`, formData, {}).then((res) => {
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
              height: { xl: "90%", lg: "85%" },
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
                المشرفين
              </Typography>
              <Box component="img" src={adminIcon} alt="adminIcon"></Box>
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
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "auto",
                height: { md: "45vh", xl: "55vh" },
              }}
            >
              {allAdmin.map((admin) => {
                return (
                  <Box
                    key={admin.id}
                    sx={{
                      background: "#E4ECF6",
                      display: "flex",
                      flexDirection: "column",
                      width: { xl: "549px", md: "350px" },
                      height: { xl: "280px", md: "200px" },
                      borderRadius: "20px",
                      padding: { xl: "30px 20px", md: "10px 20px" },
                      justifyContent: "space-between",

                      gap: "20px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        onClick={() => adminUserRole(admin.id)}
                        sx={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#171938",
                          background: "#fff",
                          borderRadius: "30px",
                          padding: "15px 25px",
                        }}
                      >
                        تحويله إلي مستخدم
                      </Typography>
                      <Box
                        component="img"
                        src={chatadmin}
                        alt="chatadmin"
                      ></Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 20px",
                      }}
                    >
                      <Box
                        sx={{
                          background: "white",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={admin.userImage == null ? user : admin.userImage}
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
                          sx={{ fontSize: "20px", fontWeight: "600" }}
                        >
                          {admin.displayName}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#7E7E7E",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          {admin.email}
                        </Typography>
                      </Box>
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

export default Admins;
