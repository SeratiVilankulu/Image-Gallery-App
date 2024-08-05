import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageStyles from "./ImageDetails.module.css";
import PageStyle from "../Home/HomePage.module.css";
import SideNav from "../Navigations/SideNav";
import TopNav from "../Navigations/TopNav";
import { MdClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const ImageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};

  //Function to delete image
  const deleteImage = async () => {
    try {
      if (!image.imageID) return; //Check if the image exists
      const response = await axios.delete(
        `http://localhost:5085/api/images/${id}`
      );
      setImage(response.data);
    } catch (error) {
      console.error("An error occurred while fetching the image", error);
    }
  };

  if (!image) {
    return <div>Image not found :(</div>;
  }

  return (
    <div className={PageStyle.container}>
      <SideNav />
      <div className={PageStyle.mainPage}>
        <TopNav />
        <button
          className={ImageStyles.closeButton}
          onClick={() => navigate(-1)}
        >
          <MdClose />
        </button>

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
          </div>
        </div>
        <button onClick={deleteImage} className={ImageStyles.delete}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default ImageDetails;
