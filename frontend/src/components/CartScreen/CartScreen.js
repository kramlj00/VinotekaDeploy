import React, { useEffect } from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  CartWrapper,
  CartTitle,
  MessageBox,
  ItemsList,
  SecondColumn,
  Subtotal,
  Checkout,
  GoShopping,
} from "./CartScreenElements";
import CartItem from "./CartItem";

function CartScreen({ props }) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    // after signin user should be redirect to shipping
    props.history.push("/sign_in?redirect=shipping");
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
          Ukupno: {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} HRK
        </Subtotal>
        <Checkout onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Nastavite do blagajne
        </Checkout>
      </SecondColumn>
    </Container>
  );
}

export default CartScreen;
