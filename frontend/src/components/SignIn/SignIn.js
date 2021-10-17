import React, { useState } from "react";

import "./style.css";

function SignIn() {
  const [isContainerActive, setIsContainerActive] = useState(false);

  const signUpButton = () => {
    setIsContainerActive(false);
    console.log(isContainerActive);
  };
  const signInButton = () => {
    setIsContainerActive(true);
    console.log(isContainerActive);
  };

  const signUpHandler = () => {
    const signUpContainer = document.querySelector(".sign-up-container");
    signUpContainer.classList.add("sign-up-open");
    const signInContainer = document.querySelector(".sign-in-container");
    signInContainer.classList.add("sign-in-closed");
  };

  const backToSignIn = () => {
    const signUpContainer = document.querySelector(".sign-up-container");
    signUpContainer.classList.remove("sign-up-open");
    const signInContainer = document.querySelector(".sign-in-container");
    signInContainer.classList.remove("sign-in-closed");
  };

  return (
    <div
      id="container"
      className={`container${isContainerActive ? " right-panel-active" : ""}`}
    >
      <div className="form-container sign-up-container">
        <form className="form">
          <h1 className="title">Napravi račun</h1>
          <input className="inp" type="text" placeholder="Ime" />
          <input className="inp" type="email" placeholder="Email" />
          <input className="inp" type="password" placeholder="Lozinka" />
          <button className="btn">Registracija</button>
          <a className="tag" onClick={backToSignIn}>
            Povratak na prijavu
          </a>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="form">
          <h1 className="title">Prijavi se</h1>
          <input className="inp" type="email" placeholder="Email" />
          <input className="inp" type="password" placeholder="Lozinka" />
          <button className="btn">Prijava</button>
          <div className="no-account">
            <p className="paragraph">Nemate račun?</p>
            <button className="btn sign-up" onClick={signUpHandler}>
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
