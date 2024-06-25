import React from "react";
import "./FacebookSignin.css";
import { FaFacebook } from "react-icons/fa";

const FacebookSignin = () => {
  return (
    <div className="Facebook-container">
      <div className="form-container">
        <h1>Sign in</h1>
        <FaFacebook />
        <p>to continue to Image Gallery</p>
        <form action="">
          <div className="signin-input">
            <p>Email Address</p>
            <input type="text" placeholder="Enter Email" required />
          </div>
          <div className="signin-input">
            <p>Password</p>
            <input type="text" placeholder="Enter password" required />
          </div>
        </form>

        <button type="submit" className="login-btn">
          Login
        </button>
      </div>

      <div className="register-image">
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default FacebookSignin;
