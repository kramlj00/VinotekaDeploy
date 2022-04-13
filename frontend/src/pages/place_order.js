import React from "react";
import styled from "styled-components";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import PlaceOrder from "../components/PlaceOrder/PlaceOrder";

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
  font-family: "Quicksand", sans-serif;
`;
