import React from "react";
import "./HomePage.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";

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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
