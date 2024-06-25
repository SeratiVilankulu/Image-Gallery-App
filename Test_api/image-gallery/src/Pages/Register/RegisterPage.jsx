import React from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Register Profile</h1>
        <p className="welcome">
          Welcome to the registration page. Please enter your details below.
        </p>
        <form action="">
          <div className="register-form">
            <p>Full Name</p>
            <input type="text" placeholder="Enter Name" required />
          </div>
          <div className="register-form">
            <p>Email Adress</p>
            <input type="text" placeholder="Enter Email" required />
          </div>
          <div className="register-form">
            <p>Password</p>
            <input type="text" placeholder="Enter Password" required />
          </div>
          <div className="register-form">
            <p>Confirm Password</p>
            <input type="text" placeholder="Enter Password" required />
          </div>
        </form>
        <button type="submit" className="register-btn">
          Register
        </button>

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
