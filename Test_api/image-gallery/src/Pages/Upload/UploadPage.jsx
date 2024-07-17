import React, { useState } from "react";
import axios from "axios";
import UploadPageStyle from "./UploadPage.module.css";
import PageStyle from "../Home/HomePage.module.css";
import { GoHome } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { VscDeviceCamera } from "react-icons/vsc";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  // State to manage the selected file
  const [file, setFile] = useState(null);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        // Clear local storage or any other client-side storage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    }
  };

  // Function to handle file drop event
  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default behavior (prevent file from being opened)
    const files = event.dataTransfer.files; // Get the dropped files
    if (files && files.length > 0) {
      setFile(files[0]); // Set the first dropped file to state
    }
  };

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
  };

  // Function to handle file input change event
  const handleFileChange = (event) => {
    const files = event.target.files; // Get the selected files
    if (files && files.length > 0) {
      setFile(files[0]); // Set the first selected file to state
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData(); // Create a FormData object
    formData.append("file", file); // Append the file to the FormData object

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("File uploaded successfully.");
        setFile(null); // Reset the file state
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file", error);
    }
  };

  return (
    <div className={PageStyle.container}>
      <div className={PageStyle.menu}>
        <div className={PageStyle.logo}>Logo</div>
        <div className={PageStyle.sideNav}>
          <button className={PageStyle.btn}>
            <GoHome className={PageStyle.navIcons} />
            Home
          </button>
          <button className={PageStyle.btn}>
            <VscDeviceCamera className={PageStyle.navIcons} /> Image Upload
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
        <div className={UploadPageStyle.uploadWrapper}>
          <h1 className={UploadPageStyle.heading}>Image Upload</h1>
          <form onSubmit={handleSubmit}>
            <div className={UploadPageStyle.inputBox}>
              <p className={UploadPageStyle.name}>Image Title</p>
              <input type="text" className={UploadPageStyle.title} />
            </div>
            <div className={UploadPageStyle.inputBox}>
              <p className={UploadPageStyle.name}>Image Description</p>
              <input type="text" className={UploadPageStyle.description} />
            </div>

            <div className={UploadPageStyle.inputBox}>
              <div
                className={UploadPageStyle.dragArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className={UploadPageStyle.drag}>Drag and Drop files here</p>
                <p className={UploadPageStyle.option}>or</p>
                <input
                  type="file"
                  className={UploadPageStyle.imageUpload}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button type="submit" className={UploadPageStyle.uploadBtn}>
                  Upload
                </button>
              </div>
              {file && (
                <p>Selected file: {file.name}</p> // Display the name of the selected file
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
