import React, { useState, useEffect } from "react";
import "../SignIn/style.css";
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
import { businessRegister } from "../../actions/userActions";
import styled, { keyframes } from "styled-components";

function BusinessUser({ setIsBackPressed, props }) {
  const [data, setData] = useState("personal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opgName, setOpgName] = useState("");
  const [oib, setOib] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState(null);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [county, setCounty] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  const [isHouseNumberValid, setIsHouseNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isOpgNameValid, setIsOpgNameValid] = useState(true);
  const [isOibValid, setIsOibValid] = useState(true);
  const [isStreetValid, setIsStreetValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const [isZipValid, setIsZipValid] = useState(true);

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

  function handlePersonalData() {
    setData("personal");
  }

  function handleContactData() {
    setData("contact");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      isNameValid &&
      isOpgNameValid &&
      isOibValid &&
      isEmailValid &&
      isPasswordValid &&
      isStreetValid &&
      isHouseNumberValid &&
      houseNumber < 10000 &&
      isCityValid &&
      isZipValid
    )
      dispatch(
        businessRegister(
          name,
          email,
          password,
          opgName,
          oib,
          street,
          houseNumber,
          city,
          zip,
          county,
          phoneNumber
        )
      );

    setIsWriting(false);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const handleTextChange = (value, setValue, setIsValueValid) => {
    setIsWriting(true);
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value))
      setValue(value);
    value.length < 3 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleOibChange = (value) => {
    setIsWriting(true);
    if (/^[0-9]*$/.test(value)) setOib(value);
    value.length === 13 ? setIsOibValid(true) : setIsOibValid(false);
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

  const handleNumberStringChange = (value, setValue, setIsValueValid) => {
    setIsWriting(true);
    if (/^[0-9]*$/.test(value)) setValue(value);
    value.length < 5 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleIntegerChange = (value, setValue, setIsInputValid) => {
    setIsWriting(true);
    if ((value < 0 || value % 1 !== 0) && value > 10000) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }

    setValue(value);
  };

  const handleOpgNameChange = (value, setIsValueValid) => {
    setOpgName(value);
    value.lenght < 3 ? setIsValueValid(false) : setIsValueValid(true);
  };

  return (
    <>
      <DataTitleContainer>
        <BtnData
          className={`${data === "personal" ? "active-data" : null}`}
          onClick={handlePersonalData}
        >
          Osobni podaci
        </BtnData>
        <BtnData
          className={`${data === "contact" ? "active-data" : null}`}
          onClick={handleContactData}
        >
          Kontakt podaci
        </BtnData>
      </DataTitleContainer>
      <Form display={`${data === "personal" ? "contents" : "none"}`}>
        <Input
          type="text"
          value={name}
          placeholder="Ime i prezime vlasnika OPG-a"
          onChange={(e) =>
            handleTextChange(e.target.value, setName, setIsNameValid)
          }
        />
        <ErrorMessage
          visibility={name && name.length < 3 ? "visible" : "hidden"}
        >
          {errorMessage}
        </ErrorMessage>
        <Input
          type="text"
          placeholder="Naziv OPG-a"
          onChange={(e) => {
            setIsWriting(true);
            handleOpgNameChange(e.target.value, setIsOpgNameValid);
          }}
        />
        <ErrorMessage
          visibility={opgName && opgName.length < 3 ? "visible" : "hidden"}
        >
          {errorMessage}
        </ErrorMessage>
        <Input
          type="text"
          value={oib}
          maxLength={13}
          placeholder="OIB vlasnika"
          onChange={(e) => handleOibChange(e.target.value)}
        />
        <ErrorMessage
          visibility={oib && oib.length !== 13 ? "visible" : "hidden"}
        >
          {errorMessage}
        </ErrorMessage>
        <Input
          type="email"
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
        <Input
          type="password"
          placeholder="Lozinka"
          onChange={(e) => {
            handlePasswordChange(e.target.value);
          }}
        />
        <ErrorMessage
          visibility={!isPasswordValid && password ? "visible" : "hidden"}
        >
          * Lozinka mora imati barem 8 znakova!
        </ErrorMessage>
      </Form>
      <BackIconContainer
        onClick={handleClick}
        display={data === "personal" ? "block" : "none"}
      >
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
      <Form
        onSubmit={submitHandler}
        display={`${data === "contact" ? "block" : "none"}`}
      >
        {loading && <LoadingBox />}
        {!isWriting && error && (
          <MessageBox variant="danger">{error}</MessageBox>
        )}
        <InputContainer>
          <InputWrapper>
            <Input
              required
              hasMarginRight={true}
              type="text"
              value={street}
              placeholder="Ulica"
              onChange={(e) =>
                handleTextChange(e.target.value, setStreet, setIsStreetValid)
              }
            />
            <ErrorMessage
              visibility={street && street.length < 3 ? "visible" : "hidden"}
              isRelative
            >
              {errorMessage}
            </ErrorMessage>
          </InputWrapper>
          <InputWrapper hasMarginLeft={true}>
            <Input
              required
              type="number"
              placeholder="Kućni broj"
              onChange={(e) => {
                handleIntegerChange(
                  e.target.value,
                  setHouseNumber,
                  setIsHouseNumberValid
                );
              }}
            />
            <ErrorMessage
              visibility={!isHouseNumberValid ? "visible" : "hidden"}
              isRelative
            >
              {errorMessage}
            </ErrorMessage>
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Input
              required
              hasMarginRight={true}
              type="text"
              value={city}
              placeholder="Mjesto"
              onChange={(e) =>
                handleTextChange(e.target.value, setCity, setIsCityValid)
              }
            />
            <ErrorMessage
              visibility={city && city.length < 3 ? "visible" : "hidden"}
              isRelative
            >
              {errorMessage}
            </ErrorMessage>
          </InputWrapper>
          <InputWrapper hasMarginLeft={true}>
            <Input
              required
              type="text"
              value={zip}
              maxLength={5}
              placeholder="Poštanski broj"
              onChange={(e) => {
                handleNumberStringChange(e.target.value, setZip, setIsZipValid);
              }}
            />
            <ErrorMessage
              visibility={zip && zip.length < 5 ? "visible" : "hidden"}
              isRelative
            >
              {errorMessage}
            </ErrorMessage>
          </InputWrapper>
        </InputContainer>
        <Input
          required
          type="text"
          placeholder="Županija"
          onChange={(e) => {
            setCounty(e.target.value);
            setIsWriting(true);
          }}
        />
        <Input
          required
          type="text"
          placeholder="Telefon"
          maxLength={20}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setIsWriting(true);
          }}
        />
        <SelectBtn hasMarginTop>Registracija</SelectBtn>
      </Form>
    </>
  );
}

