import React from "react";
import CheckoutSteps from "../components/order/CheckoutSteps";
import styled from "styled-components";
import ShippingAddressForm from "../components/order/ShippingAddressForm";

function ShippingAddressPage(props) {
  return (
    <ShippingContainer>
      <CheckoutSteps step1 step2 />
      <ShippingAddressForm props={props} />
    </ShippingContainer>
  );
}

export default ShippingAddressPage;

const ShippingContainer = styled.div`
  min-height: 100vh;
  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
  `}
`;
