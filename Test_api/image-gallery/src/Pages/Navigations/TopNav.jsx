import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import TopNavStyle from "./TopNav.module.css";

const TopNav = () => {
  const location = useLocation();

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

  return (
    <div className={TopNavStyle.topNav}>
      <button className={TopNavStyle.topBtn}>
        {getPageTitle()}
        <IoIosArrowForward className={TopNavStyle.topNavIcons} />
      </button>
      <button className={TopNavStyle.topBtn}>
        <CgProfile />
        {userData?.email}
        <IoIosArrowDown className={TopNavStyle.topNavIcons} />
      </button>
    </div>
  );
};

export default TopNav;
