import { Route } from "react-router-dom";

import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";
import HomePage from "./Pages/HomePage";
import GoogleSignin from "./Pages/SocialSignin/GoogleSignin";
import GoogleSignin from "./Pages/SocialSignin/FacebookSignin";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import EmailConfirm from "./Pages/EmailValidationMessage/EmailConfirm";
import EmailSuccess from "./Pages/EmailValidationMessage/EmailSuccess";
import ForgotPassword from "./Pages/ResetPassword/ForgotPassword";
import UploadPage from "./Pages/Upload/UploadPage";
import ImageDetails from "./Pages/ImageDetails";
import Logout from "./Pages/Logout/Logout";

function App() {
  return (
    <div>
      <Route path="/">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/google-signin">
        <GoogleSignin />
      </Route>
      <Route path="/facebook-signin">
        <GoogleSignin />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/email-confirm">
        <EmailConfirm />
      </Route>
      <Route path="/email-success">
        <EmailSuccess />
      </Route>
      <Route path="/upload-images">
        <UploadPage />
      </Route>
      <Route path="/image/:id">
        <ImageDetails />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </div>
  );
}

export default App;
