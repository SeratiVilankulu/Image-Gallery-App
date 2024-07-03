import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./RegisterPage.css";

const RegisterPage = () => {
  // State to store form input values
  const [formInput, setFormInput] = useState({
    UserName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({}); // State to store error messages for form validation
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)
  const [successMsg, setSuccessMsg] = useState(""); // State to display a success message after successful registration
  const navigate = useNavigate(); //Used to navigate to another page

  // Function to handle changes in form input fields
  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
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
  const validateFormInput = async (event) => {
    event.preventDefault();
    setFormError({});
    setSuccessMsg("");

    //Check if username is empty
    let inputError = {};
    if (!formInput.UserName) {
      inputError.UserName = "Please enter your name";
    }
    //Check if email is empty
    if (!formInput.Email) {
      inputError.Email = "Enter a valid Email address";
    }
    //Check if password is empty or valid
    if (!formInput.Password) {
      inputError.Password = "Password should not be empty";
    } else {
      const { isValid, validationMessage } = validatePassword(
        formInput.Password
      );
      if (!isValid) {
        inputError.Password = validationMessage;
      }
    }
    // Checks if Password and confirmPassword fields match
    if (formInput.confirmPassword !== formInput.Password) {
      inputError.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(inputError).length > 0) {
      setFormError(inputError);
      return;
    }

    //Form is being submmited
    setIsSubmitting(true);

    try {
      // Make an API call to register the user
      await axios.post("http://localhost:5085/api/account/register", {
        UserName: formInput.UserName,
        Email: formInput.Email,
        Password: formInput.Password,
      });
      setSuccessMsg("Successfully registered!");
      setTimeout(() => navigate("/"), 1000); //redirect to login page once successful
    } catch (error) {
      setFormError({ api: "Registration failed. Please try again." }); //If registraction fails
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Register Profile</h1>
        <p className="welcome">
          Welcome to the registration page. Please enter your details below.
        </p>
        <form onSubmit={validateFormInput}>
          <div className="register-form">
            <p>Full Name</p>
            <input
              value={formInput.UserName}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="UserName"
              type="text"
              placeholder="Enter Name"
              disabled={isSubmitting}
            />
          </div>
          <p className="error-message">{formError.UserName}</p>

          <div className="register-form">
            <p>Email Address</p>
            <input
              value={formInput.Email}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="Email"
              type="email"
              placeholder="Enter Email"
              disabled={isSubmitting}
            />
          </div>
          <p className="error-message">{formError.Email}</p>

          <div className="register-form">
            <p>Password</p>
            <input
              value={formInput.Password}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="Password"
              type="password"
              placeholder="Enter Password"
              disabled={isSubmitting}
            />
          </div>
          <p className="error-message">{formError.Password}</p>

          <div className="register-form">
            <p>Confirm Password</p>
            <input
              value={formInput.confirmPassword}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="confirmPassword"
              type="password"
              placeholder="Enter Password"
              disabled={isSubmitting}
            />
          </div>
          <p className="error-message">{formError.confirmPassword}</p>

          <p className="error-message">{formError.api}</p>
          <p className="success-message">{successMsg}</p>

          <input
            type="submit"
            className="register-btn"
            value="Register"
            disabled={isSubmitting}
          />
        </form>

        <div className="separator">
          <p>or</p>
        </div>

        <button type="button" className="option" disabled={isSubmitting}>
          <FcGoogle />
          <Link to="/google-signin" className="signin-btn">
            Sign in with Google
          </Link>
        </button>

        <button type="button" className="option" disabled={isSubmitting}>
          <FaFacebook />
          <Link to="/facebook-signin" className="signin-btn">
            Sign in with Facebook
          </Link>
        </button>
      </div>
      <div className="register-image">
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default RegisterPage;
