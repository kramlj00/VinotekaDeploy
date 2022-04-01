import React, { useEffect, useState } from "react";
import styled from "styled-components";

function QtyComponent({ product, qty, setQty }) {
  const [isValueOutOfRange, setIsValueOutOfRange] = useState(false);

  useEffect(() => {
    setIsValueOutOfRange(false);
  }, [qty]);

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const incrementQty = () => {
    if (product.countInStock > qty) {
      setQty(qty + 1);
    }
  };

  const handleOnInputChange = (event) => {
    if (event.target.value > 0 && event.target.value % 1 === 0 && event.target.value < product.countInStock) {
      setQty(parseInt(event.target.value));
    }
    if(event.target.value > product.countInStock) {
      setIsValueOutOfRange(true);
    }
  };

  return (
    <QtyContainer>
      <QuantityLabel>Količina: </QuantityLabel>
      <QtyInputContainer>
        <DecreseQty onClick={decrementQty}>-</DecreseQty>
        <QtyInput
          type="number"
          value={isValueOutOfRange ? product.countInStock : qty}
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

const InStock = styled.div`
  margin-top: 15px;
  color: #32a852;

  @media screen and (max-width: 1000px) {
    margin-top: 5px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
`;

const QuantityLabel = styled.span`
  font-size: 22px;
  margin-bottom: 2px;

  @media screen and (max-width: 670px) {
    font-size: 19px;
  }
`;

const QtyInputContainer = styled.div`
  display: flex;
  width: 130px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c0c0c0;
  padding-top: 2px;

  @media screen and (max-width: 1000px) {
    width: 110px;
    height: 45px;
  }
`;

const DecreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-right: 1px solid #c0c0c0;
  cursor: pointer;
`;

const IncreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-left: 1px solid #c0c0c0;
  cursor: pointer;
`;

const QtyInput = styled.input`
  width: 70px;
  height: 50px;
  text-align: center;
  border: 0;
  background-color: transparent;
  font-size: 22px;
  outline: none;

  @media screen and (max-width: 1000px) {
    width: 60px;
  }
`;

const QtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }
`;
