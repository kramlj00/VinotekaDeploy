import React, { useEffect, useState } from "react";
import "../SignIn/style.css";
import BusinessUser from "./BusinessUser";
import RegularUser from "./RegularUser";
import styled from "styled-components";
import { SelectBtn } from "../global/buttons/SelectButton";

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
        <UserOptionContainer>
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
          <Wrapper hasMarginTop background="#ea985c">
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
        </UserOptionContainer>
      )}
    </SignUpContainer>
  );
}

export default SignUp;

const UserOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  height: 92%;
  justify-content: ${(props) => props.justifyContent};

  @media screen and (min-width: 900px) and (max-width: 1000px) {
    padding: 0 25px;
  }

  ${({ theme }) => `
    background-color: ${theme.color.main.white};
  `}
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 10px;

  ${({ background, hasMarginTop }) => `
    background: ${background};
    margin-top: ${hasMarginTop ? "20px" : ""};
  `}
`;

const TitleContainer = styled.div`
  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumSmall};
    } 
  `}
`;

const Description = styled.p`
  padding: 10px;

  ${({ theme }) => `
    color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      padding: 7px;
    } 
  `}
`;
