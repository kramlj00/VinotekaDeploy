import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { savePaymentMethod } from "../../actions/cartActions";
import { SelectBtn } from "../global/global";

function PaymentForm({ props }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <Form>
      <Title>Plaćanje</Title>
      <InputWrapper>
        <Input
          type="radio"
          id="paypal"
          value="PayPal"
          name="paymentMethod"
          required
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Label htmlFor="paypal">PayPal</Label>
      </InputWrapper>
      <InputWrapper>
        <Input
          type="radio"
          id="stripe"
          value="Stripe"
          name="paymentMethod"
          required
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Label htmlFor="stripe">Stripe</Label>
      </InputWrapper>
      <BtnContainer>
        <SelectBtn onClick={handleSubmit}>Nastavak</SelectBtn>
      </BtnContainer>
    </Form>
  );
}

export default PaymentForm;

const Form = styled.form`
  width: 50%;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Title = styled.h1`
  padding-bottom: 20px;
`;

const Label = styled.label``;

const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 1;
  justify-content: center;
`;
