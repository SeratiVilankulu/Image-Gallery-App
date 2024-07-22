import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const LoginPage = () => {
  // State to store form input values
  const [userInput, setUserInput] = useState({
    UserName: "",
    Password: "",
  });

  const [errorMsg, setErrorMsg] = useState({}); // State to display error message if credentials are not vaild
  const [successMsg, setSuccessMsg] = useState(""); // State to display a success message after successful registration
  const [Submitting, setSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)
  const navigate = useNavigate(); // Used to navigate to another page

  // Function to handle changes in form input fields
  const handleUserInput = (name, value) => {
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // Handles form submission and validate input
  const validateFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg({});
    setSuccessMsg("");

    //Check if username is empty
    let inputError = {};
    if (!userInput.UserName) {
      inputError.UserName = "Username can not be empty";
    }
    //Check if password is empty
    if (!userInput.Password) {
      inputError.Password = "Password can not be empty";
    }

    // If there are any errors, set the error messages and prevent form submission
    if (Object.keys(inputError).length > 0) {
      setErrorMsg(inputError);
      return;
    }

    //Form is being submmited
    setSubmitting(true);

    try {
      // Make an API call to register the user
      await axios.post("http://localhost:5085/api/account/login", {
        UserName: userInput.UserName,
        Password: userInput.Password,
      });

      // Assuming a successful login
      setSuccessMsg("Credentials Valid!");
      setTimeout(() => navigate("/home"), 1500); //redirect to home page once successful
    } catch (error) {
      console.log(error);

      // If the server responds with a specific error code
      if (error.response) {
        if (error.response.status === 401) {
          // 401 Unauthorized means invalid credentials
          if (error.response.data.message) {
            setErrorMsg({
              api: error.response.data.message,
            });
          } else {
            setErrorMsg({
              api: error.response.data,
            });
          }
        } else if (error.response.status === 400) {
          // Assuming the backend sends a specific message for unverified email
          setErrorMsg({
            api:
              error.response.data ||
              "Email has not been verified. Please check email and verify account.",
          });
        } else {
          // Handle other server errors
          setErrorMsg({ api: "Login failed. Please try again." });
        }
      } else {
        // Handle errors that do not have a response (like network errors)
        setErrorMsg({ api: "An error occurred. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrappr-container">
      <div className="wrapper">
        <h1>Image Gallery App</h1>
        <h1>Login</h1>
        <form onSubmit={validateFormSubmit}>
          <div className="input-box">
            <p className="label">Username</p>
            <input
              type="text"
              placeholder="Enter Username"
              value={userInput.UserName}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="UserName"
              disabled={Submitting}
              onBlur={() =>
                setUserInput((prevState) => ({
                  ...prevState,
                  UserName: prevState.UserName.trim(), // trim whitespace on blur
                }))
              }
            />
            {!userInput.UserName && <FaUser className="icon" />}{" "}
            {/* Conditional showing of icon */}
          </div>
          <p className="error-message-login1">{errorMsg.UserName}</p>

          <div className="input-box">
            <p className="label">Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              value={userInput.Password}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="Password"
              disabled={Submitting}
              onBlur={() =>
                setUserInput((prevState) => ({
                  ...prevState,
                  Password: prevState.Password.trim(), // trim whitespace on blur
                }))
              }
            />
            {!userInput.Password && <IoMdLock className="icon" />}{" "}
            {/* Conditional showing of icon */}
          </div>
          <p className="error-message-login1">{errorMsg.Password}</p>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <p className="error-message-login">{errorMsg.api}</p>

          <p className="success-message-login">{successMsg}</p>

          <input type="submit" className="login" value="Login"></input>

          <div className="register-link">
            <p>
              New to this platform?{" "}
              <Link to="/register" className="register-page">
                Register
              </Link>{" "}
              Here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
