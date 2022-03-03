import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import SignUp from "../SignUp/SignUp";

import "./style.css";

function SignIn({ props }) {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();

  const signUpButton = () => {
    setIsContainerActive(false);
  };
  const signInButton = () => {
    setIsContainerActive(true);
  };

  const showSignUpContainer = () => {
    setIsRegister(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    setIsWriting(false);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

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
        <form className="form-wrapper" onSubmit={submitHandler}>
          <h1 className="title">Prijavi se</h1>
          {loading && <LoadingBox />}
          {!isWriting && error && (
            <MessageBox variant="danger">{error}</MessageBox>
          )}
          <input
            className="inp"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setIsWriting(true);
            }}
          />
          <input
            className="inp"
            type="password"
            placeholder="Lozinka"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setIsWriting(true);
            }}
          />
          <button className="btn" type="submit">
            Prijavi se
          </button>
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
