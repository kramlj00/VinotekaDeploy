import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";

import "./style.css";

function SignIn() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const signUpButton = () => {
    setIsContainerActive(false);
  };
  const signInButton = () => {
    setIsContainerActive(true);
  };

  const showSignUpContainer = () => {
    setIsRegister(true);
  };

  const sendDataToSignIn = () => {
    setIsRegister(false);
  };

  return (
    <div
      className={`container${isContainerActive ? " right-panel-active" : ""}`}
      id="container"
    >
      <div
        className={`form-container sign-up-container${
          isRegister ? " sign-up-container-active" : " sign-up-container-hide"
        }`}
      >
        <SignUp />
      </div>
      <div
        className={`form-container sign-in-container${
          isRegister ? " sign-in-container-hide" : " sign-in-container-active"
        }`}
      >
        <form className="form-wrapper" action="#">
          <h1 className="title">Prijavi se</h1>
          <input className="inp" type="email" placeholder="Email" />
          <input className="inp" type="password" placeholder="Lozinka" />
          <button className="btn">Prijavi se</button>
          <div className="no-account-container">
            <p className="paragraph">Nemate račun?</p>
            <button className="btn sign-up" onClick={showSignUpContainer}>
              Registrirajte se
            </button>
          </div>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="title">Dobrodošli natrag!</h1>
            <p className="paragraph">Prijavite se kako biste ostali povezani</p>
            <button className="ghost btn" id="signIn" onClick={signUpButton}>
              Prijava
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="title">Pozdrav!</h1>
            <p className="paragraph">
              Unesite svoje podatke kako biste započeli svoje putovanje s nama
            </p>
            <button className="ghost btn" id="signUp" onClick={signInButton}>
              Registracija
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
