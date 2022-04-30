import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  detailsBusinessUser,
  updateBusinessUserProfile,
} from "../../actions/userActions";
import { Input } from "../global/global";
import { SelectBtn } from "../global/buttons/SelectButton";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";

function BusinessProfile() {
  const businessUserDetails = useSelector((state) => state.businessUserDetails);
  const { user } = businessUserDetails;

  const [opgName, setOpgName] = useState("");
  const [oib, setOib] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [county, setCounty] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isHouseNumberValid, setIsHouseNumberValid] = useState(true);
  const [isOpgNameValid, setIsOpgNameValid] = useState(true);
  const [isOibValid, setIsOibValid] = useState(true);
  const [isStreetValid, setIsStreetValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const [isZipValid, setIsZipValid] = useState(true);

  const errorMessage = "* Pogrešan unos!";

  const businessUserUpdateProfile = useSelector(
    (state) => state.businessUserUpdateProfile
  );
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = businessUserUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(detailsBusinessUser());
    } else {
      setOpgName(user.opg_name);
      setCity(user.city);
      setCounty(user.county);
      setHouseNumber(user.house_number);
      setOib(user.oib);
      setStreet(user.street);
      setZip(user.zip);
      setPhoneNumber(user.phone_number);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      isOpgNameValid &&
      isOibValid &&
      isStreetValid &&
      isHouseNumberValid &&
      houseNumber < 10000 &&
      isCityValid &&
      isZipValid
    )
      dispatch(
        updateBusinessUserProfile({
          opgName,
          oib,
          street,
          houseNumber,
          city,
          zip,
          county,
          phoneNumber,
        })
      );
  };

  const handleTextChange = (value, setValue, setIsValueValid) => {
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value))
      setValue(value);
    value.length < 3 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleOibChange = (value) => {
    if (/^[0-9]*$/.test(value)) setOib(value);
    value.length === 13 ? setIsOibValid(true) : setIsOibValid(false);
  };

  const handleZipChange = (value, setValue, setIsValueValid) => {
    if (/^[0-9]*$/.test(value)) setValue(value);
    value.length < 5 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleIntegerChange = (value, setValue, setIsInputValid) => {
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
    <ContentContainer>
      {loadingUpdate && <LoadingBox />}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {successUpdate && (
        <MessageBox variant="info">Profil uspješno ažuriran!</MessageBox>
      )}
      <Form onSubmit={submitHandler}>
        <Title>Poslovni račun:</Title>
        <Input
          type="text"
          value={opgName}
          placeholder="Naziv OPG-a"
          onChange={(e) => {
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
        <InputContainer>
          <InputWrapper>
            <Input
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
              value={houseNumber}
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
        <Input
          value={county}
          type="text"
          placeholder="Županija"
          onChange={(e) => {
            setCounty(e.target.value);
          }}
        />
        <Input
          value={phoneNumber}
          type="text"
          maxLength={20}
          placeholder="Telefon"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <BtnContainer>
          <SelectBtn hasMarginTop>Spremi promjene</SelectBtn>
        </BtnContainer>
      </Form>
    </ContentContainer>
  );
}

export default BusinessProfile;

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

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;
