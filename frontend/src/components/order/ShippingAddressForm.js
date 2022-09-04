import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../global/global";
import { SelectBtn } from "../global/buttons/SelectButton";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";

function ShippingAddressForm({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) props.history.push("/sign-in");

  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zip, setZip] = useState(shippingAddress.zip);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [email, setEmail] = useState(shippingAddress.email);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const [isZipValid, setIsZipValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isNameValid &&
      isAddressValid &&
      isCityValid &&
      isZipValid &&
      isEmailValid &&
      phoneNumber
    ) {
      dispatch(
        saveShippingAddress({ name, address, city, zip, phoneNumber, email })
      );
      props.history.push("/payment");
    }
  };

  const handleTextChange = (value, setValue, setIsValueValid) => {
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value)) {
      setValue(value);
    }
    value && value.length >= 3 ? setIsValueValid(true) : setIsValueValid(false);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    value && value.length > 3
      ? setIsAddressValid(true)
      : setIsAddressValid(false);
  };

  const handleZipChange = (value) => {
    if (/^[0-9]*$/.test(value)) setZip(value);
    value.length < 5 ? setIsZipValid(false) : setIsZipValid(true);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Adresa za dostavu</Title>
      <Label htmlFor="name">Ime i prezime</Label>
      <Input
        type="text"
        id="name"
        value={name}
        placeholder="Ime i prezime"
        required
        onChange={(e) =>
          handleTextChange(e.target.value, setName, setIsNameValid)
        }
      />
      <ErrorMessage
        hasPadding
        visibility={name && name.length < 3 ? "visible" : "hidden"}
      >
        * Ime mora imati barem 3 slova!
      </ErrorMessage>
      <Label htmlFor="address">Adresa za dostavu</Label>
      <Input
        type="text"
        id="address"
        value={address}
        placeholder="Adresa za dostavu"
        required
        onChange={(e) => handleAddressChange(e.target.value)}
      />
      <ErrorMessage
        hasPadding
        visibility={address && address.length < 3 ? "visible" : "hidden"}
      >
        * Adresa mora imati barem 3 slova!
      </ErrorMessage>
      <Label htmlFor="city">Grad</Label>
      <Input
        type="text"
        id="city"
        value={city}
        placeholder="Grad"
        required
        onChange={(e) =>
          handleTextChange(e.target.value, setCity, setIsCityValid)
        }
      />
      <ErrorMessage
        hasPadding
        visibility={city && city.length < 3 ? "visible" : "hidden"}
      >
        * Grad mora imati barem 3 slova!
      </ErrorMessage>
      <Label htmlFor="zip">Poštanski broj</Label>
      <Input
        type="text"
        id="zip"
        value={zip}
        maxLength={5}
        placeholder="Poštanski broj"
        required
        onChange={(e) => handleZipChange(e.target.value)}
      />
      <ErrorMessage
        hasPadding
        visibility={zip && !isZipValid ? "visible" : "hidden"}
      >
        * Krivi unos!
      </ErrorMessage>
      <Label htmlFor="email">Email adresa</Label>
      <Input
        type="text"
        id="email"
        value={email}
        placeholder="Email"
        required
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <ErrorMessage
        hasPadding
        visibility={!isEmailValid && email ? "visible" : "hidden"}
      >
        * Email nije validan!
      </ErrorMessage>
      <Label htmlFor="phone_number">Broj mobitela</Label>
      <Input
        type="text"
        id="phone_number"
        value={phoneNumber}
        maxLength={20}
        placeholder="Broj mobitela"
        required
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <BtnContainer>
        <SelectBtn type="submit">Nastavak do plaćanja</SelectBtn>
      </BtnContainer>
    </Form>
  );
}

export default ShippingAddressForm;

const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Form = styled.form`
  width: 50%;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 70%;
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
      padding: 15px 30px;
    } 
  `}
`;

const Title = styled.h1`
  padding-bottom: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarge};
    } 
  `}
`;

const Label = styled.label``;
