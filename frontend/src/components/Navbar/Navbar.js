import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  Nav,
  Logotitle,
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

  const navLinks = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise-product" },
    { label: "Prijava", path: "/sign-in" },
  ];

  return (
    <Nav>
      <NavLink to="/">
        <NavLogo>
          <Logotitle>Vinoteka</Logotitle>
        </NavLogo>
      </NavLink>
      <MobileIcon onClick={toggle}>
        <Bars />
      </MobileIcon>
      <NavMenu>
        {navLinks.map((navLink) => (
          <NavLink to={navLink.path} key={navLink.path}>
            {navLink.label}
          </NavLink>
        ))}
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
