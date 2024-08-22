import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { IoIosImages } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import SideNavStyle from "./SideNav.module.css";

const SideNav = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    const user = localStorage.getItem("user"); // Check key name here
    if (user) {
      const LoggedInUser = JSON.parse(user);
      console.log("Current user:", LoggedInUser);
      setUserDetails(LoggedInUser);
      setUserToken(LoggedInUser.verificationToken);
      console.log("User Token:", LoggedInUser.verificationToken);

      try {
        const response = await axios.post(
          "http://localhost:5085/api/account/logout",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(userToken)}`,
            },
          }
        );
        if (response.ok) {
          // Clear local storage or any other client-side storage
          localStorage.removeItem("verificationToken");
          localStorage.removeItem("appUserId");

          // Redirect to a logout confirmation page
          setTimeout(() => navigate("/logout"), 3000);
        } else {
          console.error("Failed to logout");
        }
      } catch (error) {
        console.error("An error occurred while logging out", error);
      }
    }
  };

  return (
    <div className={SideNavStyle.menu}>
      <div className={SideNavStyle.logo}>
        <img src="/images/Image Gallery.png" alt="Logo" />
      </div>
      <div className={SideNavStyle.sideNav}>
        <button className={SideNavStyle.btn} onClick={() => navigate("/home")}>
          <GoHome className={SideNavStyle.navIcons} />
          Home
        </button>
        <button
          className={SideNavStyle.btn}
          onClick={() => navigate("/upload-images")}
        >
          <VscDeviceCamera className={SideNavStyle.navIcons} /> Image Upload
        </button>
        <button
          className={SideNavStyle.btn}
          onClick={() => navigate("/my-library")}
        >
          <IoIosImages className={SideNavStyle.navIcons} />
          My Library
        </button>
        <button className={SideNavStyle.logout} onClick={handleLogout}>
          <MdLogout className={SideNavStyle.navIcons} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;
