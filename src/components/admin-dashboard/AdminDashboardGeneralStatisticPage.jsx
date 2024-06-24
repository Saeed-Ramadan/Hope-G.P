import { Box, Button, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import userIcon from "../../assets/admin/adminDetails/usericon.png";
import adminPost from "../../assets/admin/adminDetails/adminpost.png";
import deleteuser from "../../assets/admin/adminDetails/deletetUsers.png";
import arrowVector from "../../assets/admin/adminDetails/arrowVector.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GetNumberOfNewUserPerWeek,
  GetPostsCount,
  GetUserCount,
} from "../../apiRequests/apiRequest";
import { GetProfile } from "../../apiRequests/apiRequest";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  scales,
  Ticks,
} from "chart.js";
import Cookie from "cookie-universal";

import { Bar, Chart } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboardGeneralStatisticPage() {
  const [usersCount, setusersCount] = useState("");
  const [useradvancePercentage, setuseradvancePercentage] = useState("");
  const [postCount, setpostCount] = useState("");
  const [postadvancePercentage, setpostadvancePercentage] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [usersWeaklyCount, setUsersWeaklyCount] = useState(null);
  const [usersTodayCount, setUsersTodayCount] = useState(null);
  // console.log(profileData);

  useEffect(() => {
    axios
      .get(GetUserCount)
      .then((response) => {
        setusersCount(response.data.data.usersCount);
        setuseradvancePercentage(response.data.data.advancePercentage);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(GetPostsCount)
      .then((response) => {
        setpostCount(response.data.data.currentCount);
        setpostadvancePercentage(response.data.data.advancePercentage);
      })
      .catch((error) => {
        console.log(error);
      });
    // getProfileDate();

    const fetchUsersCountWeaklyData = async () => {
      try {
        const response = await axios.get(GetNumberOfNewUserPerWeek);

        // Extract the usersCount from the response data
        const { data } = response.data;

        setUsersWeaklyCount(data);
        const latestValue = data[data.length - 1];
        console.log("latestValue" + latestValue);
        setUsersTodayCount(latestValue);
        // console.log("latestValue" + latestValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsersCountWeaklyData();
    getProfileDate();
  }, []);

  const cookies = Cookie();
  const token = cookies.get("Cookie");
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

  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "",
        data: usersWeaklyCount,
        backgroundColor: "#D9D9D9",
        width: 2,
        borderWidth: 1,
        fontSize: "50px",
        borderRadius: 50,
        maxBarThickness: 28,
      },
    ],
  };
  console.log(usersWeaklyCount);
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          font: {
            size: 30,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 30,
          },
        },
      },
    },
  };

  const dataDatails = [
    {
      id: 1,
      image: userIcon,
      usertext: "المستخدمين الجدد",
      userCount: usersCount,
      percentage: useradvancePercentage,
    },
    {
      id: 2,
      image: adminPost,
      usertext: "المنشورات الجديدة ",
      userCount: postCount,
      percentage: postadvancePercentage,
    },
    //     {
    //     id:3,
    //     image:deleteuser,
    //     usertext:"حسابات المستخدمين المحذوفة  ",
    //     userCount:"44",
    //     percentage:"44",
    // },
  ];
  const logOutAdmin = () => {
    cookies.remove("Cookie");
    localStorage.clear();
    window.location.pathname = "/";
  };
  return (
    <Box
      sx={{
        background: "#D3E4FF",
        padding: "30px",
      }}
    >
      <Box sx={{ width: "100%", height: "10%" }}>
        <AdminDashboardOuterNavigation />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          height: { xl: "85vh", md: "80vh" },
        }}
      >
        <Box
          sx={{
            height: { xl: "900px", md: "620px" },
            width: "35%",
            borderRadius: "35px",
            display: "flex",
            flexDirection: "column",
            gap: { xl: "50px", md: "30px" },
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {dataDatails.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  gap: "20px",
                  backgroundColor: "#E4ECF6",
                  padding: "40px",
                  borderRadius: "30px",
                  mxHeight: "25%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xl: "30px", lg: "10px" },
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box>
                    <img src={item.image} alt="image" />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xl: "35px", md: "20px" },
                      fontWeight: "400",
                      color: "#252746",
                    }}
                  >
                    {item.usertext}{" "}
                  </Typography>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xl: "35px", md: "20px" },
                      fontWeight: "700",
                    }}
                  >
                    {item.userCount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: " end",
                    alignItems: "end",
                    gap: " 10px",
                    height: "100%",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#252746",
                      fontSize: { xl: "30px", md: "20px" },
                      fontWeight: "400",
                      marginRight: "20px",
                    }}
                  >
                    اخر شهر
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: "#10CC8A",
                      fontSize: { xl: "30px", md: "20px" },
                      fontWeight: "400",
                      marginRight: "20px",
                    }}
                  >
                    %{item.percentage}{" "}
                  </Typography>
                  <span>
                    <img
                      src={arrowVector}
                      alt="arrow"
                      style={{ width: "20px" }}
                    />
                  </span>
                </Box>
              </Box>
            );
          })}

          <Box>
            <Button
              onClick={logOutAdmin}
              sx={{
                background: "#9093FD",
                borderRadius: "20px",
                width: "200px",
                height: "80px",
                color: "white",
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": {
                  background: "#9093FD",
                },
              }}
            >
              تسجيل الخروج
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            background: "#FFF",
            height: { xl: "900px", md: "650px" },
            width: { xl: "calc(100% - 600px)", md: "calc(100% - 20px)" },
            borderRadius: "35px",
            padding: { xl: "50px", md: "25px" },
            display: "flex",
            flexDirection: "column",
            gap: "50px",
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

                  borderRadius: "50%",
                  backgroundColor: "#EDEEEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "-20px",
                }}
              >
                <MoreTimeIcon style={{ width: "32px" }} />
              </Box>
            </Box>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              color: "#2E74FD",
              fontSize: { xl: "30px", md: "20px" },
              fontWeight: "600",
            }}
          >
            صباح الخير <span>{profileData.displayName}</span>
          </Typography>
          <Box
            sx={{
              width: { xl: "90%", md: "100%" },
              height: { xl: "80%", md: "70%" },
              borderRadius: "35px",
              border: "1px solid #D9D9D9",

              margin: "0 auto",
              padding: { xl: "30px", md: "15px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xl: "50px", md: "35px" },
                    height: { xl: "50px", md: "35px" },
                    borderRadius: "17px",
                    background: "#FD4F58",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FolderCopyIcon style={{ color: "#fff" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "600",
                    color: "#252746",
                  }}
                >
                  {" "}
                  المستخدمين الجدد
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "600",
                    color: "#252746",
                  }}
                >
                  {" "}
                  April 2024{" "}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: { xl: "40px", md: "25px" },
                display: "flex",
                flexDirection: "column",
                gap: { xl: "30px", md: "20px" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: " end",
                  alignItems: "end",
                  gap: " 10px",
                  height: "100%",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#252746",
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "400",
                    marginRight: "20px",
                  }}
                >
                  المستخدمين الجدد للشهر السابق{" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "#10CC8A",
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "400",
                    marginRight: "20px",
                  }}
                >
                  {useradvancePercentage} %
                </Typography>
                <span>
                  <img
                    src={arrowVector}
                    alt="arrow"
                    style={{ width: "20px" }}
                  />
                </span>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: " end",
                  alignItems: "end",
                  gap: " 10px",
                  height: "100%",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#252746",
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "400",
                    marginRight: "20px",
                  }}
                >
                  المستخدمين الجدد لهذا الشهر{" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "#10CC8A",
                    fontSize: { xl: "30px", md: "20px" },
                    fontWeight: "400",
                    marginRight: "20px",
                  }}
                >
                  %14{" "}
                </Typography>
                <span>
                  <img
                    src={arrowVector}
                    alt="arrow"
                    style={{ width: "20px" }}
                  />
                </span>
              </Box>
            </Box>
            <Box>
              {/* <Box sx={{ width: "100%" }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xl: "30px", md: "20px" },
                      fontWeight: "700",
                      color: "#252746",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // marginBottom: "40px",
                    }}
                  >
                    المستخدمين الجدد لاخر شهر
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xl: "35px", md: "20px" },
                      fontWeight: "700",
                      color: "#252746",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {dataDatails[0].userCount}
                  </Typography>
                </Box>
              </Box> */}

              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Bar data={data} options={options}></Bar>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboardGeneralStatisticPage;
