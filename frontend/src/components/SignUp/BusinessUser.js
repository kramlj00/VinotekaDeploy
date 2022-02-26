import React, { useState } from "react";
import ContactData from "./ContactData";
import PersonalData from "./PersonalData";
import { DataTitleContainer, BtnData } from "./SignUpElements";

function BusinessUser({ setIsBackPressed }) {
  const [data, setData] = useState("personal");

  function handlePersonalData() {
    setData("personal");
  }

  function handleContactData() {
    setData("contact");
  }

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
      {data === "personal" ? (
        <PersonalData setIsBackPressed={setIsBackPressed} />
      ) : (
        <ContactData />
      )}
    </>
  );
}

export default BusinessUser;
