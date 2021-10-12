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

  return (
    <div
      id="container"
      className={`container${isContainerActive ? " right-panel-active" : ""}`}
    >
      <div class="form-container sign-up-container">
        <form class="form" action="#">
          <h1 class="title">Napravi račun</h1>
          <input class="inp" type="text" placeholder="Ime" />
          <input class="inp" type="email" placeholder="Email" />
          <input class="inp" type="password" placeholder="Lozinka" />
          <button class="btn">Registracija</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form class="form" action="#">
          <h1 class="title">Prijavi se</h1>
          <input class="inp" type="email" placeholder="Email" />
          <input class="inp" type="password" placeholder="Lozinka" />
          <a class="tag" href="#">
            Zaboravili ste lozinku?
          </a>
          <button class="btn">Prijava</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="title">Dobrodošli natrag!</h1>
            <p>Prijavite se kako biste ostali povezani</p>
            <button class="ghost btn" id="signIn" onClick={signUpButton}>
              Prijava
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="title">Pozdrav!</h1>
            <p>
              Unesite svoje podatke kako biste započeli svoje putovanje s nama
            </p>
            <button class="ghost btn" id="signUp" onClick={signInButton}>
              Registracija
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
