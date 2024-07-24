import React, { useState } from "react";
import axios from "axios";
import PasswordStyle from "./Password.module.css";

const ForgotPassword = () => {
  // State to store users input values
  const [userEmail, setUserEmail] = useState({
    Email: "",
  });

  const [formError, setFormError] = useState({}); // State to store error messages for form validation
  const [successMsg, setSuccessMsg] = useState(""); // State to display a success message after successful registration
  const [Submitting, setSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)

  // Function to handle changes in form input fields
  const handleUserEmail = (name, value) => {
    setUserEmail({
      ...userEmail,
      [name]: value,
    });
  };

  // Handles form submission and validate input
  const validateFormInput = async (event) => {
    event.preventDefault();
    setFormError({});
    setSuccessMsg("");

    //Check if email is empty
    let inputError = {};
    if (!userEmail.Email) {
      inputError.Email = "Email address cannot be empty";
    }

    // If there are any errors, set the error messages and prevent form submission
    if (Object.keys(inputError).length > 0) {
      setFormError(inputError);
      return;
    }

    //Form is being submmited
    setSubmitting(true);

    try {
      // Make an API call to send the user an email to reset password
      await axios.post("http://localhost:5085/api/account/forgotpassword", {
        Email: userEmail.Email,
      });
      setSuccessMsg("Please check your emails for a link to reset password!");
    } catch (error) {
      setFormError({ api: "Failed to send email. Please try again." }); //If registraction fails
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={PasswordStyle.passwordContainer}>
      <div className={PasswordStyle.passwordFormContainer}>
        <h1>Recovery Password</h1>
        <form onSubmit={validateFormInput}>
          <div className={PasswordStyle.resetInput}>
            <p>Email Address</p>
            <input
              type="text"
              placeholder="Enter Email"
              value={userEmail.Email}
              name="Email"
              onChange={({ target }) =>
                handleUserEmail(target.name, target.value)
              }
            />
          </div>

          <p className={PasswordStyle.errorMessage}>{formError.Email}</p>

          <p className={PasswordStyle.errorMessage}>{formError.api}</p>
          <p className={PasswordStyle.successMessage}>{successMsg}</p>

          <input
            type="submit"
            className={PasswordStyle.forgotBtn}
            value="Submit Email"
            disabled={Submitting}
          ></input>
        </form>
      </div>

      <div className={PasswordStyle.forgotImage}>
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default ForgotPassword;
