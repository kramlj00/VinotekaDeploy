import React from "react";
import styled from "styled-components";

function CheckoutSteps(props) {
  return (
    <CheckoutStepsContainer>
      <CheckoutStep
        color={props.step1 ? "#b8001f" : "#c0c0c0"}
        borderTopColor={props.step1 ? "#b8001f" : "#c0c0c0"}
      >
        Prijava
      </CheckoutStep>
      <CheckoutStep
        color={props.step2 ? "#b8001f" : "#c0c0c0"}
        borderTopColor={props.step2 ? "#b8001f" : "#c0c0c0"}
      >
        Podaci za dostavu
      </CheckoutStep>
      <CheckoutStep
        color={props.step3 ? "#b8001f" : "#c0c0c0"}
        borderTopColor={props.step3 ? "#b8001f" : "#c0c0c0"}
      >
        Način plaćanja
      </CheckoutStep>
      <CheckoutStep
        color={props.step4 ? "#b8001f" : "#c0c0c0"}
        borderTopColor={props.step4 ? "#b8001f" : "#c0c0c0"}
      >
        Dovršavanje narudžbe
      </CheckoutStep>
    </CheckoutStepsContainer>
  );
}

export default CheckoutSteps;

const CheckoutStepsContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  padding-top: 50px;
  margin: 0px 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 850px) {
    font-size: 15px;
  }
`;

const CheckoutStep = styled.div`
  border-top: 0.3rem #c0c0c0 solid;
  flex: 1;
  padding-top: 10px;

  color: ${(props) => props.color};
  border-top-color: ${(props) => props.borderTopColor};
`;
