import React, { useState, useEffect } from "react";
import { DataTitleContainer, BtnData } from "./SignUpElements";
import "../SignIn/style.css";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer } from "./SignUpElements";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { businessRegister } from "../../actions/userActions";

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
      <form className={`${data === "personal" ? "active-data" : "not-active"}`}>
        <input
          className="inp"
          type="text"
          placeholder="Ime i prezime vlasnika OPG-a"
          onChange={(e) => {
            setName(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="text"
          placeholder="Naziv OPG-a"
          onChange={(e) => {
            setOpgName(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="text"
          placeholder="OIB vlasnika"
          onChange={(e) => {
            setOib(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="password"
          placeholder="Lozinka"
          onChange={(e) => {
            setPassword(e.target.value);
            setIsWriting(true);
          }}
        />
      </form>
      <BackIconContainer
        onClick={handleClick}
        display={data === "personal" ? "block" : "none"}
      >
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
      <form
        onSubmit={submitHandler}
        className={`${data === "contact" ? "active-data" : "not-active"}`}
      >
        {loading && <LoadingBox />}
        {!isWriting && error && (
          <MessageBox variant="danger">{error}</MessageBox>
        )}
        <div className="flexy">
          <input
            className="inp inp-left"
            type="text"
            placeholder="Ulica"
            onChange={(e) => {
              setStreet(e.target.value);
              setIsWriting(true);
            }}
          />
          <input
            className="inp"
            type="number"
            placeholder="Kućni broj"
            onChange={(e) => {
              setHouseNumber(e.target.value);
              setIsWriting(true);
            }}
          />
        </div>
        <div className="flexy">
          <input
            className="inp inp-left"
            type="text"
            placeholder="Mjesto"
            onChange={(e) => {
              setCity(e.target.value);
              setIsWriting(true);
            }}
          />
          <input
            className="inp"
            type="text"
            placeholder="Poštanski broj"
            onChange={(e) => {
              setZip(e.target.value);
              setIsWriting(true);
            }}
          />
        </div>
        <input
          className="inp"
          type="text"
          placeholder="Županija"
          onChange={(e) => {
            setCounty(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="text"
          placeholder="Telefon"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setIsWriting(true);
          }}
        />
        <button className="btn">Registracija</button>
      </form>
    </>
  );
}

export default BusinessUser;
