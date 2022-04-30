import styled from "styled-components";

export const ActionBtn = styled.button`
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 10px;
  background-color: transparent;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-left: ${({ marginLeft }) => marginLeft};
  border: none;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${({ theme, deleteBtn, editBtn, infoBtn }) => `
  background-color: ${deleteBtn ? theme.color.main.roseRed : ""};
  background-color: ${editBtn ? theme.color.secondary.yellow : ""};
  background-color: ${infoBtn ? theme.color.secondary.blue : ""};
  color: white;
`}
`;
