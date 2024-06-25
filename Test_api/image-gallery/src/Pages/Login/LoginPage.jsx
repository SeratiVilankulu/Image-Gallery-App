import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const LoginPage = () => {
  const handleHome = () => {
    console.log("clicked");
  };

  return (
    <div className="wrapper">
      <h1>Image Gallery App</h1>
      <h1>Login</h1>
      <form action="">
        <div className="input-box">
          <p>Username</p>
          <input type="text" placeholder="Enter Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <p>Password</p>
          <input type="password" placeholder="Enter Password" required />
          <IoMdLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label htmlFor="">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/reset-password">Forgot password?</Link>
        </div>

        <button type="submit" className="login" onClick={handleHome}>
          Login
        </button>

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
  );
};

export default LoginPage;
