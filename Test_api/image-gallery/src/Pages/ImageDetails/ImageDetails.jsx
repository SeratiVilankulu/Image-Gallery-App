import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageStyles from "./ImageDetails.module.css";
import PageStyle from "../Home/HomePage.module.css";
import SideNav from "../Navigations/SideNav";
import TopNav from "../Navigations/TopNav";
import Modal from "../Modal/Modal";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import { MdClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineChatBubbleOutline, MdEdit } from "react-icons/md";

const ImageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};

  const [editIcon, setShowEditIcon] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (image) {
      setShowEditIcon(location.state?.fromMyLibrary || false);
    }
  }, [image, location.state?.fromMyLibrary]);

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5085/api/images/${id}`);
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  // Function to trigger the popup
  const handlePopup = () => {
    setShowPopup(true); // Show popup
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 3 seconds
    }, 3000);
  };

  if (!image) {
    return <div>Image not found :(</div>;
  }

  return (
    <div className={PageStyle.container}>
      <SideNav />
      <div className={PageStyle.mainPage}>
        <TopNav />
        <SearchAndFilter />
        <button
          className={ImageStyles.closeButton}
          onClick={() => navigate(-1)}
        >
          <MdClose />
        </button>
        {showPopup && (
          <div className={`${ImageStyles.popup} ${showPopup ? "show" : ""}`}>
            Image Details saved successfully!
          </div>
        )}
        <div className={ImageStyles.imageContainer}>
          <div className={ImageStyles.imageCard} key={image.id}>
            <img
              src={image.imageURL}
              alt={image.title}
              className={ImageStyles.image}
            />
            <div className={ImageStyles.overlay}>
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
            {editIcon && (
              <MdEdit
                className={ImageStyles.edit}
                onClick={() => setOpenModal(true)}
              />
            )}
          </div>
        </div>
        <span>
          <MdOutlineChatBubbleOutline className={ImageStyles.comment} />
        </span>
        <span
          onClick={() => deleteImage(image.imageID)}
          className={ImageStyles.delete}
        >
          <RiDeleteBin6Line />
        </span>
        {openModal && (
          <Modal
            closeModal={() => setOpenModal(false)}
            defaultValue={image}
            id={image.imageID}
            triggerPopup={handlePopup} // Pass the callback to Modal
          />
        )}
      </div>
    </div>
  );
};

export default ImageDetails;
