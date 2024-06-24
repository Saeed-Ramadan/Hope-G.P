import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Cookie from "cookie-universal";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainCreatePost from "./pages/createPostForm/MainCreatePost";
import SharedPost from "./pages/SharedPost";
import UserOwnProfilePage from "./pages/UserOwnProfilePage";
import UserProfileData from "./components/userProfile-components/UserProfileData";
// import UserProfileChat from "./components/userProfile-components/UserProfileChat";
import UserProfilePosts from "./components/userProfile-components/UserProfilePosts";
import UsersProfile from "./pages/UsersProfile";
import UsersChats from "./components/Others-users-profile/UsersChats";
import Archive from "./pages/Archive";
import EditProgile from "./components/userProfile-components/EditProgile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardGeneralStatisticPage from "./components/admin-dashboard/AdminDashboardGeneralStatisticPage";
import AdminDashboardPostsStatistic from "./components/admin-dashboard/AdminDashboardPostsStatistic";
import AdminDashboardUsersStatistic from "./components/admin-dashboard/AdminDashboardUsersStatistic";
import AdminDashboardSecondNavigation from "./components/admin-dashboard/AdminDashboardSecondNavigation";
import Admins from "./components/admin-dashboard/Admins";
import Users from "./components/admin-dashboard/Users";
import AdminSetting from "./components/admin-dashboard/AdminSetting";
import AddAdmins from "./components/admin-dashboard/AddAdmins";
import Chat from "./components/Chat-components/Chat";
import Error404 from "./pages/Error404";

const App = () => {
  // Get the token from cookies
  const cookies = Cookie();
  const token = cookies.get("Cookie"); // تحقق من اسم الكوكيز الصحيح

  // Check if the token exists
  const isAuthenticated = !!token;

  return (
    <BrowserRouter>
      <Routes>
        {/* Route to home page */}
        <Route path="/HomePage" element={<HomePage />} />
        {/* Route to login page */}
        <Route path="/login" element={<Login />} />
        {/* Private Route to create post page */}
        <Route
          path="/HomePage"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId/:isPeople" element={<SharedPost />} />
        <Route path="/MainCreatePost" element={<MainCreatePost />} />
        {/* user profile routes */}
        <Route path="userProfile" element={<UserOwnProfilePage />} />
        <Route path="/HomePage/userProfile" element={<UserOwnProfilePage />} />
        <Route path="userProfileData" element={<UserProfileData />} />
        {/* <Route path="userProfileChat" element={<UserProfileChat />} /> */}
        <Route path="userProfilePosts" element={<UserProfilePosts />} />
        <Route path="/userProfileData/EditProgile" element={<EditProgile />} />
        {/* OtherUsersProfile */}
        <Route path="/profile/:userId" element={<UsersProfile />} />
        <Route path="usersChats" element={<UsersChats />} />

        {/* archive */}
        <Route path="archive" element={<Archive />} />

        {/* AdminDashboard */}
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route
          path="adminDashboard/adminDashboardGeneralStatistic"
          element={<AdminDashboardGeneralStatisticPage />}
        />
        <Route
          path="adminDashboard/adminDashboardPostsStatistic"
          element={<AdminDashboardPostsStatistic />}
        />
        <Route
          path="adminDashboard/adminDashboardUsersStatistic"
          element={<AdminDashboardUsersStatistic />}
        />
        <Route
          path="adminDashboard/adminDashboardSecondNavigation"
          element={<AdminDashboardSecondNavigation />}
        />
        <Route path="adminDashboard/admins" element={<Admins />} />
        <Route path="adminDashboard/users" element={<Users />} />
        <Route path="adminDashboard/adminSetting" element={<AdminSetting />} />
        <Route path="adminDashboard/addAdmins" element={<AddAdmins />} />

        <Route path="/Chat" element={<Chat />} />
        <Route path="*" exact={true} element={<Error404 />} />

        {/* Default route */}
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
