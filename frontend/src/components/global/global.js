import styled from "styled-components";

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
