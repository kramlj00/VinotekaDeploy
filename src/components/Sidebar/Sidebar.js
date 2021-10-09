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
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/wines" onClick={toggle}>
            Ponuda vina
          </SidebarLink>
          <SidebarLink to="/grapes" onClick={toggle}>
            Ponuda grožđa
          </SidebarLink>
          <SidebarLink to="/advertise-product" onClick={toggle}>
            Oglasi proizvod
          </SidebarLink>
          <SidebarLink to="/sign-in" onClick={toggle}>
            Prijava
          </SidebarLink>
          <SidebarLink to="/cart" onClick={toggle}>
            Košarica
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
