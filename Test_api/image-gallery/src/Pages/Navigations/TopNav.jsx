import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import TopNavStyle from "./TopNav.module.css";

const TopNav = () => {
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userData from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/my-library":
        return "My Library";
      case "/home":
        return "Home";
      case "/upload-images":
        return "Image Upload";
      // Add more cases as needed
      default:
        return "Home";
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      <div className={TopNavStyle.topNav}>
        <button className={TopNavStyle.topBtn}>
          {getPageTitle()}
          <IoIosArrowForward className={TopNavStyle.topNavIcons} />
        </button>
        <button className={TopNavStyle.topBtn}>
          <CgProfile />
          {userData?.userName}
          <IoIosArrowDown
            className={TopNavStyle.topNavIcons}
            onClick={handleProfileClick}
          />
        </button>
      </div>
      {showProfile && (
        <div className={TopNavStyle.profile}>
          <p>{userData?.email}</p>
          <button onClick={() => navigate("/reset-password")}>
            Rest password
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNav;
