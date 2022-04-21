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
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  margin-top: 35px;

  ${({ theme }) => `
    background-color: ${theme.color.main.darkGrey};
  `}
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

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 110px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 70px;
    }
  `}
`;

const FooterLogo = styled(Link)`
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
  padding: 0 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.subtitle};
    font-family: ${theme.fontFamily.secondary};
    color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      padding: 0 12px;
    }

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.large};
    }
  `}
`;

const FooterItemsConatainer = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: space-between;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      flex-direction: column;
      flex-grow: 0.5;
    }
  `}
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  :nth-child(2) {
    justify-content: space-between;
    height: 120px;
    ${({ theme }) => `
      @media(max-width: ${theme.breakpoints.tablet}){
        display: none;
      }
    `}
  }
`;

const FooterItemTitle = styled.div`
  ${({ theme }) => `
    color: ${theme.color.main.white};
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarger};
    }
  `}
`;

const FooterItemSubtitle = styled.span`
  font-weight: 700;

  ${({ theme }) => `
    color: ${theme.color.secondary.grey};
    font-size: ${theme.fontSize.mediumLarger};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    }
  `}
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const WebsiteRightsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.secondary.rightsGrey};
  `}
`;
