import React, { useState, useEffect } from "react";
import axios from "axios";
import PageStyle from "./HomePage.module.css";
import { IoIosArrowBack, IoIosArrowForward as IoForward } from "react-icons/io";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SideNav from "../Navigations/SideNav";
import TopNav from "../Navigations/TopNav";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import SearchResultsList from "../SearchAndFilter/SearchResultsList";

const HomePage = () => {
  const [images, setImages] = useState([]); // State to store fetched images
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const imagesPerPage = 4; // Number of images to display per page
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

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

  //Function to view image
  const imageClick = (image) => {
    if (image.imageID) {
      navigate(`/image/${image.imageID}`, { state: { image } });
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
        <SearchAndFilter setResults={setResults} />
        <SearchResultsList results={results} />
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

export default HomePage;
