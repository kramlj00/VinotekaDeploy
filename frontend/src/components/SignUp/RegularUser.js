import React, { useState, useEffect } from "react";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import {
  BackIconContainer,
  Input,
  SelectBtn,
  ErrorMessage,
} from "../global/global";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { regularRegister } from "../../actions/userActions";
import styled from "styled-components";

function RegularUser({ setIsBackPressed, props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

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
      alert("Lozinka i potvrđena lozinka se ne podudaraju!");
    } else if (isNameValid && isEmailValid && isPasswordValid) {
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
    if (/^[a-zA-Z\s]*$/.test(value)) setName(value);
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
          {name && name.length < 3 && (
            <ErrorMessage marginTop={"51px"}>
              * Ime mora imati barem 3 slova!
            </ErrorMessage>
          )}
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
          {!isEmailValid && email && (
            <ErrorMessage marginTop={"51px"}>
              * Email mora biti formata: primjer@email.com!
            </ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper marginTop={"51px"}>
          <Input
            type="password"
            placeholder="Lozinka"
            required
            onChange={(e) => {
              handlePasswordChange(e.target.value);
            }}
          />
          {!isPasswordValid && password && (
            <ErrorMessage marginTop={"51px"}>* Lozinka mora imati barem 8 znakova!</ErrorMessage>
          )}
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
        <SelectBtn>Registracija</SelectBtn>
      </Form>
      <BackIconContainer onClick={handleClick}>
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
    </>
  );
}

export default RegularUser;

const Form = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => `
    margin-left: ${props.hasMarginLeft ? "10px" : "0px"};
  `}
`;
