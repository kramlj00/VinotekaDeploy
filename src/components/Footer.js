import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <SeparatorBar>
        <HorizontalLine />
        <FooterLogo>VINOTEKA</FooterLogo>
        <HorizontalLine />
      </SeparatorBar>
      <FooterItemsConatainer>
        <ItemContainer>
          <FooterItemTitle>Kontaktirajte nas</FooterItemTitle>
          <FooterItemSubtitle>nekimail@mail.com</FooterItemSubtitle>
        </ItemContainer>
        <ItemContainer>
          <FooterItemTitle>Proizvodi</FooterItemTitle>
          <FooterItemSubtitle>Vina</FooterItemSubtitle>
          <FooterItemSubtitle>Grožđe</FooterItemSubtitle>
        </ItemContainer>
        <ItemContainer>
          <FooterItemTitle>Oglasi proizvod</FooterItemTitle>
        </ItemContainer>
        <ItemContainer>
          <FooterItemTitle>Prijava</FooterItemTitle>
        </ItemContainer>
      </FooterItemsConatainer>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  background-color: #5e3535;
  padding-top: 20px;
  padding-bottom: 50px;
`;

const SeparatorBar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 200px;
  background-color: whitesmoke;
`;

const FooterLogo = styled.div`
  font-size: 3rem;
  padding: 0 20px;
  font-family: "Dancing Script", cursive;
  color: #fff;
  font-weight: normal;
`;

const FooterItemsConatainer = styled.div`
  padding-top: 20px;
  display: flex;
  width: 60%;
  margin: 0 auto;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  color: white;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    padding-top: 20px;
  }
`;

const FooterItemTitle = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
`;

const FooterItemSubtitle = styled.span`
  font-size: 1.2rem;
  color: #bfbfbf;
  font-weight: 700;
  cursor: pointer;
`;