export default BusinessUser;

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

const DataTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;

  animation-name: ${fadeAnimation};
  animation-duration: 1s;
`;

const BtnData = styled.button`
  background-color: white;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  padding: 7px 15px;
  letter-spacing: 1px;
  border: 1.5px solid #afafaf;
  color: #afafaf;
  cursor: pointer;

  &.active-data {
    border: 1.5px solid #e83946;
    color: #e83946;
  }

  @media screen and (max-width: 1300px) {
    font-size: 16px;
    padding: 5px 10px;
  }

  @media screen and (max-width: 1300px) {
    font-size: 16px;
    padding: 7px 10px;
  }

  @media screen and (max-width: 1200px) {
    font-size: 14px;
    padding: 7px 8px;
  }

  @media screen and (max-width: 1050px) {
    letter-spacing: 0;
    font-size: 13px;
    padding: 5px 6px;
  }

  @media screen and (max-width: 900px) {
    font-size: 17px;
    padding: 7px 15px;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 650px) {
    font-size: 16px;
    padding: 6px 10px;
    letter-spacing: 0.5px;
  }

  @media screen and (max-width: 560px) {
    font-size: 14px;
    padding: 5px 7px;
    letter-spacing: 0px;
  }
`;

const Form = styled.form`
  animation-name: ${fadeAnimation};
  animation-duration: 1s;

  ${({ display }) => `
    display: ${display};
  `}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => `
    margin-left: ${props.hasMarginLeft ? "10px" : "0px"};
  `}
`;
