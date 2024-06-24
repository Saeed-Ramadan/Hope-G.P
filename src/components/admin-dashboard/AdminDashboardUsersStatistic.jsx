import { Box, Typography } from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AdminDashboardSecondNavigation from "./AdminDashboardSecondNavigation";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";

import {
  Chart as ChartJS,
  Chart as ChartJS1,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  GetNumberOfNewUserPerWeek,
  GetUserCount,
} from "../../apiRequests/apiRequest";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS1.register(ArcElement, Tooltip, Legend);
function AdminDashboardUsersStatistic() {
  const [usersCount, setUsersCount] = useState(null);
  const [usersAdvancePercentage, setUsersAdvancePercentage] = useState(null);
  console.log(usersAdvancePercentage);
  const [usersWeaklyCount, setUsersWeaklyCount] = useState(null);
  const [usersTodayCount, setUsersTodayCount] = useState(null);
  console.log("usersTodayCount" + usersTodayCount);
  const [thisMonthUsersCountSetting, setThisMonthUsersCountSetting] =
    useState(null);
  // console.log(usersWeaklyCount);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchUsersCountData = async () => {
      try {
        const response = await axios.get(GetUserCount);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setUsersCount(data.usersCount);
        // Convert advancePercentage to percentage format
        const percentage = data.advancePercentage;
        setUsersAdvancePercentage(percentage);

        const lastMonthUsers = data.advancePercentage / (100 * data.usersCount);
        setThisMonthUsersCountSetting(lastMonthUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchUsersCountWeaklyData = async () => {
      try {
        const response = await axios.get(GetNumberOfNewUserPerWeek);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setUsersWeaklyCount(data);
        const latestValue = data[data.length - 1];
        console.log("latestValue" + latestValue);
        setUsersTodayCount(latestValue);
        // console.log("latestValue" + latestValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersCountData();
    fetchUsersCountWeaklyData();
  }, []);
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "369",
        data: usersWeaklyCount,
        backgroundColor: "#D9D9D9",
        width: "10",
        borderWidth: 1,
        borderRadius: "30",
      },
    ],
  };

  const options = {};

  const DoughnutData = {
    labels: ["المحذوفة", "الكل"],
    datasets: [
      {
        label: "Poll",
        data: [56, usersCount],
        backgroundColor: ["#F5F7FA", "#48C6EF"],

        borderRadius: "20",
      },
    ],
  };
  const DoughnutOptions = {
    aspectRatio: 1, // Aspect ratio of the chart
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Prevent the chart from maintaining a specific aspect ratio
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
          background: "#FFF",
          height: { xl: "85vh", ms: "81vh" },
          width: "100%",
          borderRadius: "35px",
          padding: "50px",
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
              height: "50px",
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
        <AdminDashboardSecondNavigation />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: { xl: "600px", md: "500px" },
              height: { xl: "550px", md: "400px" },
              borderRadius: "35px",
              border: "1px solid #D9D9D9",
              padding: "10px",
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
                    width: "70px",
                    height: "70px",
                    borderRadius: "17px",
                    background: "#6C70FC",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GroupsIcon style={{ color: "#fff" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              >
                الحسابات في Hope
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "50px",
                marginBottom: "30px",
                width: { xl: "500px", lg: "400" },
                height: { xl: "300px", lg: "200" },
              }}
            >
              <Doughnut
                data={DoughnutData}
                options={DoughnutOptions}
              ></Doughnut>
            </Box>
            <Box sx={{ marginLeft: "50px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",

                  fontSize: "20px",
                }}
              >
                <span>113</span>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#252746",
                  }}
                >
                  الحسابات المحذوفة
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "20px",
                  fontSize: "20px",
                }}
              >
                <span>{usersCount !== null ? usersCount : "..."}</span>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#252746",
                  }}
                >
                  كل الحسابات علي Hope
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xl: "1200px", md: "700px" },
              height: { xl: "550px", md: "400px" },

              borderRadius: "35px",
              border: "1px solid #D9D9D9",
              padding: "20px",
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
                  fontSize: "25px",
                }}
              >
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "17px",
                    background: "#FD4F58",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FolderCopyIcon style={{ color: "#fff" }} />
                </Box>
                المستخدمين الجدد
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              >
                April 2024
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  المستخدمين الجدد{" "}
                </Typography>{" "}
                <span
                  style={{
                    fontSize: "20px",
                    color: usersAdvancePercentage > 0 ? "green" : "red",
                  }}
                >
                  {usersAdvancePercentage !== null
                    ? usersAdvancePercentage
                    : "..."}{" "}
                  % <TrendingUpIcon />
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                marginTop: { xl: "80px", md: "30px" },
              }}
            >
              <Box sx={{ width: "300px" }}>
                <Box sx={{ marginBottom: { xl: "70px", md: "20px" } }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#252746",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: { xl: "40px", lg: "20px" },
                    }}
                  >
                    المستخدمين الجدد لليوم
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#252746",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {usersTodayCount !== null ? usersTodayCount : "..."}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                >
                  <span>
                    {thisMonthUsersCountSetting !== null
                      ? thisMonthUsersCountSetting
                      : "..."}
                  </span>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#252746",
                    }}
                  >
                    المستخدمين الجدد لهذا الشهر
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                >
                  <span>{usersCount !== null ? usersCount : "..."}</span>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#252746",
                    }}
                  >
                    المستخدمين الجدد للشهر السابق
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: { xl: "600px", lg: "500px" } }}>
                <Bar data={data} options={options}></Bar>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboardUsersStatistic;
