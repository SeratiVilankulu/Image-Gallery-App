import React from "react";
import PasswordStyle from "./Password.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(""); // State to hold the new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to hold the confirmed password
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success message
  const navigate = useNavigate(); // Navigation
  const location = useLocation(); // Hook from react-router-dom to get current location

  // Validation for password
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
    // Check if all requirements are met
    const isValid = Object.values(passwordRequirements).every(Boolean);
    return { isValid, validationMessage };
  };

  // Handles form submission and validate input
  const validateInput = async (event) => {
    event.preventDefault();
    setError({});
    setSuccess("");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <div className={PasswordStyle.passwordContainer}>
      <div className={PasswordStyle.passwordFormContainer}>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className={PasswordStyle.resetInput}>
            <p>Password</p>
            <input type="text" placeholder="Enter password" required />
          </div>
          <div className={PasswordStyle.resetInput}>
            <p>Confirm Password</p>
            <input type="text" placeholder="Enter password" required />
          </div>
        </form>

        <p className={PasswordStyle.errorMessage}>{error.UserName}</p>
        <p className={PasswordStyle.successMessage}>{success}</p>

        <input
          type="submit"
          className={PasswordStyle.resetBtn}
          value="Reset Password"
        ></input>
      </div>

      <div className={PasswordStyle.registerImage}>
        <img src="/images/Image.jpg" alt="Work station" />
      </div>
    </div>
  );
};

export default ResetPassword;
