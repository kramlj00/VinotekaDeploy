import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

function Sidebar({ toggle, isOpen }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  const sidebarLinks = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise_product" },
    { label: "Korisnički račun", path: "/my_profile", private: true },
    { label: "Poslovni račun", path: "/business_profile", business: true },
    { label: "Moji oglasi", path: "/mine_ads", business: true },
    { label: "Moje narudžbe", path: "/order_history", private: true },
    { label: "Košarica", path: "/cart" },
  ];

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {userInfo &&
            ((userInfo.type_id && userInfo.type_id === 1) ||
              (userInfo.data && userInfo.data.type_id === 1)) && (
              <SidebarLink to="/all_ads" onClick={toggle}>
                Oglasi
              </SidebarLink>
            )}
          {sidebarLinks.map((navLink) =>
            !navLink.business ? (
              !navLink.private ? (
                <SidebarLink
                  to={navLink.path}
                  key={navLink.path}
                  onClick={toggle}
                >
                  {navLink.label}
                </SidebarLink>
              ) : (
                userInfo && (
                  <SidebarLink
                    to={navLink.path}
                    key={navLink.path}
                    onClick={toggle}
                  >
                    {navLink.label}
                  </SidebarLink>
                )
              )
            ) : (
              userInfo &&
              userInfo &&
              ((userInfo.type_id && userInfo.type_id === 2) ||
                (userInfo.data && userInfo.data.type_id === 2)) && (
                <SidebarLink
                  to={navLink.path}
                  key={navLink.path}
                  onClick={toggle}
                >
                  {navLink.label}
                </SidebarLink>
              )
            )
          )}
          {userInfo ? (
            <SidebarLink
              to="#signout"
              onClick={signOutHandler}
              textcolor={"black"}
            >
              Odjava
            </SidebarLink>
          ) : (
            <SidebarLink to="/sign-in">Prijava</SidebarLink>
          )}
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 1s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  overflow-y: scroll;

  ${({ theme }) => `
    background-color: ${theme.color.main.dimGrey};
    font-family: ${theme.fontFamily.main};
  `}
`;

const CloseIcon = styled(FaTimes)`
  ${({ theme }) => `
    color: ${theme.color.main.black};
  `}
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  cursor: pointer;
  outline: none;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};
  `}
`;

const SidebarWrapper = styled.div`
  ${({ theme }) => `
    color: ${theme.color.main.black};
  `}
`;
const SidebarMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(8, 70px);
  text-align: center;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      grid-template-rows: repeat(8, 60px);
    } 
  `}
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.5rem;
  list-style: none;
  transition: 1s ease-in-out;
  cursor: pointer;
  font-weight: bold;

  ${({ theme, textcolor }) => `
    color: ${theme.color.main.black};
    &.active {
      color: ${theme.color.main.roseRed};
      color: ${textcolor};
    }
  `}
`;
