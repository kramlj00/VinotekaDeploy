import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5 rem cals((100vw - 1000px) / 2);
  z-index: 10;
  margin-bottom: -1px;
  border-bottom: 1px solid gray;
`;

export const NavLogo = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 25px;
  padding-left: 1rem;
  color: #b8001f;
`;

export const Logotitle = styled.h1``;

export const NavLink = styled(Link)`
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

export const MobileIcon = styled.div`
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

export const Bars = styled(FaBars)``;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavCartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const CartCount = styled.div`
  font-weight: 700;
  padding-left: 4px;
`;
