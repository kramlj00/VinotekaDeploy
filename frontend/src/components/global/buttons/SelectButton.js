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
