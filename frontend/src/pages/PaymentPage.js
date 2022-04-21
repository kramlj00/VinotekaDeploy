import React from "react";
import styled from "styled-components";
import CheckoutSteps from "../components/order/CheckoutSteps";
import PaymentForm from "../components/order/PaymentForm";

function PaymentPage(props) {
  return (
    <PaymentPageContainer>
      <CheckoutSteps step1 step2 step3 />
      <PaymentForm props={props} />
    </PaymentPageContainer>
  );
}

export default PaymentPage;

const PaymentPageContainer = styled.div`
  height: 120vh;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
  `}
`;
