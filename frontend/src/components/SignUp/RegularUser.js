import React, { useState, useEffect } from "react";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer, RegUserFormContainer } from "./SignUpElements";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { regularRegister } from "../../actions/userActions";

function RegularUser({ setIsBackPressed, props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Lozinka i potvrđena lozinka se ne podudaraju!");
    } else {
      dispatch(regularRegister(name, email, password));
    }
    setIsWriting(false);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <>
      <form onSubmit={submitHandler}>
        {loading && <LoadingBox />}
        {!isWriting && error && (
          <MessageBox variant="danger">{error}</MessageBox>
        )}
        <input
          className="inp"
          type="text"
          placeholder="Ime i prezime"
          required
          onChange={(e) => {
            setName(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="password"
          placeholder="Lozinka"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setIsWriting(true);
          }}
        />
        <input
          className="inp"
          type="password"
          placeholder="Potvrdite lozinku"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setIsWriting(true);
          }}
        />
        <button className="btn">Registracija</button>
      </form>
      <BackIconContainer onClick={handleClick}>
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
    </>
  );
}

export default RegularUser;
