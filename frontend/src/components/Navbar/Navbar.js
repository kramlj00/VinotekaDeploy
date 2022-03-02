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
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";

function Navbar({ toggle }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  const navLinks = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise-product" },
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
        {userInfo ? (
          <NavLink to="#signout" onClick={signOutHandler}>
            Odjava
          </NavLink>
        ) : (
          <NavLink to={"/sign-in"}>Prijava</NavLink>
        )}
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
