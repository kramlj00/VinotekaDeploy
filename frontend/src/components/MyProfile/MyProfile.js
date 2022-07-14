import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../global/global";
import { SelectBtn } from "../global/buttons/SelectButton";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/userActions";
import LoadingBox from "../global/LoadingBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import NotificationBox from "../global/notifications/Notification";

function MyProfile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSamePassword, setIsSamePassword] = useState(true);

  const errorMessage = "* Pogrešan unos!";

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error, loading } = userUpdateProfile;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsWriting(false);

    if (password !== confirmPassword) {
      setIsSamePassword(false);
      // alert("Lozinka i potvrđena lozinka se ne podudaraju!");
    } else {
      if (password.length > 7) {
        setIsSamePassword(true);
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
    setIsWriting(true);
  };

  const handleEmailChange = (value) => {
    setIsWriting(true);

    setEmail(value);
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  const handlePasswordChange = (value) => {
    setIsWriting(true);

    setPassword(value);
    value.length >= 8 ? setIsPasswordValid(true) : setIsPasswordValid(false);
  };

  return (
    <ContentContainer>
      {!isSamePassword && !isWriting && (
        <NotificationBox variant="danger">Lozinke se ne podudaraju</NotificationBox>
      )}
      {loading && <LoadingBox />}
      {error && !isWriting && <NotificationBox variant="danger">{error}</NotificationBox>}
      {success && !isWriting && (
        <NotificationBox variant="info">Profil uspješno ažuriran!</NotificationBox>
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
            setIsWriting(true);
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
  margin: auto;
  margin-top: 70px;
  width: 50%;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 70%;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
    } 
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
  margin: auto;
  margin-top: 26px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
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
