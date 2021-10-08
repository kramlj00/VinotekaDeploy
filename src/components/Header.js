import React from "react";
import styled from "styled-components";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo>VINOTEKA</HeaderLogo>
      <Menu>
        <HomePage>POČETNA</HomePage>
        <WinePage>PONUDA VINA</WinePage>
        <GrapesPage>PONUDA GROŽĐA</GrapesPage>
        <AdvertiseProduct>OGLASI PROIZVOD</AdvertiseProduct>
      </Menu>
      <NavItems>
        <Login>PRIJAVA</Login>
        <Cart>
          <ShoppingBasketIcon />
          <CartCount>1</CartCount>
        </Cart>
      </NavItems>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  border-bottom: 1px solid gray;
`;

const HeaderLogo = styled.div`
  margin-left: 20px;
  font-family: "Dancing Script", cursive;
  font-size: 45px;
  font-weight: normal;
`;

const Menu = styled.div`
  display: flex;
  float: right;
  justify-content: space-between;
  width: 45rem;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;

  span {
    cursor: pointer;
  }
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 9rem;
  margin-right: 20px;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;

  span {
    cursor: pointer;
  }
`;

const HomePage = styled.span``;

const WinePage = styled.span``;

const GrapesPage = styled.span``;

const AdvertiseProduct = styled.span``;

const Cart = styled.span`
  display: flex;
  font-size: 20px;
`;

const CartCount = styled.span`
  font-weight: 700;
  padding-left: 4px;
`;

const Login = styled.span``;
