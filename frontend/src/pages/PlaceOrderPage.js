import React from "react";
import styled from "styled-components";
import CheckoutSteps from "../components/order/CheckoutSteps";
import PlaceOrder from "../components/order/PlaceOrder";

function PlaceOrderPage(props) {
  return (
    <PlaceOrderContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <PlaceOrder props={props} />
    </PlaceOrderContainer>
  );
}

export default PlaceOrderPage;

const PlaceOrderContainer = styled.div`
  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
  `}
`;
