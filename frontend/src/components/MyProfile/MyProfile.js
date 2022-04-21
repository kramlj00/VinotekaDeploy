import React, { useState } from "react";
import styled from "styled-components";
import { Input, SelectBtn } from "../global/global";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/userActions";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

function MyProfile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const errorMessage = "* Pogrešan unos!";

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error, loading } = userUpdateProfile;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Lozinka i potvrđena lozinka se ne podudaraju!");
    } else {
      if (password.length > 7) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(
          updateUserProfile({ userId: userInfo.id, name, email, password })
        );
      }
    }
  };

  const handleNameChange = (value) => {
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value))
      setName(value);
    value.length < 3 ? setIsNameValid(false) : setIsNameValid(true);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    value.length >= 8 ? setIsPasswordValid(true) : setIsPasswordValid(false);
  };

  return (
    <ContentContainer>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {success && (
        <MessageBox variant="info">Profil uspješno ažuriran!</MessageBox>
      )}
      <Form onSubmit={submitHandler}>
        <Title>Korisnički račun:</Title>
        <InputWrapper>
          <Input
            className="inp"
            type="text"
            value={name}
            placeholder="Ime i prezime"
            onChange={(e) => {
              handleNameChange(e.target.value);
            }}
          />
          <ErrorMessage
            visibility={name && name.length < 3 ? "visible" : "hidden"}
          >
            {errorMessage}
          </ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              handleEmailChange(e.target.value);
            }}
          />
          <ErrorMessage
            visibility={!isEmailValid && email ? "visible" : "hidden"}
          >
            {errorMessage}
          </ErrorMessage>
        </InputWrapper>
        <InputWrapper
          visibility={!isEmailValid && email ? "visible" : "hidden"}
        >
          <Input
            type="password"
            placeholder="Nova lozinka"
            onChange={(e) => {
              handlePasswordChange(e.target.value);
            }}
          />
          <ErrorMessage
            visibility={!isPasswordValid && password ? "visible" : "hidden"}
          >
            * Lozinka mora imati barem 8 znakova!
          </ErrorMessage>
        </InputWrapper>
        <Input
          type="password"
          placeholder="Potvrdite novu lozinku"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <BtnContainer>
          <SelectBtn hasMarginTop>Spremi promjene</SelectBtn>
        </BtnContainer>
      </Form>
    </ContentContainer>
  );
}

export default MyProfile;

const ContentContainer = styled.div`
  min-height: 100vh;
  margin: 2rem;
  margin-top: 70px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
  `}
`;

const Title = styled.h1`
  padding-bottom: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarge};
    }
  `}
`;

const Form = styled.form`
  width: 50%;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 70%;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
    } 
  `}
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => `
    margin-left: ${props.hasMarginLeft ? "10px" : "0px"};
  `}
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;
