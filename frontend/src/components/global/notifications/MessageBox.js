import React from "react";
import styled from "styled-components";

function MessageBox(props) {
  return (
    <MessageContainer
      width={props.width}
      className={`alert alert-${props.variant || "info"}`}
    >
      {props.children}
    </MessageContainer>
  );
}

export default MessageBox;

const MessageContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &.alert {
    padding: 12px;
    border: 0.1rem solid transparent;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  &.alert-info {
    color: #004a14;
    background-color: #c7ffd6;
  }

  &.alert-danger {
    color: #a02020;
    background-color: #ffe0e0e0;
  }

  ${({ theme, width }) => `
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.mediumLarger};
    width: ${width};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    } 
  `}
`;
