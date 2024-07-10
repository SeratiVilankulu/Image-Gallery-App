import React from "react";
import PageStyle from "./HomePage.module.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const ReactPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        // Clear local storage or any other client-side storage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    }
  };
  return (
    <div className={PageStyle.container}>
      <div className={PageStyle.menu}>
        <div className={PageStyle.logo}>Logo</div>
        <div className={PageStyle.sideNav}>
          <button>
            <GoHome className={PageStyle.navIcons} />
            Home
          </button>
          <button>
            <VscDeviceCamera className={PageStyle.navIcons} /> Image Upload
          </button>
          <button className={PageStyle.logout} onClick={handleLogout}>
            <MdLogout className={PageStyle.navIcons} />
            Logout
          </button>
        </div>
      </div>
      <div className={PageStyle.mainPage}>
        <div className={PageStyle.topNav}>
          <button className={PageStyle.btn}>
            Home
            <IoIosArrowForward className={PageStyle.topNavIcons} />
          </button>
          <button className={PageStyle.btn}>
            <CgProfile />
            seratimotla@gmail.com
            <IoIosArrowDown className={PageStyle.topNavIcons} />
          </button>
        </div>
        <IoSearch />
        <input type="text" placeholder="Search for..." />
      </div>
    </div>
  );
};

export default ReactPage;
