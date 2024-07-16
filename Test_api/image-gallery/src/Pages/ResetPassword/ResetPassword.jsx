import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordStyle from "./Password.module.css";

const ResetPassword = () => {
  // State to store form input values
  const [userInput, setUserInput] = useState({
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success message
  const [Submitting, setSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)
  const navigate = useNavigate(); // Navigation
  const location = useLocation(); // Gets the current location

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // Token received from the reset link
  const email = queryParams.get("email"); // Email received from the reset link

  // Function to handle changes in form input fields
  const handleUserPassword = (name, value) => {
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // Validation for password
  const validatePassword = (password) => {
    const passwordRequirements = {
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    let validationMessage = "";
    if (!passwordRequirements.length) {
      validationMessage = "Password must be at least 8 characters long.";
    } else if (!passwordRequirements.upperCase) {
      validationMessage =
        "Password must include at least one uppercase letter.";
    } else if (!passwordRequirements.lowerCase) {
      validationMessage =
        "Password must include at least one lowercase letter.";
    } else if (!passwordRequirements.digit) {
      validationMessage = "Password must include at least one digit.";
    } else if (!passwordRequirements.specialChar) {
      validationMessage =
        "Password must include at least one special character.";
    }
    // Check if all requirements are met
    const isValid = Object.values(passwordRequirements).every(Boolean);
    return { isValid, validationMessage };
  };

  // Handles form submission and validate input
  const validateInput = async (event) => {
    event.preventDefault();
    setError({});
    setSuccess("");

    //Check if password is empty or valid
    let inputError = {};
    if (!userInput.NewPassword) {
      inputError.NewPassword = "Field should not be empty";
    } else {
      const { isValid, validationMessage } = validatePassword(
        userInput.NewPassword
      );
      if (!isValid) {
        inputError.NewPassword = validationMessage;
      }
    }
    if (!userInput.ConfirmPassword) {
      inputError.ConfirmPassword = "Field should not be empty";
    }
    // Check if passwords match
    if (userInput.NewPassword !== userInput.ConfirmPassword) {
      inputError.ConfirmPassword = "Passwords do not match";
    }

    // If there are any errors, set the error messages and prevent form submission
    if (Object.keys(inputError).length > 0) {
      setError(inputError);
      return;
    }

    //Form is being submmited
    setSubmitting(true);

    try {
      //Make API call to reset the users password
      await axios.post("http://localhost:5085/api/account/resetpassword", {
        token,
        email,
        NewPassword: userInput.NewPassword,
        ConfirmPassword: userInput.ConfirmPassword,
      });
      setSuccess("Password changed successfully!");
      setTimeout(() => navigate("/"), 1500); //redirect to login page once successful
    } catch (error) {
      setError({ api: "Failed to reset password. Please try again." }); //If registraction fails
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={PasswordStyle.passwordContainer}>
      <div className={PasswordStyle.passwordFormContainer}>
        <h1>Reset Password</h1>
        <form onSubmit={validateInput}>
          <div className={PasswordStyle.resetInput}>
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password"
              disabled={Submitting}
              value={userInput.NewPassword}
              name="NewPassword"
              onChange={({ target }) =>
                handleUserPassword(target.name, target.value)
              }
            />
          </div>

          <p className={PasswordStyle.errorMessage}>{error.NewPassword}</p>

          <div className={PasswordStyle.resetInput}>
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Enter password"
              disabled={Submitting}
              value={userInput.ConfirmPassword}
              name="ConfirmPassword"
              onChange={({ target }) =>
                handleUserPassword(target.name, target.value)
              }
            />
          </div>
          <p className={PasswordStyle.errorMessage}>{error.ConfirmPassword}</p>

          <p className={PasswordStyle.errorMessage}>{error.api}</p>
          <p className={PasswordStyle.successMessage}>{success}</p>

          <input
            type="submit"
            className={PasswordStyle.resetBtn}
            value="Reset Password"
            disabled={Submitting}
          ></input>
        </form>
      </div>

      <div className={PasswordStyle.registerImage}>
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default ResetPassword;
