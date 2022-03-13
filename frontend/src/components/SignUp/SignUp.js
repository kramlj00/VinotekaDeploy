import React, { useEffect, useState } from "react";
import "../SignIn/style.css";
import BusinessUser from "./BusinessUser";
import RegularUser from "./RegularUser";
import styled from "styled-components";
import { SelectBtn } from "../global/global";

function SignUp({ props }) {
  const [userType, setUserType] = useState("");
  const [isBackPressed, setIsBackPressed] = useState(false);

  useEffect(() => {
    setUserType("");
    setIsBackPressed(false);
  }, [isBackPressed]);

  function handleBusinessUser() {
    setUserType("business");
  }

  function handleRegularUser() {
    setUserType("regular");
  }

  return (
    <SignUpContainer
      justifyContent={userType === "regular" ? "space-between" : ""}
    >
      <Title>Napravi račun</Title>
      {userType === "business" ? (
        <BusinessUser props={props} setIsBackPressed={setIsBackPressed} />
      ) : userType === "regular" ? (
        <RegularUser props={props} setIsBackPressed={setIsBackPressed} />
      ) : (
        <>
          <Wrapper background="#b93327">
            <TitleContainer>
              <Title>Poslovni korisnik</Title>
            </TitleContainer>
            <Description>
              Kako biste mogli predati oglas morate se registrirati kao poslovni
              subjekt.
            </Description>
            <SelectBtn ghost onClick={handleBusinessUser}>
              Odaberi
            </SelectBtn>
          </Wrapper>
          <Wrapper background="#ea985c">
            <TitleContainer>
              <Title>Obični korisnik</Title>
            </TitleContainer>
            <Description>
              S ovim računom moći ćete komentirati vina koja ste naručili i
              pogledati prethodne narudžbe, ali ne i oglasiti svoja vina.
            </Description>
            <SelectBtn ghost onClick={handleRegularUser}>
              Odaberi
            </SelectBtn>
          </Wrapper>
        </>
      )}
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  height: 92%;
  justify-content: ${(props) => props.justifyContent};
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;

  ${({ background }) => `
    background: ${background};
  `}
`;

const TitleContainer = styled.div`
  color: white;
  font-size: 14px;
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  color: white;
  padding: 10px;
  @media screen and (max-width: 700px) {
    padding: 7px;
  }
`;
