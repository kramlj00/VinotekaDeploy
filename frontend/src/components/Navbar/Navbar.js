import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavOptions,
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
        <NavLink to="/grapes">Ponuda grožđa</NavLink>
        <NavLink to="/advertise-product">Oglasi proizvod</NavLink>
      </NavMenu>
      <NavOptions>
        <NavLink to="/sign-in">Prijava</NavLink>
        <NavLink to="/cart">
          <ShoppingBasketIcon />
          <CartCount>{cartItems.length}</CartCount>
        </NavLink>
      </NavOptions>
    </Nav>
  );
}

export default Navbar;
