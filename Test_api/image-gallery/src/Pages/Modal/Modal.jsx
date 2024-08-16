import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalStyles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

const Modal = ({ closeModal, id, defaultValue, triggerPopup }) => {
  const [formError, setFormError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (defaultValue) {
      setImageDetails(defaultValue);
    }
  }, [defaultValue]);

  const handleImageData = (name, value) => {
    setImageDetails({
      ...imageDetails,
      [name]: value,
    });
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    setFormError({});

    let inputError = {};
    if (!imageDetails.title) {
      inputError.title = "Cannot submit without title";
    }
    if (!imageDetails.description) {
      inputError.description = "Cannot submit without description";
    } else if (imageDetails.description.length > 50) {
      inputError.description = "Description cannot be more than 50 characters";
    }

    if (Object.keys(inputError).length > 0) {
      setFormError(inputError);
      return;
    }

    setSubmitting(true);
    saveDetails();
  };

  const saveDetails = async () => {
    try {
      const isSuccessful = await axios.put(
        `http://localhost:5085/api/images/${id}`,
        {
          title: imageDetails.title,
          description: imageDetails.description,
        }
      );

      if (isSuccessful) {
        // Close the modal
        closeModal();
        // Trigger the popup
        triggerPopup();
      } // Trigger the popup on the ImageDetails page
    } catch (error) {
      console.error("An error occurred while saving the image details", error);
      setFormError({
        apiError: "Failed to save image details. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={ModalStyles.modalContainer}>
      <div className={ModalStyles.modal}>
        <form className={ModalStyles.form} onSubmit={validateFormInput}>
          <h1 className={ModalStyles.title}>Image Details Update</h1>
          <button
            type="button"
            className={ModalStyles.closeButton}
            onClick={closeModal}
          >
            <MdClose />
          </button>
          <div className={ModalStyles.formGroup}>
            <label>Image Title</label>
            <input
              name="title"
              value={imageDetails.title}
              disabled={submitting}
              onChange={({ target }) =>
                handleImageData(target.name, target.value)
              }
            />
          </div>
          <p className={ModalStyles.errorMessage}>{formError.title}</p>
          <div className={ModalStyles.formGroup}>
            <label>Image Description</label>
            <textarea
              name="description"
              value={imageDetails.description}
              disabled={submitting}
              onChange={({ target }) =>
                handleImageData(target.name, target.value)
              }
            />
          </div>
          <p className={ModalStyles.errorMessage}>{formError.description}</p>
          <button
            type="submit"
            className={ModalStyles.saveButton}
            disabled={submitting}
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
