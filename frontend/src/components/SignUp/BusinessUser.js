import React, { useState, useEffect } from "react";
import "../SignIn/style.css";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer, Input, SelectBtn } from "../global/global";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { businessRegister } from "../../actions/userActions";
import styled from "styled-components";

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
  const [isZipValid, setIsZipValid] = useState(true);

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

  const handleTextChange = (value, setValue) => {
    setIsWriting(true);
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setValue(value);
    }
  };

  const handleNumberStringChange = (value, setValue) => {
    setIsWriting(true);
    if (/^[0-9]*$/.test(value)) {
      setValue(value);
    }
  };

  const handleIntegerChange = (value, setValue, setIsInputValid) => {
    setIsWriting(true);
    if (value < 0 || value % 1 !== 0) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }

    setValue(value);
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
      <Form display={`${data === "personal" ? "block" : "none"}`}>
        <Input
          type="text"
          value={name}
          placeholder="Ime i prezime vlasnika OPG-a"
          onChange={(e) => {
            handleTextChange(
              e.target.value,
              setName,
            );
          }}
        />
        <Input
          type="text"
          placeholder="Naziv OPG-a"
          onChange={(e) => {
            setOpgName(e.target.value);
            setIsWriting(true);
          }}
        />
        <Input
          type="text"
          value={oib}
          maxLength={13}
          placeholder="OIB vlasnika"
          onChange={(e) => {
            handleNumberStringChange(
              e.target.value,
              setOib,
            );
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setIsWriting(true);
          }}
        />
        <Input
          type="password"
          placeholder="Lozinka"
          onChange={(e) => {
            setPassword(e.target.value);
            setIsWriting(true);
          }}
        />
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
          <Input
            hasMarginRight={true}
            type="text"
            value={street}
            placeholder="Ulica"
            onChange={(e) => handleTextChange(e.target.value, setStreet)}
          />
          <InputWrapper>
          <Input
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
          {!isHouseNumberValid && <ErrorMessage>Wrong input</ErrorMessage>}
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <Input
            hasMarginRight={true}
            type="text"
            value={city}
            placeholder="Mjesto"
            onChange={(e) => handleTextChange(e.target.value, setCity)}
          />
          <Input
            type="text"
            value={zip}
            placeholder="Poštanski broj"
            onChange={(e) => {
              handleNumberStringChange(
                e.target.value,
                setZip,
              );
            }}
          />
        </InputContainer>
        <Input
          type="text"
          placeholder="Županija"
          onChange={(e) => {
            setCounty(e.target.value);
            setIsWriting(true);
          }}
        />
        <Input
          type="text"
          placeholder="Telefon"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setIsWriting(true);
          }}
        />
        <SelectBtn>Registracija</SelectBtn>
      </Form>
    </>
  );
}

export default BusinessUser;

const DataTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
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
`;

const Form = styled.form`
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
`

const ErrorMessage = styled.div`
  margin: auto;
  margin-top: -5px;
  font-size: 17px;
  font-weight: bold;
`;
