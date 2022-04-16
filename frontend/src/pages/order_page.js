import React from "react";
import Order from "../components/Order/Order";

function OrderPage(props) {
  return <Order props={props} orderId={props.match.params.id} />;
}

export default OrderPage;
