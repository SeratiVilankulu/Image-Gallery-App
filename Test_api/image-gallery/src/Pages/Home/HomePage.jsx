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
  const [currentPage, setCurrentPage] = useState(1); // Number of images to display per page
  const imagesPerPage = 4;
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterByTags, setFilterByTags] = useState("");
  const [filteredImages, setFilteredImages] = useState([]); // Store filtered images
  const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);

  // Fetch the uploaded images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5085/api/images");
        setImages(response.data);
        setFilteredImages(response.data); // Initially set filtered images to all images
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };

    fetchImages();
  }, []);

  // Filter images based on the selected tag
  useEffect(() => {
    if (filterByTags) {
      const newFilteredImages = images.filter(
        (image) =>
          image.tags.some(
            (tag) => tag.tagName.toLowerCase() === filterByTags.toLowerCase()
          ) //Checks if at least one tag in image.tags meets the condition.
      );
      setFilteredImages(newFilteredImages); // Updates the filteredImages state with the newly filtered images.
      console.log("Filtered Images:", newFilteredImages);
    } else {
      setFilteredImages(images);
      console.log(images);
    }
  }, [filterByTags, images]);

  // Selects tagName in search
  const handleTagClick = (tagName) => {
    setSearchInput(tagName);
    setShowResults(false);
    setResults([]);
  };

  const handleFilter = (tagName) => {
    setFilterByTags(tagName); // Update filterByTags to trigger filtering
  };

  //Function to view image
  const imageClick = (image) => {
    if (image.imageID) {
      navigate(`/image/${image.imageID}`, { state: { image } });
    }
  };

  // Calculate the indexes for the images to display on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const getVisiblePages = (currentPage) => {
    const startPage = Math.max(1, currentPage - 1); // Display 3 pages at a time
    const endPage = Math.min(startPage + 2, totalPages);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

   const visiblePages = getVisiblePages(currentPage);

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
        <SearchAndFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setResults={setResults}
          onTagClick={handleFilter}
          setShowResults={setShowResults}
        />
        {showResults && (
          <SearchResultsList results={results} onTagClick={handleTagClick} />
        )}
        <div className={PageStyle.imageContainer}>
          {currentImages.length > 0 ? (
            currentImages.map((image) => (
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
            ))
          ) : (
            <p className={PageStyle.noImage}>
              No images found for the selected tag.
            </p>
          )}
        </div>
        <div className={PageStyle.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={PageStyle.pageArrow}
          >
            <IoIosArrowBack />
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${PageStyle.pageNumber} ${
                currentPage === number ? PageStyle.activePage : ""
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
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
