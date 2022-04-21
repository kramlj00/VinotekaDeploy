import React, { useEffect } from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Cart({ props }) {
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

  const checkoutHandler = () => {
    // after signin user should be redirect to shipping
    // props.history.push("/sign_in?redirect=shipping");
    props.history.push("/shipping");
  };

  return (
    <Container>
      <CartWrapper>
        <CartTitle>Vaša košarica</CartTitle>
        {cartItems.length === 0 ? (
          <EmptyCartMessage>
            Vaša košarica je prazna. <br /> <br /> Molimo da dodate proizvode u
            košaricu prije dovršetka kupnje
            <GoShopping to="/wines">Nastavite kupovati</GoShopping>
          </EmptyCartMessage>
        ) : (
          <ItemsList>
            {cartItems.map((item) => (
              <CartItem key={item.product} item={item} />
            ))}
          </ItemsList>
        )}
      </CartWrapper>
      <SecondColumn>
        <Subtotal>
          Ukupno:{" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} HRK
        </Subtotal>
        <Checkout onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Nastavite do blagajne
        </Checkout>
      </SecondColumn>
    </Container>
  );
}

export default Cart;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  padding: 10px;
  justify-content: space-between;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.desktop}){
      flex-direction: column;
      justify-content: flex-start;
    } 
  `}
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.65;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      flex-grow: 0.4;
    } 
  `}
`;

const CartTitle = styled.h1`
  margin: 20px;
  margin-left: 40px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};
    
    @media(max-width: ${theme.breakpoints.desktop}){
      margin-left: 10px;
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarge};
    } 
  `}
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-left: 40px;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  ${({ theme }) => `
    background-color: ${theme.color.secondary.lightPink};
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.desktop}){
      margin: auto;
      width: 95%;
    } 
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
  width: 60%;
  margin-top: 30px;
  border-radius: 20px;
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
    background-color: ${theme.color.main.roseRed};
    color: ${theme.color.main.white};
    font-size: ${theme.fontSize.medium};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 60%;
      padding: 10px 40px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
      font-size: ${theme.fontSize.mediumSmall};
      padding: 9px 35px;
    }
  `}
`;

const ItemsList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 150px;
  padding: 20px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      flex: 1;
      margin: 0px;
    }
  `}
`;

const Subtotal = styled.h2`
  margin-bottom: 30px;

  ${({ theme }) => `
   font-size: ${theme.fontSize.mediumLarge};
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
