import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import { Input } from "../global/global";
import { SelectBtn } from "../global/buttons/SelectButton";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import SignUp from "../SignUp/SignUp";
import styled from "styled-components";

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
    if (email && password) {
      dispatch(signin(email, password));
    }
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
        <SignUp props={props} />
      </div>
      <div
        className={`form-container sign-in-container${
          isRegister ? " sign-in-container-hide" : " sign-in-container-active"
        }`}
      >
        <FormWrapper className="form-wrapper">
          <Title>Prijavi se</Title>
          {loading && <LoadingBox />}
          {!isWriting && error && (
            <MessageBox variant="danger">{error}</MessageBox>
          )}
          <Input
            required
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsWriting(true);
            }}
          />
          <Input
            required
            type="password"
            placeholder="Lozinka"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsWriting(true);
            }}
          />
          <SelectBtn hasMarginTop onClick={submitHandler}>
            Prijavi se
          </SelectBtn>
          <div className="no-account-container">
            <Paragraph>Nemate račun?</Paragraph>
            <SelectBtn
              color="#bc8034"
              className="btn sign-up"
              onClick={showSignUpContainer}
            >
              Registrirajte se
            </SelectBtn>
          </div>
        </FormWrapper>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <Title>Dobro došli natrag!</Title>
            <Paragraph>Prijavite se kako biste ostali povezani</Paragraph>
            <SelectBtn ghost onClick={signUpButton}>
              Prijava
            </SelectBtn>
          </div>
          <div className="overlay-panel overlay-right">
            <Title>Pozdrav!</Title>
            <Paragraph>
              Unesite svoje podatke kako biste započeli svoje putovanje s nama
            </Paragraph>
            <SelectBtn ghost smallScreen onClick={signInButton}>
              Registracija
            </SelectBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Paragraph = styled.p`
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
  `}
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};
  `}
`;
