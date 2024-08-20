import React from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { IoIosImages } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import SideNavStyle from "./SideNav.module.css";

const SideNav = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5085/api/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("verrificationToken")}`,
        },
      });
      if (response.ok) {
        // Clear local storage or any other client-side storage
        localStorage.removeItem("verrificationToken");
        localStorage.removeItem("appUserId");

        // Redirect to login page or a logout confirmation page
        navigate("/logout");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
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
