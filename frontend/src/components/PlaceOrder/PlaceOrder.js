import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import LoadingBox from "../LoadignBox/LoadingBox";
import Axios from "axios";
import MessageBox from "../MessageBox/MessageBox";

function PlaceOrder({ props }) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 2.1234 => "2.12" => 2.12

  // calculate the price of cart items
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(30);
  cart.taxPrice = toPrice(0.24 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const payPalAmount = (cart.totalPrice / 6.98).toFixed(2);

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      // when script is downloaded to browser and is ready to use
      script.onload = () => {
        setIsSdkReady(true);
      };
      // script is added as the last child of body in html document
      document.body.appendChild(script);
    };

    if (success) {
      props.history.push("/");
      dispatch({ type: ORDER_CREATE_RESET });
    } else {
      if (!window.paypal) addPayPalScript();
      else setIsSdkReady(true);
    }
  }, [dispatch, success, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(createOrder({ ...cart, orderItems: cartItems, paymentResult }));
  };

  return (
    <ContentContainer>
      <OrderInfoContainer>
        <UserInfo>
          <Title>Kontakt podaci:</Title>
          <Info>
            <strong>Mobitel:</strong> {shippingAddress.phoneNumber} <br />
            <strong>Email:</strong> {shippingAddress.email}
          </Info>
          <Title>Podaci za dostavu:</Title>
          <Info>
            <strong>Ime:</strong> {shippingAddress.name} <br />
            <strong>Adresa:</strong> {shippingAddress.address},{" "}
            {shippingAddress.zip} {shippingAddress.city}
          </Info>
          <Title>Plaćanje:</Title>
          <Info>
            <strong>Način plaćanja:</strong> {paymentMethod}
          </Info>
          <>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            {!isSdkReady ? (
              <LoadingBox></LoadingBox>
            ) : (
              <PayPalButton
                amount={payPalAmount}
                onSuccess={successPaymentHandler}
              ></PayPalButton>
            )}
          </>
        </UserInfo>
        <OrderSummary>
          <Title>Pregled narudžbe:</Title>
          <PriceContainer>
            <PriceInfoContainer>
              <Info>Artikli:</Info>
              <Info>{cart.itemsPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>Dostava:</Info>
              <Info>{cart.shippingPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>Porez:</Info>
              <Info>{cart.taxPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>
                <strong>Ukupno:</strong>
              </Info>
              <Info>
                <strong>{cart.totalPrice.toFixed(2)} HRK</strong>
              </Info>
            </PriceInfoContainer>
          </PriceContainer>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox>{error}</MessageBox>}
        </OrderSummary>
      </OrderInfoContainer>
      <ArticlesContainer>
        <Title>Artikli:</Title>
        <ItemsContainer>
          {cartItems.map((item) => (
            <Item key={item.product}>
              <ItemRow>
                <Image>
                  <img
                    src={item.image ? item.image : "/images/vino.jpg"}
                    alt={item.product}
                  />
                </Image>
                <ItemInfoWrapper>
                  <ItemInfoContainer>
                    <ItemSort>
                      {item.sort} -<ItemSeller>{item.seller}</ItemSeller>
                    </ItemSort>
                    <ItemCategory>{item.category}</ItemCategory>
                  </ItemInfoContainer>
                  <Price>
                    {item.qty} x {item.price.toFixed(2)} HRK ={" "}
                    <strong> {(item.qty * item.price).toFixed(2)} HRK </strong>
                  </Price>
                </ItemInfoWrapper>
              </ItemRow>
            </Item>
          ))}
        </ItemsContainer>
      </ArticlesContainer>
    </ContentContainer>
  );
}

export default PlaceOrder;

const ContentContainer = styled.div`
  margin: 0px 40px;
`;

const OrderInfoContainer = styled.section`
  display: flex;
`;

const UserInfo = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 50%;
`;

const OrderSummary = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 50%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
`;

const Title = styled.h1`
  padding-bottom: 10px;
  font-size: 2em;
`;

const Info = styled.p`
  padding-bottom: 30px;
  font-size: 20px;
`;

const PriceContainer = styled.div``;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArticlesContainer = styled.section`
  margin-top: 20px;
`;

const ItemsContainer = styled.div``;

const Item = styled.li`
  list-style: none;
`;

const ItemRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media screen and (max-width: 1300px) {
    height: 150px;
  }

  @media screen and (max-width: 715px) {
    height: 350px;
    display: flex;
    flex-direction: column;
  }
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-left: 10px;

  @media screen and (max-width: 715px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Image = styled.div`
  display: flex;
  align-self: center;
  height: 170px;
  margin-right: 20px;
  width: 170px;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1300px) {
    height: 145px;
  }

  @media screen and (max-width: 1000px) {
    height: 140px;
  }

  @media screen and (max-width: 715px) {
    height: 170px;
  }
`;

const ItemSort = styled.h2`
  text-decoration: none;
  color: #000;
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }

  @media screen and (max-width: 715px) {
    padding-top: 10px;
  }
`;

const Price = styled.div`
  margin-right: 20px;
  font-size: 20px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;

  @media screen and (max-width: 1000px) {
    height: 85px;
  }
`;

const ItemSeller = styled.div``;

const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 17px;
  color: #6c757d;

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;
