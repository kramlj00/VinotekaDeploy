import React, { useState } from "react";

import styled from "./style.css";

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

  return (
    <div
      id="container"
      className={`container${isContainerActive ? " right-panel-active" : ""}`}
    >
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Napravi račun</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Registracija</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Prijavi se</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Prijava</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Dobrodošli natrag!</h1>
            <p>Prijavite se kako biste ostali povezani</p>
            <button class="ghost" id="signIn" onClick={signUpButton}>
              Prijava
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Pozdrav!</h1>
            <p>
              Unesite svoje podatke kako biste započeli svoje putovanje s nama
            </p>
            <button class="ghost" id="signUp" onClick={signInButton}>
              Registracija
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
