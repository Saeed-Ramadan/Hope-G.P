import { Box, Typography } from "@mui/material";
// import AdminDashboardOuterNavigation from "./AdminDashboardOuterNavigation";

// import MoreTimeIcon from "@mui/icons-material/MoreTime";
// import AdminDashboardSecondNavigation from "./AdminDashboardSecondNavigation";
import edit from "../../assets/admin/adminDetails/edit.png";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { useEffect, useState } from "react";
import axios from "axios";
import { GetNumberOfNewPostsPerWeek } from "../../apiRequests/apiRequest";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PostAdminDash = () => {
  const [PostsWeaklyCount, setPostsWeaklyCount] = useState(null);
  const [usersTodayCount, setUsersTodayCount] = useState(null);
  useEffect(() => {
    const fetchUsersCountWeaklyData = async () => {
      try {
        const response = await axios.get(GetNumberOfNewPostsPerWeek);

        // Extract the usersCount from the response data
        const { data } = response.data;

        setPostsWeaklyCount(data);
        const latestValue = data[data.length - 1];
        console.log("latestValue" + latestValue);
        setUsersTodayCount(latestValue);
        // console.log("latestValue" + latestValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsersCountWeaklyData();
  }, []);
  const [chartData, setchartData] = useState({});
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "",
        data: PostsWeaklyCount,
        backgroundColor: "#A25BFE",
        // color:"#A25BFE",
        borderColor: "#A25BFE",
        width: 5,
        borderWidth: 5,
        fontSize: "50px",
        borderRadius: 50,
        maxBarThickness: 28,
      },
    ],
  };
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
            size: 40,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 40,
          },
        },
      },
    },
  };
  return (
    <Box
      sx={{
        border: "1px solid #D9D9D9",
        borderRadius: "35px",
        width: "100%",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        // gap: "15px",
        // height: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: { xl: "30px", md: "20px" },
            fontWeight: "600",
          }}
        >
          <span
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "#A25BFE",
              display: "block",
            }}
          ></span>
          المنشورات الجديدة
        </Typography>
        <Box component="img" src={edit} alt="edit"></Box>
      </Box>
      <Box className="lincanvs" sx={{ marginTop: "50px" }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default PostAdminDash;
