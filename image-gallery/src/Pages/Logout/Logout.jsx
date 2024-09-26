import React from "react";
import PageStyle from "../Home/HomePage.module.css";
import Style from "./Logout.module.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { IoIosImages } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div className={PageStyle.container}>
      <div className={Style.menu}>
        <div className={Style.logo}>
          <img src="/images/Image Gallery.png" alt="Logo" />
        </div>
        <div className={Style.sideNav}>
          <button className={Style.btn}>
            <GoHome className={Style.navIcons} />
            Home
          </button>
          <button className={Style.btn}>
            <VscDeviceCamera className={Style.navIcons} /> Image Upload
          </button>
          <button className={Style.btn}>
            <IoIosImages className={Style.navIcons} />
            My Library
          </button>
          <button className={Style.logout}>
            <MdLogout className={Style.navIcons} />
            Logout
          </button>
        </div>
      </div>
      <div className={Style.mainPage}>
        <div className={Style.logOut}>
          <img
            src="/images/Image Gallery Logout.png"
            alt="Logo"
            className={Style.logoutImage}
          />
          <hr />
          <p className={Style.logoutMessage}>
            You have successfully logged out
          </p>
          <button className={Style.loginBtn} onClick={() => navigate("/")}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
