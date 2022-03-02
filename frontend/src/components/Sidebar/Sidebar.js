import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";

function Sidebar({ toggle, isOpen }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  const sidebarLinks = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise-product" },
    { label: "Košarica", path: "/cart" },
  ];

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {sidebarLinks.map((navLink) => (
            <SidebarLink to={navLink.path} key={navLink.path} onClick={toggle}>
              {navLink.label}
            </SidebarLink>
          ))}
          {userInfo ? (
            <SidebarLink to="#signout" onClick={signOutHandler} textColor={"white"}>
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
