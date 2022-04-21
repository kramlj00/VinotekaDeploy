import styled from "styled-components";

export const SelectBtn = styled.button`
  border-radius: 20px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${(props) => `
    font-size: ${props.theme.fontSize.mediumSmall};
    background-color: ${
      props.ghost ? "transparent" : props.theme.color.main.roseRed
    };
    border: 1px solid ${
      props.ghost ? "#ffffff" : props.theme.color.main.roseRed
    };
    color: ${props.theme.color.main.white};
    margin-top: ${props.hasMarginTop ? "15px" : ""};
    width: ${props.width ? props.width : ""};

    @media screen and (max-width: 900px) {
      background-color: ${props.color ? props.color : ""};
      border-color: ${props.color ? props.color : ""};
    }
  `}
`;

export const BackIconContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  align-self: flex-start;
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;

  ${({ theme, isRightActive }) => `
    margin-left: ${isRightActive ? "20px" : ""};
    margin-bottom: ${isRightActive ? "20px" : ""};
    color: ${theme.color.main.roseRed};
    border: 1px solid ${theme.color.main.roseRed};

    @media(max-width: ${theme.breakpoints.mobile}){
      margin-top: ${isRightActive ? "50px" : ""};
    } 
  `}
`;

export const Input = styled.input`
  border: none;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;

  ${({ hasMarginRight, theme }) => `
    font-family: ${theme.fontFamily.main};
    background-color: ${theme.color.secondary.lightGrey};
    margin-right: ${hasMarginRight ? "20px" : "0px"};

    @media(max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.fontSize.mediumSmall};
      padding-left: 8px;
      margin-right: 0px;
    }
  `}
`;
