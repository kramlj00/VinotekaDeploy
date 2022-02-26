import React from "react";
import {
  FooterContainer,
  SeparatorBar,
  HorizontalLine,
  FooterLogo,
  FooterItemsConatainer,
  ItemContainer,
  FooterItemTitle,
  FooterItemSubtitle,
  FooterLink,
  WebsiteRightsContainer,
} from "./FooterElements";

function Footer() {
  const footerItems = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise-product" },
    { label: "Prijava", path: "/sign-in" },
  ];

  return (
    <FooterContainer>
      <SeparatorBar>
        <HorizontalLine />
        <FooterLogo to="/">VINOTEKA</FooterLogo>
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
