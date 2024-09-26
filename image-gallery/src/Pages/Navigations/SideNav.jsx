import React from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { IoIosImages } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import SideNavStyle from "./SideNav.module.css";

const SideNav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    localStorage.clear();
    // Redirect to a logout confirmation page
    setTimeout(() => navigate("/logout"), 3000);
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
