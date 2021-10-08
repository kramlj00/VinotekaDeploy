import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterLogo>VINOTEKA</FooterLogo>
      <FooterItemsConatainer>
        <ContactContainer>
          <ContactTitle>Kontaktirajte nas</ContactTitle>
          <ContactEmail>nekimail@mail.com</ContactEmail>
        </ContactContainer>
        <ProductsContainer>
          <ProductTitle>Proizvodi</ProductTitle>
          <ProductItemOne>Vina</ProductItemOne>
          <ProductItemTwo>Grožđe</ProductItemTwo>
        </ProductsContainer>
        <AdvertiseProduct>Oglasi proizvod</AdvertiseProduct>
        <Login>Prijava</Login>
      </FooterItemsConatainer>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div``;

const FooterItemsConatainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdvertiseProduct = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = styled.div``;

const ContactTitle = styled.span``;

const ContactEmail = styled.span``;

const ProductTitle = styled.span``;

const ProductItemOne = styled.span``;

const ProductItemTwo = styled.span``;
