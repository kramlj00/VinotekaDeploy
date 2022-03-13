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
  const [opg_name, setOpgName] = useState("");
  const [oib, setOib] = useState("");
  const [street, setStreet] = useState("");
  const [house_number, setHouseNumber] = useState(null);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [county, setCounty] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [isWriting, setIsWriting] = useState(true);

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
        opg_name,
        oib,
        street,
        house_number,
        city,
        zip,
        county,
        phone_number
      )
    );

    setIsWriting(false);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

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
          placeholder="Ime i prezime vlasnika OPG-a"
          onChange={(e) => {
            setName(e.target.value);
            setIsWriting(true);
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
          placeholder="OIB vlasnika"
          onChange={(e) => {
            setOib(e.target.value);
            setIsWriting(true);
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
            placeholder="Ulica"
            onChange={(e) => {
              setStreet(e.target.value);
              setIsWriting(true);
            }}
          />
          <Input
            type="number"
            placeholder="Kućni broj"
            onChange={(e) => {
              setHouseNumber(e.target.value);
              setIsWriting(true);
            }}
          />
        </InputContainer>
        <InputContainer>
          <Input
            hasMarginRight={true}
            type="text"
            placeholder="Mjesto"
            onChange={(e) => {
              setCity(e.target.value);
              setIsWriting(true);
            }}
          />
          <Input
            type="text"
            placeholder="Poštanski broj"
            onChange={(e) => {
              setZip(e.target.value);
              setIsWriting(true);
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
  align-items: center;
  justify-content: space-between;
`;
