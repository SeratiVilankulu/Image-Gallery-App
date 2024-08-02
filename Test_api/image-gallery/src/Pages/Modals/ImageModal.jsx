import React from "react";
import PropTypes from "prop-types";
import PageStyle from "./ImageModal.module.css";

const ImageModal = ({ imageURL, title, description, onClose }) => {
  return (
    <div className={PageStyle.modalOverlay}>
      <div className={PageStyle.modalContent}>
        <span className={PageStyle.closeButton} onClick={onClose}>
          &times;
        </span>
        <img src={imageURL} alt={title} className={PageStyle.modalImage} />
        <div className={PageStyle.overlay}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
