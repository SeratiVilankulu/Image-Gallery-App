import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadPageStyle from "./UploadPage.module.css";
import PageStyle from "../Home/HomePage.module.css";
import { GoHome } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { VscDeviceCamera } from "react-icons/vsc";
import { BsCloudUpload } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowDown, IoIosImages } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  // State to manage form inputs
  const [formInput, setFormInput] = useState({
    Title: "",
    Category: "",
    Description: "",
    ImageURL: "",
  });

  const [errorMsg, setErrorMsg] = useState({}); // State to store error messages for form validation
  const [successMsg, setSuccessMsg] = useState(""); // State to display a success message after successful registration
  const [submitting, setSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)
  const navigate = useNavigate();
  // State to manage the selected file
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]); // State to manage the categories

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5085/api/category");
        const categoryTypes = response.data.map((item) => item.categoryType);
        setCategories(categoryTypes);
      } catch (error) {
        console.log(error);
        setErrorMsg("Cannot fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // Function to handle changes in form input fields
  const handleImageInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Function to handle form submission and validate input
  const validateFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg({});
    setSuccessMsg("");

    let inputError = {};

    // Validate image title
    if (!formInput.Title) {
      inputError.Title = "Image title cannot be empty";
    }

    // Validate image category
    if (!formInput.Category) {
      inputError.Category = "Category cannot be empty";
    }

    // Validate image description
    if (!formInput.Description) {
      inputError.Description = "Description cannot be empty";
    }

    // Validate file selection
    if (!file) {
      inputError.file = "Please select a file to upload.";
    }

    // If there are validation errors, set the error messages and return early
    if (Object.keys(inputError).length > 0) {
      setErrorMsg(inputError);
      return;
    }

    setSubmitting(true);
    handleSubmit();
  };

  // Function to handle file drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle file input change event
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Title", formInput.Title);
    formData.append("Category", formInput.Category);
    formData.append("Description", formInput.Description);

    try {
      // Make an API call to post image
      const response = await axios.post(
        "http://localhost:5085/api/image/{categoryID}",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful response
      if (response.status === 200) {
        setSuccessMsg("File uploaded successfully.");
        setFile(null);
        setFormInput({
          Title: "",
          Category: "",
          Description: "",
          ImageURL: "",
        });
      } else {
        setErrorMsg({ api: "Failed to upload file" });
      }
    } catch (error) {
      setErrorMsg({ api: "An error occurred while uploading the file." });
    } finally {
      setSubmitting(false);
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
          <button className={PageStyle.btn}>
            <VscDeviceCamera className={PageStyle.navIcons} /> Image Upload
          </button>
          <button className={PageStyle.btn} onClick={() => navigate("/")}>
            <IoIosImages className={PageStyle.navIcons} />
            My Library
          </button>
          <button className={PageStyle.logout} onClick={() => navigate("/")}>
            <MdLogout className={PageStyle.navIcons} />
            Logout
          </button>
        </div>
      </div>
      <div className={PageStyle.mainPage}>
        <div className={PageStyle.topNav}>
          <button className={PageStyle.topBtn}>
            Image Upload
            <IoIosArrowForward className={PageStyle.topNavIcons} />
          </button>
          <button className={PageStyle.topBtn}>
            <CgProfile />
            seratimotla@gmail.com
            <IoIosArrowDown className={PageStyle.topNavIcons} />
          </button>
        </div>
        <div className={UploadPageStyle.uploadWrapper}>
          <h1 className={UploadPageStyle.heading}>Image Upload</h1>
          <form onSubmit={validateFormSubmit}>
            <div className={UploadPageStyle.inputBox}>
              <p className={UploadPageStyle.name}>Image Title</p>
              <input
                type="text"
                className={UploadPageStyle.title}
                value={formInput.Title}
                onChange={(e) => handleImageInput("Title", e.target.value)}
              />
              <p className={UploadPageStyle.errorMessage}>{errorMsg.Title}</p>
            </div>
            <div className={UploadPageStyle.inputBox}>
              <p className={UploadPageStyle.name}>Image Category</p>
              <select
                className={UploadPageStyle.category}
                value={formInput.Category}
                onChange={(e) => handleImageInput("Category", e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className={UploadPageStyle.errorMessage}>
                {errorMsg.Category}
              </p>
            </div>
            <div className={UploadPageStyle.inputBox}>
              <p className={UploadPageStyle.name}>Image Description</p>
              <input
                type="text"
                className={UploadPageStyle.description}
                value={formInput.Description}
                onChange={(e) =>
                  handleImageInput("Description", e.target.value)
                }
              />
              <p className={UploadPageStyle.errorMessage}>
                {errorMsg.Description}
              </p>
            </div>
            <div className={UploadPageStyle.inputBox}>
              <div
                className={UploadPageStyle.dragArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <BsCloudUpload className={UploadPageStyle.uploadIcon} />
                <p className={UploadPageStyle.drag}>Drag and Drop files here</p>
                <p className={UploadPageStyle.option}>or</p>
                <input
                  type="file"
                  className={UploadPageStyle.fileInput}
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className={UploadPageStyle.fileInputLabel}
                >
                  Upload File
                </label>
              </div>
              {file && (
                <p className={UploadPageStyle.selectedFile}>
                  Selected file: {file.name}
                </p> // Display the name of the selected file
              )}
              <p className={UploadPageStyle.errorMessage}>{errorMsg.file}</p>
              <p className={UploadPageStyle.errorMessage}>{errorMsg.api}</p>
            </div>
            <button
              type="submit"
              className={UploadPageStyle.submitBtn}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Save Upload"}
            </button>
            <p className={UploadPageStyle.successMessage}>{successMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
