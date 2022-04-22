import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import Axios from "axios";

function PlaceOrder({ props }) {
  const selectedPaymentMethod = localStorage.getItem("paymentMethod");
  const [isSdkReady, setIsSdkReady] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  if (!selectedPaymentMethod) {
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
      props.history.push("/order_history");
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
        </UserInfo>
        <OrderSummary>
          <Title>Pregled narudžbe:</Title>
          <PriceContainer>
            <PriceInfoContainer>
              <Info>Osnovna cijena:</Info>
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
        <PaymentContainer>
          <Title>Plaćanje:</Title>
          <Info marginTop="20px">
            <strong>Način plaćanja:</strong> {selectedPaymentMethod}
          </Info>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {loading && <LoadingBox></LoadingBox>}
          {!isSdkReady ? (
            <LoadingBox></LoadingBox>
          ) : (
            selectedPaymentMethod === "PayPal" && (
              <PayPalButton
                amount={payPalAmount}
                onSuccess={successPaymentHandler}
              ></PayPalButton>
            )
          )}
        </PaymentContainer>
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

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 0px 10px;
    }
  `}
`;

const OrderInfoContainer = styled.section`
  display: flex;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  `}
`;

const UserInfo = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 33%;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};
    
    @media(max-width: ${theme.breakpoints.desktop}){
      width: 90%;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
      height: 350px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      height: auto;
      padding: 15px 30px;
    }
  `}
`;

const OrderSummary = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 33%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  height: 370px;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.desktop}){
      width: 90%;
      margin-left: 0px;
      margin-top: 40px;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
      height: 350px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      height: auto;
      padding: 15px 30px;
    }
  `}
`;

const PaymentContainer = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 33%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.desktop}){
      width: 90%;
      margin-left: 0px;
      margin-top: 40px;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
      height: 350px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      height: auto;
      padding: 15px 30px;
    }
  `}
`;

const Title = styled.h1`
  padding-bottom: 10px;

  ${({ theme }) => `
  font-size: ${theme.fontSize.large};
  
  @media(max-width: ${theme.breakpoints.tablet}){
    font-size: ${theme.fontSize.mediumLarge};
  }
`}
`;

const Info = styled.p`
  padding-bottom: 30px;

  &:last-child {
    padding-bottom: 0;
  }

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    }
  `}
`;

const PriceContainer = styled.div`
  margin-top: 12px;
`;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ArticlesContainer = styled.section`
  margin-top: 20px;
  width: 66%;
  position: relative;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      width: 90%;
      margin: auto;
      margin-top: 20px;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
    }
  `}
`;

const ItemsContainer = styled.div``;

const Item = styled.li`
  list-style: none;
`;

const ItemRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.desktop}){
      height: 150px;
      margin-right: 10px;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      height: 350px;
      display: flex;
      flex-direction: column;
    }
  `}
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-left: 10px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      flex-direction: column;
      padding: 0;
    }
  `}
`;

const Image = styled.div`
  display: flex;
  align-self: center;
  height: 170px;
  margin-right: 20px;
  width: 155px;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      height: 145px;
    } 
    @media(max-width: ${theme.breakpoints.tablet}){
      height: 170px;
    } 
  `}
`;

const ItemSort = styled.h2`
  text-decoration: none;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.main.black};

    @media(max-width: ${theme.breakpoints.tablet}){
      padding-top: 10px;  
      font-size: ${theme.fontSize.mediumLarger};
    } 
  `}
`;

const Price = styled.div`
  margin-right: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    @media(max-width: ${theme.breakpoints.tablet}){
      align-self: flex-end;
    } 
  `}
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      height: 85px;
    } 
  `}
`;

const ItemSeller = styled.div``;

const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.secondary.rightsGrey};
  `}
`;
