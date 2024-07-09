import React from "react";
import "./HomePage.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
    <div className="homePage-container">
      <div className="navigation-container">
        <div className="nav">
          <h1 className="logo">Logo</h1>
          <button>
            <span>
              <GoHome className="nav-icons" />
            </span>
            Home
          </button>
          <button>
            <span>
              <VscDeviceCamera className="nav-icons" />
            </span>
            Image Upload
          </button>
          <button className="logout" onClick={handleLogout}>
            <span>
              <MdLogout className="nav-icons" />
            </span>
            Logout
          </button>
        </div>
        <div className="main-area">
          <div className="image-upload">
            <div className="top-nav">home</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
