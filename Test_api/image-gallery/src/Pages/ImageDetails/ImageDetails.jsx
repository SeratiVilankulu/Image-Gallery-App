import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageStyles from "./ImageDetails.module.css";
import PageStyle from "../Home/HomePage.module.css";
import SideNav from "../Navigations/SideNav";
import TopNav from "../Navigations/TopNav";
import Modal from "../Modal/Modal";
import Comments from "../Comments/Comments";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import { MdClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineChatBubbleOutline, MdEdit } from "react-icons/md";
const ImageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};
  const { comment } = location.state || {};

  const [editIcon, setShowEditIcon] = useState(false);
  const [actions, setShowActions] = useState(false);
  const [deleteIcon, setShowDeleteIcon] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(image);

  useEffect(() => {
    if (image) {
      setShowEditIcon(location.state?.fromMyLibrary || false); //Show edit icon in MyLibrary
      setShowDeleteIcon(location.state?.fromMyLibrary || false); //Show delete icon in MyLibrary
      setShowActions(location.state?.fromMyLibrary || false); //Show comment actions icon in MyLibrary
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

  // Function to update image details dynamically
  const updateImageDetails = (newDetails) => {
    setUpdatedImage((prevImage) => ({
      ...prevImage,
      ...newDetails,
    }));
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
          <div className={ImageStyles.imageCard} key={updatedImage.id}>
            <img
              src={updatedImage.imageURL}
              alt={updatedImage.title}
              className={ImageStyles.image}
            />
            <div className={ImageStyles.overlay}>
              <div className={ImageStyles.titleContainer}>
                <h2>{updatedImage.title}</h2>
                {editIcon && (
                  <MdEdit
                    className={ImageStyles.edit}
                    onClick={() => setOpenModal(true)}
                  />
                )}
              </div>
              <p>{updatedImage.description}</p>
            </div>
          </div>
        </div>
        <div className={ImageStyles.icons}>
          <MdOutlineChatBubbleOutline className={ImageStyles.comment} />
          {deleteIcon && (
            <RiDeleteBin6Line
              onClick={() => deleteImage(image.imageID)}
              className={ImageStyles.delete}
            />
          )}
        </div>
        <Comments imageId={image.imageID} actions={actions} />
        {openModal && (
          <Modal
            closeModal={() => setOpenModal(false)}
            defaultValue={updatedImage}
            id={image.imageID}
            triggerPopup={handlePopup} // Pass the callback to Modal
            updateImageDetails={updateImageDetails}
          />
        )}
      </div>
    </div>
  );
};
export default ImageDetails;
