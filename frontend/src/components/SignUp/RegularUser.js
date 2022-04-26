import React, { useState, useEffect } from "react";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer, Input, SelectBtn } from "../global/global";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { regularRegister } from "../../actions/userActions";
import styled, { keyframes } from "styled-components";

function RegularUser({ setIsBackPressed, props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSamePassword, setIsSamePassword] = useState(true);

  const errorMessage = "* Pogrešan unos!";

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsBackPressed(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsSamePassword(false);
      // alert("Lozinka i potvrđena lozinka se ne podudaraju!");
    } else if (isNameValid && isEmailValid && isPasswordValid) {
      setIsSamePassword(true);
      dispatch(regularRegister(name, email, password));
    }
    setIsWriting(false);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const handleNameChange = (value) => {
    setIsWriting(true);
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value))
      setName(value);
    value.length < 3 ? setIsNameValid(false) : setIsNameValid(true);
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
    <>
      <Form onSubmit={submitHandler}>
        {!isSamePassword && !isWriting && (
          <MessageBox variant="danger">Lozinke se ne podudaraju</MessageBox>
        )}
        {loading && <LoadingBox />}
        {!isWriting && error && (
          <MessageBox variant="danger">{error}</MessageBox>
        )}
        <InputWrapper>
          <Input
            className="inp"
            type="text"
            value={name}
            placeholder="Ime i prezime"
            required
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
            placeholder="Email"
            required
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
            placeholder="Lozinka"
            required
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
          placeholder="Potvrdite lozinku"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setIsWriting(true);
          }}
        />
        <SelectBtn hasMarginTop>Registracija</SelectBtn>
      </Form>
      <BackIconContainer onClick={handleClick} display="flex">
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
    </>
  );
}

export default RegularUser;

const fadeAnimation = keyframes`
0% {  
  display: none;
  opacity: 0; }
50% { 
  display: block;
  opacity: 0; }
100% {  
  display: block;
  opacity: 1; }
`;

const Form = styled.form`
  width: -webkit-fill-available;

  animation-name: ${fadeAnimation};
  animation-duration: 1s;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => `
    margin-left: ${props.hasMarginLeft ? "10px" : "0px"};
  `}
`;
