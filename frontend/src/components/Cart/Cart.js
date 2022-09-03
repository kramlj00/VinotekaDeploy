import React, { useEffect, useState } from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getProductsWithExceededQty } from "../../api/api";
import NotificationBox from "../global/notifications/Notification";

function Cart({ props }) {
  const [showQtyExceeded, setShowQtyExceeded] = useState(false);
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    props.history.push("/cart");
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = async () => {
    // after signin user should be redirect to shipping
    // props.history.push("/sign_in?redirect=shipping");
    const products = await getProductsWithExceededQty(cartItems);
    if (!products.every(element => element === null)) setShowQtyExceeded(true);
    else props.history.push("/shipping");
  };

  const toPrice = (num) => Number(num.toFixed(2)); // 2.1234 => "2.12" => 2.12

  const cartItemsPrice = toPrice(
    cartItems.reduce((a, c) => a + c.price * c.qty, 0)
  );
  const shippingPrice = cartItemsPrice > 300 ? toPrice(0) : toPrice(30);
  const taxPrice = toPrice(0.24 * cartItemsPrice);
  const totalPrice = cartItemsPrice + shippingPrice + taxPrice;

  return (
    <>
      {showQtyExceeded && <NotificationBox variant="danger">Količina artikla premašena!</NotificationBox>}
      {cartItems.length === 0 ? (
        <MessageContainer>
          <EmptyCartMessage>
            Vaša košarica je prazna. <br /> <br /> Molimo da dodate proizvode u
            košaricu prije dovršetka kupnje
            <GoShopping to="/wines">Započnite kupovinu</GoShopping>
          </EmptyCartMessage>
        </MessageContainer>
      ) : (
        <Container>
          <CartWrapper>
            <CartTitle>Vaša košarica</CartTitle>
            <ItemsList>
              {cartItems.map((item) => (
                <CartItem key={item.product} item={item} />
              ))}
            </ItemsList>
          </CartWrapper>
          <>
            <SecondColumn>
              <Title>Pregled narudžbe:</Title>
              <PriceContainer>
                <PriceInfoContainer>
                  <Info>Osnovna cijena:</Info>
                  <Info>{cartItemsPrice.toFixed(2)} HRK</Info>
                </PriceInfoContainer>
                <PriceInfoContainer>
                  <Info>Dostava:</Info>
                  <Info>{shippingPrice.toFixed(2)} HRK</Info>
                </PriceInfoContainer>
                <PriceInfoContainer>
                  <Info>Porez:</Info>
                  <Info>{taxPrice.toFixed(2)} HRK</Info>
                </PriceInfoContainer>
                <PriceInfoContainer>
                  <Info>
                    <strong>Ukupno:</strong>
                  </Info>
                  <Info>
                    <strong>{totalPrice.toFixed(2)} HRK</strong>
                  </Info>
                </PriceInfoContainer>
              </PriceContainer>
              <Checkout
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Nastavite do blagajne
              </Checkout>
            </SecondColumn>
          </>
        </Container>
      )}
    </>
  );
}

export default Cart;

const Title = styled.h1`
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
  margin-top: 40px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      margin-top: 20px;
    }
  `}
`;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MessageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0px 2rem;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 0px 1rem;
    }
  `}
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  flex-wrap: wrap;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.desktop}){
      flex-direction: column;
      justify-content: flex-start;
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 1rem;
    } 
  `}
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.3;
`;

const CartTitle = styled.h1`
  margin-bottom: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};
    
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarge};
    } 
  `}
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  height: 200px;
  margin-top: 20px;
  align-items: center;

  ${({ theme }) => `
    background-color: ${theme.color.secondary.lightPink};
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    }
  `}
`;

const GoShopping = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  width: 40%;
  margin-top: 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  transition: transform 80ms ease-in;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }

  ${({ theme }) => `
    color: ${theme.color.main.white};
    background-color: ${theme.color.main.roseRed};
    font-size: ${theme.fontSize.medium};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 60%;
      padding: 10px 40px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 80%;
      font-size: ${theme.fontSize.mediumSmall};
      padding: 9px 35px;
    }
  `}
`;

const ItemsList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-inline-start: 0px;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 25px 40px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 60px;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};
    @media(max-width: ${theme.breakpoints.desktop}){
      margin-left: 0px;
      justify-content: space-between;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      flex: 1;
    }
  `}
`;

const Checkout = styled.button`
  text-transform: uppercase;
  width: 100%;
  border-radius: 20px;
  font-weight: bold;
  padding: 14px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  transition: transform 80ms ease-in;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.main.white};
    background-color: ${theme.color.secondary.green};

    @media(max-width: ${theme.breakpoints.desktop}){
      width: 60%;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      padding: 10px 40px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
      font-size: ${theme.fontSize.mediumSmall};
      padding: 11px 35px;
    }
  `}
`;
