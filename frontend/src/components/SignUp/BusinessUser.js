import React, { useState, useEffect } from "react";
import "../SignIn/style.css";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer, Input } from "../global/global";
import { SelectBtn } from "../global/buttons/SelectButton";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { businessRegister } from "../../actions/userActions";
import styled from "styled-components";
import { counties } from "./counties";
import Select from "react-select";

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
  const [selectedOption, setSelectedOption] = useState(null);

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
      isZipValid &&
      county
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

  const handleZipChange = (value, setValue, setIsValueValid) => {
    setIsWriting(true);
    if (/^[0-9]*$/.test(value)) setValue(value);
    value.length < 5 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleIntegerChange = (value, setValue, setIsInputValid) => {
    setIsWriting(true);
    if (!value || value < 0 || value % 1 !== 0 || value > 10000) {
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

  const customSelectorStyles = {
    option: (provided, state) => ({
      ...provided,
      border: 'none',
      background: state.isSelected ? '#e8e8e8' : '#ffffff',
      color: '#6c757d',
      fontWeight: state.isSelected && 'bolder',

      '&:hover': {
        cursor: 'pointer',
        background: '#e8e8e8',
      },
    }),
    control: () => ({
      display: 'flex',
      background: '#ffffff',
      border: '1.4px solid #e8e8e8',
      margin: '10px 0 22px 0',

      '&:hover': {
        cursor: 'pointer',
      }
    }),
    menuList: (provided, state) => ({
      ...provided,
      maxHeight: '200px'
    }),
  };

  return (
    <>
      <DataTitleContainer
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="300"
      >
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
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
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
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
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
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
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
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
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
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
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
        display={data === "personal" ? "flex" : "none"}
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
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="800"
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
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="800"
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
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="800"
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
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="800"
              required
              type="text"
              value={zip}
              maxLength={5}
              placeholder="Poštanski broj"
              onChange={(e) => {
                handleZipChange(e.target.value, setZip, setIsZipValid);
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
        <Select
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
          defaultValue={selectedOption}
          placeholder="Županija"
          onChange={(e) => {
            setSelectedOption(e);
            setCounty(e.value);
            setIsWriting(true);
          }}
          styles={customSelectorStyles}
          options={counties}
          isSearchable
        />
        <Input
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="800"
          required
          type="text"
          placeholder="Telefon"
          maxLength={20}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setIsWriting(true);
          }}
        />
        <SelectBtn type="submit" hasMarginTop>Registracija</SelectBtn>
      </Form>
    </>
  );
}

export default BusinessUser;

const DataTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const BtnData = styled.button`
  border-radius: 20px;
  font-weight: bold;
  padding: 7px 15px;
  letter-spacing: 1px;
  cursor: pointer;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    background-color: ${theme.color.main.white};
    border: 1.5px solid ${theme.color.secondary.productsBorderGrey};
    color: ${theme.color.secondary.productsBorderGrey};

    &.active-data {
      border: 1.5px solid ${theme.color.main.roseRed};
      color: ${theme.color.main.roseRed};
    }

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumSmall};
      padding: 7px 10px;
      letter-spacing: 0.5px;
    } 
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
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
