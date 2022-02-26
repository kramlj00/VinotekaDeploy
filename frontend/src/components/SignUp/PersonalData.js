import React from "react";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { BackIconContainer } from "./SignUpElements";

function PersonalData({ setIsBackPressed }) {
  const handleClick = () => {
    setIsBackPressed(true);
  };

  return (
    <>
      <form action="#">
        <input
          className="inp"
          type="text"
          placeholder="Ime i prezime vlasnika OPG-a"
        />
        <input className="inp" type="text" placeholder="Naziv OPG-a" />
        <input className="inp" type="number" placeholder="OIB vlasnika" />
        <input className="inp" type="email" placeholder="Email" />
        <input className="inp" type="password" placeholder="Lozinka" />
      </form>
      <BackIconContainer onClick={handleClick}>
        <ArrowBackOutlined fontSize="large" />
      </BackIconContainer>
    </>
  );
}

export default PersonalData;
