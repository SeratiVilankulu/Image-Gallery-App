import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  //Define state variables for form input and errors
  const [formInput, setFormInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  //Handle user input changes for form fields
  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const validateFormInput = (event) => {
    event.preventDefault();

    //Initialize an object to track input errors
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    //Check if email and password are empty
    if (!formInput.email && !formInput.password && !formInput.fullName) {
      setFormError({
        ...inputError,
        fullName: "Please enter your name",
        email: "Enter a valid email address",
        password: "Password should not be empty",
      });
      return;
    }

    //Check if name is empty
    if (!formInput.fullName) {
      setFormError({
        ...inputError,
        fullName: "Please enter your name",
      });
      return;
    }

    //Check if email is empty
    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Enter a valid email address",
      });
      return;
    }

    //Check if password is empty
    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return;
    }

    //Check if password and confirm password match
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password does not match",
      });
      return;
    }

    //Clear any previous error message and show success message
    setFormError(inputError);
    setFormInput((prevState) => ({
      ...prevState,
      successMsg: "Successfully registered!",
    }));

    // Redirect to the login page after successfully registered
    setTimeout(() => {
      navigate("/");
    }, 1000); // Adjust the delay as needed
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
            {/*Name input*/}
            <p>Full Name</p>
            <input
              value={formInput.fullName}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="fullName"
              type="text"
              placeholder="Enter Name"
            />
          </div>

          <p className="error-message">{formError.fullName}</p>

          <div className="register-form">
            {/*Email input*/}
            <p>Email Adress</p>
            <input
              value={formInput.email}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="email"
              type="text"
              placeholder="Enter Email"
            />
          </div>

          <p className="error-message">{formError.email}</p>

          <div className="register-form">
            {/*Password input*/}
            <p>Password</p>
            <input
              value={formInput.password}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <p className="error-message">{formError.password}</p>

          <div className="register-form">
            {/*Confirm Password input*/}
            <p>Confirm Password</p>
            <input
              value={formInput.confirmPassword}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="confirmPassword"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <p className="error-message">{formError.confirmPassword}</p>
          <p className="success-message">{formInput.successMsg}</p>

          <input
            type="submit"
            className="register-btn"
            value="Register"
          ></input>
        </form>

        <div className="separator">
          <p>or</p>
        </div>

        <button type="submit" className="option">
          <FcGoogle />
          <Link to="/google-signin" className="signin-btn">
            Sign in with Google
          </Link>
        </button>

        <button type="submit" className="option">
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
