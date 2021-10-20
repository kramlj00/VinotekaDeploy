import React, { useState } from "react";
import {
  QuantityLabel,
  QtyContainer,
  DecreseQty,
  QtyInput,
  IncreseQty,
  InStock,
  QtyInputContainer,
} from "./WineProductElements";

function QtyComponent({ product, qty, setQty }) {
  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
    console.log(qty);
  };

  const incrementQty = () => {
    if (product.countInStock > qty) {
      setQty(qty + 1);
    }
  };

  return (
    <QtyContainer>
      <QuantityLabel>Količina: </QuantityLabel>
      <QtyInputContainer>
        <DecreseQty onClick={decrementQty}>-</DecreseQty>
        <QtyInput
          type="number"
          value={qty > product.countInStock ? product.countInStock : qty}
          min="1"
          onChange={(event) => {
            setQty(parseInt(event.target.value));
          }}
        />
        <IncreseQty onClick={incrementQty}>+</IncreseQty>
      </QtyInputContainer>
      <InStock>Na zalihama ima {product.countInStock} boca!</InStock>
    </QtyContainer>
  );
}

export default QtyComponent;
