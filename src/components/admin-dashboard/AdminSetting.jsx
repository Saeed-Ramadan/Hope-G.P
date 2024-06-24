import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
} from "@mui/material";
import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminRegister from "./AdminRegister";
// import AdminDashboardSecondNavigation from "./AdminDashboardSecondNavigation";
import axios from "axios";
import {
  GetAdminsCount,
  GetDeletedPostsCount,
  GetPostsCount,
  GetUserCount,
} from "../../apiRequests/apiRequest";
function AdminSetting() {
  const [value, setValue] = useState(0);
  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
  };
  const [usersCountSetting, setUsersCountSetting] = useState(null);
  const [adminsCountSetting, setAdminsCountSetting] = useState(null);
  const [lastMonthUsersCountSetting, setLastMonthUsersCountSetting] =
    useState(null);
  const [postsCountSetting, setPostsCountSetting] = useState(null);
  const [lastMonthPostsCountSetting, setLastMonthPostsCountSetting] =
    useState(null);
  const [deletedPostsCountSetting, setDeletedPostsCountSetting] =
    useState(null);
  // console.log(deletedPostsCountSetting);
  // console.log(usersCountSetting);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchUsersCountData = async () => {
      try {
        const response = await axios.get(GetUserCount);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setUsersCountSetting(data.usersCount);
        const lastMonthUsers = data.advancePercentage / (100 * data.usersCount);
        console.log("lastMonthUsers" + lastMonthUsers);
        setLastMonthUsersCountSetting(lastMonthUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data when the component mounts
    const fetchPostsCountData = async () => {
      try {
        const response = await axios.get(GetPostsCount);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setPostsCountSetting(data.currentCount);
        const lastMonthPosts =
          data.advancePercentage / (100 * data.currentCount);
        // console.log("lastMonthPosts" + lastMonthPosts);
        setLastMonthPostsCountSetting(lastMonthPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    const fetchDeletedPostsCountData = async () => {
      try {
        const response = await axios.get(GetDeletedPostsCount);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setDeletedPostsCountSetting(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    const fetctAdminsCountData = async () => {
      try {
        const response = await axios.get(GetAdminsCount);
        // Extract the usersCount from the response data
        const { data } = response.data;
        // console.log(data);
        setAdminsCountSetting(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsersCountData();
    fetchPostsCountData();
    fetchDeletedPostsCountData();
    fetctAdminsCountData();
  }, []);
  return (
    <Box
      sx={{
        background: "#D3E4FF",
        padding: "30px",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Box sx={{ width: "100%", height: "10%" }}>
        <AdminDashboardOuterNavigation />
      </Box>
      <Box
        sx={{
          background: "#FFF",
          // height: "850px",
          width: "100%",
          borderRadius: "35px",
          padding: "40px",
          height: { xl: "85vh", md: "81vh" },
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
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              borderRadius: "100px",
            }}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={handleNavigationChange}
              sx={{
                backgroundColor: "#EBECED", // Background color
                padding: "10px", // Padding
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
                borderRadius: "100px",
                width: "636px",
                height: "70px",
              }}
            >
              <BottomNavigationAction
                label="اضافة مشرفين"
                sx={{
                  fontSize: "16px",
                  color: "#252746",
                }}
              />
              <BottomNavigationAction
                label="ملاحظات"
                sx={{
                  fontSize: "16px",
                  color: "#252746",
                }}
              />
              <BottomNavigationAction
                label="طباعة تقرير"
                sx={{
                  fontSize: "16px",
                  color: "#252746",
                }}
              />

              <Link
                to="/MainCreatePost"
                style={{
                  color: "#252746",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              >
                انشاء منشور
                <BottomNavigationAction icon={<AddIcon />} />
              </Link>
            </BottomNavigation>
          </Box>
        </Box>
        {/* Render different content based on selected BottomNavigationAction */}
        <Box>
          {value === 0 && <AdminRegister />}
          {value === 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: { xl: "50px", md: "20px" },
              }}
            >
              <Box
                sx={{
                  width: "80vw",
                  height: { xl: "65vh", md: "55vh" },
                  borderRadius: "35px",
                  border: "2px solid #D9D9D9",
                }}
              >
                <Box
                  sx={{
                    height: "80px",
                    borderBottom: "1px solid #D9D9D9",
                    padding: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: " 25px",
                      fontWeight: "600",
                      color: "#252746",
                    }}
                  >
                    ملاحظات
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "80px",
                    padding: "20px 20px 20px 0",
                  }}
                >
                  <Box
                    sx={{
                      width: "calc(100% - 200px)",
                      height: { xl: "55vh", md: "40vh" },
                      overflowY: "scroll",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          width: "330px",
                          height: "200px",
                          borderRadius: "30px",
                          background: "#FD9B71",
                          padding: "20px",
                          overflow: "hidden",
                        }}
                      >
                        <Typography sx={{ fontSize: "20px" }}>
                          كله تمام وفل الفل يا شباب وان شاء الله خير{" "}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "330px",
                          height: "200px",
                          borderRadius: "30px",
                          background: "#FDC86F",
                          padding: "20px",
                          overflow: "hidden",
                        }}
                      >
                        <Typography sx={{ fontSize: "20px" }}>
                          كله تمام وفل الفل يا شباب وان شاء الله خير{" "}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "330px",
                          height: "200px",
                          borderRadius: "30px",
                          background: "#B592FB",
                          padding: "20px",
                          overflow: "hidden",
                        }}
                      >
                        <Typography sx={{ fontSize: "20px" }}>
                          كله تمام وفل الفل يا شباب وان شاء الله خير{" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "85px",
                      height: "344px",
                      background: "#F8F9FA",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "30px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "55px",
                            height: "55px",
                            borderRadius: "50%",
                            background: "#303030",
                          }}
                        >
                          <AddIcon style={{ color: "#fff" }} />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            background: "#FD9B71",
                          }}
                        ></Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            background: "#FDC86F",
                          }}
                        ></Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            background: "#B592FB",
                          }}
                        ></Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            background: "#87F4FD",
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {value === 2 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "80vw",
                  height: { xl: "65vh", md: "55vh" },
                  border: "1px solid #D9D9D9",
                  borderRadius: "35px",
                  marginTop: "40px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "55vw",
                    // height: { xl: "50vh", lg: "55vh" },
                    border: "1px solid #D9D9D9",
                    borderRadius: "35px",
                    padding: "30px",
                    marginTop: "15px",
                  }}
                >
                  <Box sx={{ marginBottom: { xl: "80px", md: "40px" } }}>
                    <Typography
                      sx={{
                        fontSize: { xl: "35px", md: "30px" },
                        fontWeight: "600",
                        color: "#252746",
                      }}
                    >
                      المستخدمين والمشرفين
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFB86D",
                        marginBottom: "50px",
                      }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        عدد المستخدمين للشهر الماضى
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {lastMonthUsersCountSetting !== null
                            ? lastMonthUsersCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFB86D",
                        marginBottom: "50px",
                      }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        كل المستخدمين
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {usersCountSetting !== null
                            ? usersCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", color: "#FFB86D" }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        عدد المشرفين علي الموقع
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {adminsCountSetting !== null
                            ? adminsCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "22vw",

                    border: "1px solid #D9D9D9",
                    borderRadius: "35px",
                    padding: "30px",
                    marginTop: "15px",
                  }}
                >
                  <Box sx={{ marginBottom: { xl: "80px", md: "20px" } }}>
                    <Typography
                      sx={{
                        fontSize: { xl: "35px", md: "30px" },
                        fontWeight: "600",
                        color: "#252746",
                      }}
                    >
                      المنشورات
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFB86D",
                        marginBottom: { xl: "50px", md: "30px" },
                      }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        المنشورات الجديده للشهر الماضى
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {postsCountSetting !== null
                            ? postsCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFB86D",
                        marginBottom: "50px",
                      }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        كل المنشورات على الموقع
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {postsCountSetting !== null
                            ? postsCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFB86D",
                        marginBottom: "50px",
                      }}
                      className="bullet-point"
                    >
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#2E74FD",
                          fontSize: { xl: "28px", md: "20px" },
                        }}
                      >
                        المنشورات المحذوفة
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#000",
                            fontSize: { xl: "28px", md: "20px" },
                          }}
                        >
                          {deletedPostsCountSetting !== null
                            ? deletedPostsCountSetting
                            : "..."}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminSetting;
