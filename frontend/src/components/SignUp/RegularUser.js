import React from "react";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer, RegUserFormContainer } from "./SignUpElements";

function RegularUser({ setIsBackPressed }) {
  const handleClick = () => {
    setIsBackPressed(true);
  };
  return (
    <>
      <form action="#">
        <input className="inp" type="text" placeholder="Ime" />
        <input className="inp" type="text" placeholder="Prezime" />
        <input className="inp" type="email" placeholder="Email" />
        <input className="inp" type="password" placeholder="Lozinka" />
        <button className="btn">Registracija</button>
      </form>
      <BackIconContainer onClick={handleClick}>
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
    </>
  );
}

export default RegularUser;
