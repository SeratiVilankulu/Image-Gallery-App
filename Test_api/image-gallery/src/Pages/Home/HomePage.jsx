import React from "react";
import "./HomePage.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="homePage-container">
      <div className="navigation-container">
        <div className="nav">
          <h1 className="logo">Logo</h1>
          <div className="home-nav menu-nav">
            <p>
              <span>
                <GoHome className="nav-icons" />
              </span>
              Home
            </p>
          </div>
          <div className="upload-nav menu-nav">
            <p>
              <span>
                <VscDeviceCamera className="nav-icons" />
              </span>
              Image Upload
            </p>
          </div>
          <div className="logout-nav menu-nav">
            <p>
              <span>
                <MdLogout className="nav-icons" />
              </span>
              Logout
            </p>
          </div>
        </div>
        <div className="main-area">
          <div className="image-upload">
            <div className="top-nav">
              <p>Home</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
