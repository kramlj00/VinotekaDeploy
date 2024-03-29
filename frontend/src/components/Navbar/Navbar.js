import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

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
          <Logotitle>eVinoteka</Logotitle>
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
              <NavLink textcolor="black" to="#" capitalize="true">
                {userInfo.name || userInfo.data.name}
              </NavLink>
              <ExpandLessContainer>
                <ExpandLess />
              </ExpandLessContainer>
              <ExpandMoreContainer>
                <ExpandMore />
              </ExpandMoreContainer>
            </MyProfileContainer>
            <DropDownContent>
              {userInfo &&
                ((userInfo.type_id && userInfo.type_id === 1) ||
                  (userInfo.data && userInfo.data.type_id === 1)) && (
                  <>
                    <DropDownItem>
                      <NavLink to={"/all_ads"}>Oglasi</NavLink>
                    </DropDownItem>
                  </>
                )}
              <DropDownItem>
                <NavLink to={"/my_profile"}>Korisnički račun</NavLink>
              </DropDownItem>
              {userInfo &&
                ((userInfo.type_id && userInfo.type_id === 2) ||
                  (userInfo.data && userInfo.data.type_id === 2)) && (
                  <>
                    <DropDownItem>
                      <NavLink to={"/business_profile"}>Poslovni račun</NavLink>
                    </DropDownItem>
                    <DropDownItem>
                      <NavLink to={"/mine_ads"}>Moji oglasi</NavLink>
                    </DropDownItem>
                  </>
                )}
              <DropDownItem>
                <NavLink to={"/order_history"}>Moje narudžbe</NavLink>
              </DropDownItem>
              <DropDownItem>
                <NavLink to="/" onClick={signOutHandler} textcolor={"black"}>
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

const ExpandLessContainer = styled.div`
  display: none;
  height: 20px;
  margin-left: -10px;
  cursor: pointer;
`;

const ExpandMoreContainer = styled.div`
  height: 20px;
  margin-left: -10px;
  cursor: pointer;
`;

const MyProfileContainer = styled.div`
  display: flex;
`;

const DropDownContent = styled.ul`
  position: absolute;
  display: none;
  min-width: 13.2rem;
  padding: 1rem;
  padding-left: 0.5rem;
  z-index: 1;
  margin: 0;
  border-radius: 10px;

  ${({ theme }) => `
    background-color: ${theme.color.main.dimGrey};
  `}
`;

const DropDown = styled.div`
  display: inline-block;
  position: relative;

  &:hover ${DropDownContent} {
    display: block;
  }

  &:hover ${ExpandLessContainer} {
    display: flex;
  }

  &:hover ${ExpandMoreContainer} {
    display: none;
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
  padding-left: 1rem;

  ${({ theme }) => `
     font-family: ${theme.fontFamily.secondary};
     color: ${theme.color.main.wineRed};
     font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarger};
      padding-left: 0.25rem;
    } 
  `}
`;

const Logotitle = styled.h1``;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 700;

  &.active {
    color: #b8001f;
    color: ${(props) => props.textcolor};
  }

  ${({ theme, capitalize }) => `
     font-family: ${theme.fontFamily.main};
     color: ${theme.color.main.black};
     font-size: ${theme.fontSize.mediumLarger};
     text-transform: ${capitalize ? "capitalize" : ""};
  `}
`;

const MobileIcon = styled.div`
  display: none;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 50%);
      cursor: pointer;
      font-size: ${theme.fontSize.large};
      color: ${theme.color.main.black};
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      transform: translate(-50%, 50%);
    } 
  `}
`;

const Bars = styled(FaBars)``;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  /* align-items: right; */
  /* margin-right: 120px; */

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      display: none;
    }
  `}
`;

const NavCartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      display: none;
    }
  `}
`;

const CartCount = styled.div`
  font-weight: 700;
  padding-left: 4px;
`;
