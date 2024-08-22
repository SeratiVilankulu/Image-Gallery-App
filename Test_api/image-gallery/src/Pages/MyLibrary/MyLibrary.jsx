import React, { useState, useEffect } from "react";
import axios from "axios";
import PageStyle from "../Home/HomePage.module.css";
import MyLibraryStyles from "./MyLibrary.module.css";
import { useNavigate } from "react-router-dom";
import SideNav from "../Navigations/SideNav";
import TopNav from "../Navigations/TopNav";
import { IoIosArrowBack, IoIosArrowForward as IoForward } from "react-icons/io";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { IoMdImages } from "react-icons/io";

const MyLibrary = () => {
  const [images, setImages] = useState([]); // State to store fetched images
  const [userInfo, setUserInfo] = useState(null);
  const [userID, setUserID] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const imagesPerPage = 4; // Number of images to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserInfo(user);
      setUserID(user.appUserId); // Set the username in the input field

      // Fetch images by userId
      const fetchImages = async (userId) => {
        try {
          const response = await axios.get(
            `http://localhost:5085/api/images/user/${userId}`
          );
          setImages(response.data); // Store the fetched images in state
        } catch (error) {
          console.error("An error occurred while fetching images", error);
        }
      };

      fetchImages(user.appUserId); // Pass userId to fetchImages
    }
  }, []);

  //Function to view image
  const imageClick = (image) => {
    if (image.imageID) {
      navigate(`/image/${image.imageID}`, {
        state: { image, fromMyLibrary: true },
      });
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
      <SideNav />
      <div className={PageStyle.mainPage}>
        <TopNav />
        <div className={MyLibraryStyles.title}>My Library</div>

        {/* return this if the user has not posted any images yet */}
        {images.length === 0 ? (
          <div className={MyLibraryStyles.message}>
            <div className={MyLibraryStyles.noImage}>
              User has not posted images yet
            </div>
            <IoMdImages className={MyLibraryStyles.imageIcon} />
          </div>
        ) : (
          <div className={PageStyle.imageContainer}>
            {currentImages.map((image) => (
              <div className={PageStyle.imageCard} key={image.id}>
                <img
                  src={image.imageURL}
                  className={PageStyle.image}
                  onClick={() => imageClick(image)}
                />
                <div className={PageStyle.overlay}>
                  <h2>{image.title}</h2>
                </div>
                <MdOutlineChatBubbleOutline className={PageStyle.comment} />
              </div>
            ))}
          </div>
        )}
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
              type="submit"
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

export default MyLibrary;
