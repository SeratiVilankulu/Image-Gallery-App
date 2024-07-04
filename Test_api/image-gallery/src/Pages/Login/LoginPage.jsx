import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const LoginPage = () => {
  // State to store form input values
  const [userInput, setUserInput] = useState({
    UserName: "",
    Password: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); // State to display error message if credentials are not vaild
  const [successMsg, setSuccessMsg] = useState(""); // State to display a success message after successful registration
  const [Submitting, setSubmitting] = useState(false); // State to manage the form submission status (to prevent multiple submissions)
  const navigate = useNavigate(); //Used to navigate to another page

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
    setErrorMsg("");
    setSuccessMsg("");

    //Form is being submmited
    setSubmitting(true);

    try {
      // Make an API call to register the user
      await axios.post("http://localhost:5085/api/account/login", {
        UserName: userInput.UserName,
        Password: userInput.Password,
      });
      setSuccessMsg("Successfully Logged in!");
      setTimeout(() => navigate("/home"), 1500); //redirect to login page once successful
    } catch (error) {
      seterrorMsg({ api: "Login failed. Please try again." }); //If registraction fails
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
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter Username"
              value={userInput.UserName}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="UserName"
              disabled={Submitting}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              value={userInput.Password}
              onChange={({ target }) =>
                handleUserInput(target.name, target.value)
              }
              name="Password"
              disabled={Submitting}
            />
            <IoMdLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/reset-password">Forgot password?</Link>
          </div>

          <p className="error-message">{errorMsg}</p>
          <p className="success-message">{successMsg}</p>

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
