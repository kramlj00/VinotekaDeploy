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
  const [isValid, setIsValid] = useState(true);

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

  const handleOnInputChange = (event) => {
    if (event.target.value > 0 && event.target.value % 1 === 0) {
      setIsValid(true);
      setQty(parseInt(event.target.value));
    } else setIsValid(false);
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
          onChange={handleOnInputChange}
        />
        <IncreseQty onClick={incrementQty}>+</IncreseQty>
      </QtyInputContainer>
      <InStock>Na zalihama ima {product.countInStock} boca!</InStock>
    </QtyContainer>
  );
}

export default QtyComponent;
