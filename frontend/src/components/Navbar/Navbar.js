import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavCartContainer,
  CartCount,
  NavLogo,
  MobileIcon,
} from "./NavElements";
import { useSelector } from "react-redux";

function Navbar({ toggle }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Nav>
      <NavLink to="/">
        <NavLogo>
          <h1>Vinoteka</h1>
        </NavLogo>
      </NavLink>
      <MobileIcon onClick={toggle}>
        <Bars />
      </MobileIcon>
      <NavMenu>
        <NavLink to="/wines">Ponuda vina</NavLink>
        <NavLink to="/advertise-product">Oglasi proizvod</NavLink>
        <NavLink to="/sign-in">Prijava</NavLink>
      </NavMenu>
      <NavCartContainer>
        <NavLink to="/cart">
          <ShoppingBasketIcon />
          <CartCount>{cartItems.length}</CartCount>
        </NavLink>
      </NavCartContainer>
    </Nav>
  );
}

export default Navbar;
