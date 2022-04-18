import React from "react";
import Order from "../components/Order/Order";
import styled from "styled-components";

function OrderPage(props) {
  return (
    <OrderPageContainer>
      <Order props={props} />
    </OrderPageContainer>
  );
}

export default OrderPage;

const OrderPageContainer = styled.div`
  min-height: 100vh;
`;
