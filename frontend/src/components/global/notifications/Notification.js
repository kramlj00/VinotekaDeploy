import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

function NotificationBox(props) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDisplay("none");
    }, 2500);
  }, []);

  return (
    <Wrapper>
      <NotificationContainer
        width={props.width}
        className={`alert alert-${props.variant || "info"}`}
        display={display}
        onClick={() => setDisplay("none")}
      >
        {props.children}
      </NotificationContainer>
    </Wrapper>
  );
}

export default NotificationBox;

const fadeOut = keyframes`
  0% {opacity: 1;}
  50% {opacity: 1;}
  60% {opacity: 0.7;}
  100% {opacity: 0;} 
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  margin: auto;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  min-width: fit-content;
  cursor: pointer;
`

const NotificationContainer = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${fadeOut};
  animation-duration: 3s;
  z-index: 99;

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

  ${({ theme, width, display }) => `
  display: ${display};
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.mediumLarger};
    width: ${width};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    } 
  `}
`;
