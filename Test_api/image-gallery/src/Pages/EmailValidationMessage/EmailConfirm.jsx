import React from "react";
import PageStyle from "./EmailConfirm.module.css";

const EmailConfirm = () => {
  return (
    <div className={PageStyle.confirmContainer}>
      <div className={PageStyle.heading}>
        <h1>Email Confirmation</h1>
      </div>
      <div className={PageStyle.sentence}></div>
      <p>
        Please go to your email, by now you should have recieved an email with a
        link to verify your email and confirming that you have registered.
      </p>
      <p>If this was not you please contact support</p>
    </div>
  );
};

export default EmailConfirm;
