import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

function Footer() {
  const footerItems = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise_product" },
    { label: "Prijava", path: "/sign-in" },
  ];

  return (
    <FooterContainer>
      <SeparatorBar>
        <HorizontalLine />
        <FooterLogo to="/">eVINOTEKA</FooterLogo>
        <HorizontalLine />
      </SeparatorBar>
      <FooterItemsConatainer>
        <ItemContainer>
          <FooterItemTitle>Kontaktirajte nas</FooterItemTitle>
          <FooterItemSubtitle>nekimail@mail.com</FooterItemSubtitle>
        </ItemContainer>
        {footerItems.map((footerItem) => (
          <ItemContainer key={footerItem.path}>
            <FooterLink to={footerItem.path}>
              <FooterItemTitle>{footerItem.label}</FooterItemTitle>
            </FooterLink>
          </ItemContainer>
        ))}
      </FooterItemsConatainer>
      <WebsiteRightsContainer>
        Vinoteka &copy; {new Date().getFullYear()} All rights reserved.
      </WebsiteRightsContainer>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  background-color: #252422;
  height: 300px;
  justify-content: space-between;
  margin-top: 35px;
`;

const SeparatorBar = styled.section`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 200px;
  background-color: whitesmoke;

  @media screen and (max-width: 1000px) {
    width: 110px;
  }

  @media screen and (max-width: 750px) {
    width: 70px;
  }
`;

const FooterLogo = styled(Link)`
  font-size: 3rem;
  text-decoration: none;
  font-family: "Dancing Script", cursive;
  color: #fff;
  font-weight: normal;
  cursor: pointer;
  padding: 0 20px;

  @media screen and (max-width: 1000px) {
    font-size: 2rem;
    padding: 0 12px;
  }

  @media screen and (max-width: 750px) {
  }
`;

const FooterItemsConatainer = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  color: white;

  @media screen and (max-width: 750px) {
    flex-direction: column;
    flex-grow: 0.5;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  :nth-child(2) {
    justify-content: space-between;
    height: 120px;
    @media screen and (max-width: 750px) {
      display: none;
    }
  }

  span {
    padding-top: 20px;
    @media screen and (max-width: 750px) {
      padding-top: 10px;
    }
  }

  @media screen and (max-width: 750px) {
  }
`;

const FooterItemTitle = styled.div`
  color: #fff;
  font-size: 1.5rem;

  @media screen and (max-width: 1000px) {
    font-size: 1.25rem;
  }
`;

const FooterItemSubtitle = styled.span`
  font-size: 1.2rem;
  color: #bfbfbf;
  font-weight: 700;

  @media screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const WebsiteRightsContainer = styled.div`
  color: #868686;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
