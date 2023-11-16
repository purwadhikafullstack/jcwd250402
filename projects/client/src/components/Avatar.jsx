import React, { useEffect, useState } from "react";
import api from "../api.js";

const Avatar = ({ width, height }) => {
  const [profilePicture, setProfilePicture] = useState(null); // Change to null for better handling
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/user/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { profilePicture } = response.data.userInfo;
          setProfilePicture(profilePicture);
        }
      } catch (error) {
        setProfilePicture(
          "ttps://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
        );
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  const defaultAvatar =
    "https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif";

  const profilePictureSrc = profilePicture
    ? `http://localhost:8000/profile-picture/${profilePicture}`
    : defaultAvatar;

  return (
    <img
      className="rounded-full"
      src={profilePictureSrc}
      alt="avatar"
      height={height}
      width={width}
    />
  );
};

export default Avatar;
