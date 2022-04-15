import React, { useEffect } from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CartScreen({ props }) {
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
          <MessageBox>
            Vaša košarica je prazna. <br /> <br /> Molimo da dodate proizvode u
            košaricu prije dovršetka kupnje
            <GoShopping to="/wines">Nastavite kupovati</GoShopping>
          </MessageBox>
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

export default CartScreen;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  font-family: "Quicksand", sans-serif;
  padding: 10px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.65;

  @media screen and (max-width: 1300px) {
    flex-grow: 0.4;
  }
`;

const CartTitle = styled.h1`
  //font-family: "Dancing Script", cursive;
  margin: 20px;
  margin-left: 40px;

  @media screen and (max-width: 1300px) {
    margin-left: 10px;
  }
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-left: 40px;
  font-size: 24px;
  background-color: #fcd2e3;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1300px) {
    margin: auto;
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const GoShopping = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  width: 60%;
  margin-top: 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #e83946;
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

  @media screen and (max-width: 700px) {
    width: 70%;
  }

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }
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

  @media screen and (max-width: 680px) {
    flex: 1;
    margin: 0px;
  }
`;

const Subtotal = styled.h2`
  font-size: 25px;
  margin-bottom: 30px;
`;

const Checkout = styled.button`
  text-transform: uppercase;
  width: 100%;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #32a852;
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

  @media screen and (max-width: 680px) {
    font-size: 15px;
  }
`;
