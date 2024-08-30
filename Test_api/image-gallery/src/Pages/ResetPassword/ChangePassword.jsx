import axios from "axios";
import React, { useState } from "react";
import PasswordStyle from "./Password.module.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [userData, setUserData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [Submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUserPassword = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

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
    const isValid = Object.values(passwordRequirements).every(Boolean);
    return { isValid, validationMessage };
  };

  const validateInputData = async (event) => {
    event.preventDefault();
    setError({});
    setSuccess("");

    let inputError = {};
    if (!userData.CurrentPassword) {
      inputError.CurrentPassword = "Current password should not be empty";
    } else {
      const { isValid, validationMessage } = validatePassword(
        userData.CurrentPassword
      );
      if (!isValid) {
        inputError.CurrentPassword = validationMessage;
      }
    }

    if (!userData.NewPassword) {
      inputError.NewPassword = "Field should not be empty";
    } else {
      const { isValid, validationMessage } = validatePassword(
        userData.NewPassword
      );
      if (!isValid) {
        inputError.NewPassword = validationMessage;
      }
    }

    if (!userData.ConfirmPassword) {
      inputError.ConfirmPassword = "Field should not be empty";
    }
    if (userData.NewPassword !== userData.ConfirmPassword) {
      inputError.ConfirmPassword = "Passwords do not match";
    }

    if (Object.keys(inputError).length > 0) {
      setError(inputError);
      return;
    }

    setSubmitting(true);

    const changePassword = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await axios.post(
          "http://localhost:5085/api/account/change-password",
          {
            currentPassword: userData.CurrentPassword,
            newPassword: userData.NewPassword,
            confirmPassword: userData.ConfirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${user.verificationToken}`,
            },
          }
        );
        console.log("Data Sent to DB:", response);
        if (response.status === 200) {
          setSuccess("Password changed successfully!");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const apiError = error.response.data;
          if (apiError === "Failed to change password: Incorrect password.") {
            setError({
              api: "Failed to change password: Incorrect current password.",
            });
          } else if (
            apiError ===
            "The new password cannot be the same as the current password."
          ) {
            setError({
              api: "The new password cannot be the same as the old password.",
            });
          } else {
            setError({ api: `Failed to reset password.` });
          }
        } else {
          setError({ api: "Failed to change password, please try again" });
        }
      } finally {
        setSubmitting(false);
      }
    };

    await changePassword(userData.CurrentPassword, userData.NewPassword);
  };

  return (
    <div className={PasswordStyle.passwordContainer}>
      <div className={PasswordStyle.passwordFormContainer}>
        <h1>Change Password</h1>
        <form onSubmit={validateInputData}>
          <div className={PasswordStyle.resetInput}>
            <p>Current Password</p>
            <input
              type="password"
              placeholder="Enter current password"
              disabled={Submitting}
              value={userData.CurrentPassword}
              name="CurrentPassword"
              onChange={({ target }) =>
                handleUserPassword(target.name, target.value)
              }
            />
          </div>
          <p className={PasswordStyle.errorMessage}>{error.CurrentPassword}</p>

          <div className={PasswordStyle.resetInput}>
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter new password"
              disabled={Submitting}
              value={userData.NewPassword}
              name="NewPassword"
              onChange={({ target }) =>
                handleUserPassword(target.name, target.value)
              }
            />
          </div>
          <p className={PasswordStyle.errorMessage}>{error.NewPassword}</p>

          <div className={PasswordStyle.resetInput}>
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Enter new password confirmation"
              disabled={Submitting}
              value={userData.ConfirmPassword}
              name="ConfirmPassword"
              onChange={({ target }) =>
                handleUserPassword(target.name, target.value)
              }
            />
          </div>
          <p className={PasswordStyle.errorMessage}>{error.ConfirmPassword}</p>
          <p className={PasswordStyle.errorMessage}>{error.api}</p>
          <p className={PasswordStyle.successMessage}>{success}</p>

          <input
            type="submit"
            className={PasswordStyle.resetBtn}
            value="Change Password"
            disabled={Submitting}
          />
        </form>
        <button
          className={PasswordStyle.homeBtn}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>

      <div className={PasswordStyle.registerImage}>
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default ChangePassword;
