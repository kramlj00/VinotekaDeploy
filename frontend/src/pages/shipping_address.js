import React from "react";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import styled from "styled-components";
import ShippingAddressForm from "../components/ShippingAddressForm/ShippingAddressForm";

function ShippingAddressPage() {
  return (
    <ShippingContainer>
      <CheckoutSteps step1 step2 />
      <ShippingAddressForm />
    </ShippingContainer>
  );
}

export default ShippingAddressPage;

const ShippingContainer = styled.div`
  height: 120vh;
  font-family: "Quicksand", sans-serif;
`;
