import React, { useState, useEffect } from "react";
import axios from "axios";
import PageStyle from "./HomePage.module.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import {} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [images, setImages] = useState([]); //images state stores the fetched image details.
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the uploaded images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5085/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };

    fetchImages();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5085/api/account/logout", {
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
        navigate("/");
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
          <button className={PageStyle.btn}>
            <GoHome className={PageStyle.navIcons} />
            Home
          </button>
          <button className={PageStyle.btn}>
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
          <button className={PageStyle.topBtn}>
            Home
            <IoIosArrowForward className={PageStyle.topNavIcons} />
          </button>
          <button className={PageStyle.topBtn}>
            <CgProfile />
            seratimotla@gmail.com
            <IoIosArrowDown className={PageStyle.topNavIcons} />
          </button>
        </div>
        <div className={PageStyle.filterSection}>
          <IoSearch className={PageStyle.searchIcon} />
          <input
            type="text"
            placeholder="Search for..."
            className={PageStyle.searchBar}
          />

          <input type="submit" value="Filters" className={PageStyle.filter} />
          <IoFilter className={PageStyle.filterIcon} />
        </div>
        <div className={PageStyle.imageContainer}>
          {images.map((image) => (
            <div className={PageStyle.imageCard} key={image.id}>
              <img
                src={image.imageURL}
                alt={image.Title}
                className={PageStyle.image}
              />
              <div className={PageStyle.overlay}>
                <h2>{image.title}</h2>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={PageStyle.pagnation}>Pagnation</div>
      </div>
    </div>
  );
};

export default HomePage;
