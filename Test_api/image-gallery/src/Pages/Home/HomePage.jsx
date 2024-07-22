import React, { useState, useEffect } from "react";
import axios from "axios";
import PageStyle from "./HomePage.module.css";
import { GoHome } from "react-icons/go";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import {
  IoIosImages,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward as IoForward,
} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [images, setImages] = useState([]); // State to store fetched images
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const imagesPerPage = 4; // Number of images to display per page
  const navigate = useNavigate();

  const handleUpload = {};

  useEffect(() => {
    // Fetch the uploaded images from the backend when the component mounts
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5085/api/images");
        setImages(response.data); // Update state with fetched images
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };

    fetchImages();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5085/api/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token in request header
        },
      });
      if (response.ok) {
        localStorage.removeItem("token"); // Clear token from local storage
        navigate("/"); // Redirect to login page
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    }
  };

  // Calculate the indexes for the images to display on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage); // Slice the images array to get images for the current page

  // Generate page numbers dynamically based on the total number of images and images per page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={PageStyle.container}>
      <div className={PageStyle.menu}>
        <div className={PageStyle.logo}>Logo</div>
        <div className={PageStyle.sideNav}>
          <button className={PageStyle.btn} onClick={() => navigate("/home")}>
            <GoHome className={PageStyle.navIcons} />
            Home
          </button>
          <button
            className={PageStyle.btn}
            onClick={() => navigate("/upload-images")}
          >
            <VscDeviceCamera className={PageStyle.navIcons} /> Image Upload
          </button>
          <button className={PageStyle.btn} onClick={() => navigate("/")}>
            <IoIosImages className={PageStyle.navIcons} />
            My Library
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
          {currentImages.map((image) => (
            <div className={PageStyle.imageCard} key={image.id}>
              <img src={image.imageURL} className={PageStyle.image} />
              <div className={PageStyle.overlay}>
                <h2>{image.title}</h2>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={PageStyle.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={PageStyle.pageArrow}
          >
            <IoIosArrowBack />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={PageStyle.pageNumber}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === pageNumbers.length}
            className={PageStyle.pageArrow}
          >
            <IoForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
