import React, { useEffect } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
    { label: "Oglasi proizvod", path: "/advertise_product" },
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
          <DropDown>
            <MyProfileContainer>
              <NavLink to="#" textColor={"black"} myProfile>
                Moj profil
              </NavLink>
              <ExpandMore />
            </MyProfileContainer>
            <DropDownContent>
              {userInfo.type_id === 2 && (
                <NavLink to={"ads_history"}>Moji oglasi</NavLink>
              )}
              <DropDownItem>
                <NavLink to={"/order_history"}>Moje narudžbe</NavLink>
              </DropDownItem>
              <DropDownItem>
                <NavLink
                  to="#signout"
                  onClick={signOutHandler}
                  textColor={"black"}
                >
                  Odjava
                </NavLink>
              </DropDownItem>
            </DropDownContent>
          </DropDown>
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

const MyProfileContainer = styled.div`
  display: flex;
`;

const DropDownContent = styled.ul`
  position: absolute;
  display: none;
  min-width: 15rem;
  padding: 1rem;
  z-index: 1;
  background-color: #f5f6fa;
  margin: 0;
  border-radius: 10px;
`;

const DropDown = styled.div`
  display: inline-block;
  position: relative;

  &:hover ${DropDownContent} {
    display: block;
  }
`;

const DropDownItem = styled.li`
  list-style: none;
  padding-top: 10px;

  &:first-child {
    padding-top: 0px;
  }
`;

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5 rem cals((100vw - 1000px) / 2);
  z-index: 10;
  margin-bottom: -1px;
  border-bottom: 1px solid gray;
`;

const NavLogo = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 25px;
  padding-left: 1rem;
  color: #b8001f;
`;

const Logotitle = styled.h1``;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  color: #000;
  font-family: "Quicksand", sans-serif;
  font-size: 21px;
  font-weight: 700;

  &.active {
    color: #b8001f;
    color: ${(props) => props.textColor};
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: #000;
  @media screen and (max-width: 1000px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    cursor: pointer;
    font-size: 1.8rem;
  }
`;

const Bars = styled(FaBars)``;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavCartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const CartCount = styled.div`
  font-weight: 700;
  padding-left: 4px;
`;
