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
        <ItemContainer>
          <FooterLink to="/wines">
            <FooterItemTitle>Ponuda vina</FooterItemTitle>
            {/* <FooterItemSubtitle>Vina</FooterItemSubtitle> */}
          </FooterLink>
        </ItemContainer>
        <ItemContainer>
          <FooterLink to="/advertise-product">
            <FooterItemTitle>Oglasi proizvod</FooterItemTitle>
          </FooterLink>
        </ItemContainer>
        <ItemContainer>
          <FooterLink to="/sign-in">
            <FooterItemTitle>Prijava</FooterItemTitle>
          </FooterLink>
        </ItemContainer>
      </FooterItemsConatainer>
      <WebsiteRightsContainer>
        Vinoteka &copy; {new Date().getFullYear()} All rights reserved.
      </WebsiteRightsContainer>
    </FooterContainer>
  );
}

export default Footer;
