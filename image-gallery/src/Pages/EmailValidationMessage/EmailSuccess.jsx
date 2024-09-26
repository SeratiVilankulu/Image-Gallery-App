import React, { useEffect } from "react";
import PageStyle from "./EmailConfirm.module.css";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const EmailSuccess = ({ redirectUrl }) => {
  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [redirectUrl]);

  return (
    <div className={PageStyle.confirmContainer}>
      <div className={PageStyle.heading}>
        <h1>
          Email Confirmation was a Success{" "}
          <MdVerified className={PageStyle.icon} />
        </h1>
      </div>
      <div className={PageStyle.sentence}>
        {" "}
        <p className={PageStyle.sentence}>
          Please wait a moment to be directed to the login page. <br />
          If you are not directed immediately, please click this link:{" "}
          <Link to="/" className={PageStyle.link}>
            Go back to Login Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailSuccess;
