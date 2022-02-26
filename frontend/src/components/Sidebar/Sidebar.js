import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";

function Sidebar({ toggle, isOpen }) {
  const sidebarLinks = [
    { label: "Ponuda vina", path: "/wines" },
    { label: "Oglasi proizvod", path: "/advertise-product" },
    { label: "Prijava", path: "/sign-in" },
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
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
