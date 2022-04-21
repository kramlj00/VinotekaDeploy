import React from "react";
import OrderDetails from "../components/order/OrderDetails";
import styled from "styled-components";

function OrderPage(props) {
  return (
    <OrderPageContainer>
      <OrderDetails props={props} />
    </OrderPageContainer>
  );
}

export default OrderPage;

const OrderPageContainer = styled.div`
  min-height: 100vh;
`;
