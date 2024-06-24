import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Import axios library
import Cookie from "cookie-universal";
import { GetProfile } from "../apiRequests/apiRequest";

const UserProfileContext = createContext({
  userProfileImage: null, // Initial state
  setUserProfileImage: () => {}, // Empty function for type safety
});

export const UserProfileImageProvider = ({ children }) => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  //to get token from login page
  const cookies = Cookie();
  const token = cookies.get("Cookie");
  const fetchUserProfileImage = async () => {
    try {
      const response = await axios.get(`${GetProfile}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const res = response.data.userImage;
      setUserProfileImage(res);
      console.log(res);
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };

  useEffect(() => {
    fetchUserProfileImage();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ userProfileImage, setUserProfileImage }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileImage = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfileImage must be used within a UserProfileImageProvider"
    );
  }
  return context;
};
