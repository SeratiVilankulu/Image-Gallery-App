import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import TopNavStyle from "./TopNav.module.css";

const TopNav = () => {
  return (
    <div className={TopNavStyle.topNav}>
      <button className={TopNavStyle.topBtn}>
        My Library
        <IoIosArrowForward className={TopNavStyle.topNavIcons} />
      </button>
      <button className={TopNavStyle.topBtn}>
        <CgProfile />
        example@gmail.com
        <IoIosArrowDown className={TopNavStyle.topNavIcons} />
      </button>
    </div>
  );
};

export default TopNav;
