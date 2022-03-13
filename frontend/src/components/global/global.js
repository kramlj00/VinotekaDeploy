import styled from "styled-components";

export const SelectBtn = styled.button`
  border-radius: 20px;
  border: 1px solid #e83946;
  background-color: #e83946;
  color: #ffffff;
  font-size: 12px;
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
    background-color: ${props.ghost ? "transparent" : ""};
    border-color: ${props.ghost ? "#ffffff" : ""};

    @media screen and (max-width: 900px) {
      background-color: ${props.color ? props.color : ""};
      border-color: ${props.color ? props.color : ""};
    }
  `}
`;

export const BackIconContainer = styled.div`
  display: flex;
  padding: 2px;
  color: #e83946;
  cursor: pointer;
  border: 1px solid #e83946;
  border-radius: 50%;
  align-self: flex-start;
  display: ${(props) => props.display};
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;

  ${({ hasMarginRight }) => `
    margin-right: ${hasMarginRight ? "20px" : "0px"};
`}
`;
