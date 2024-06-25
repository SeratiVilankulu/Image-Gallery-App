import React from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  return (
    <div className="reset-container">
      <div className="restform-container">
        <h1>Reset Password</h1>
        <form action="">
          <div className="reset-input">
            <p>Email Address</p>
            <input type="text" placeholder="Enter Email" required />
          </div>
          <div className="reset-input">
            <p>Password</p>
            <input type="text" placeholder="Enter password" required />
          </div>
          <div className="reset-input">
            <p>Confirm Password</p>
            <input type="text" placeholder="Enter password" required />
          </div>
        </form>

        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </div>

      <div className="image">
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default ResetPassword;
