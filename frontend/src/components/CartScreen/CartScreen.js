import React, { useEffect } from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  CartWrapper,
  CartTitle,
  MessageBox,
  ItemsList,
  Item,
  ItemRow,
  Image,
  ItemSort,
  ItemInfoContainer,
  ItemSeller,
  ItemCategory,
  UnitPrice,
  TotalPrice,
  RemoveItem,
  SecondColumn,
  Subtotal,
  Checkout,
  GoShopping,
} from "./CartScreenElements";
import {
  QtyInputContainer,
  QtyInput,
  DecreseQty,
  IncreseQty,
  InStock,
  QtyContainer,
} from "../WineProduct/WineProductElements";

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

  const removeItemHandler = (id) => {
    // delete action
  };

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
            <GoShopping>Nastavite kupovati</GoShopping>
          </MessageBox>
        ) : (
          <ItemsList>
            {cartItems.map((item) => (
              <Item key={item.product}>
                <ItemRow>
                  <Image to={`/wine/${item.product}`}>
                    <img src={item.image} alt={item.product} />
                  </Image>
                  <ItemInfoContainer>
                    <ItemSort>
                      {item.sort} -<ItemSeller>{item.seller}</ItemSeller>
                    </ItemSort>
                    <ItemCategory>{item.category}</ItemCategory>
                  </ItemInfoContainer>
                  <QtyContainer>
                    <QtyInputContainer>
                      <DecreseQty
                        onClick={() => {
                          if (item.qty > 1) {
                            dispatch(addToCart(item.product, item.qty - 1));
                          }
                        }}
                      >
                        -
                      </DecreseQty>
                      <QtyInput
                        type="number"
                        min="1"
                        value={
                          item.qty > item.countInStock
                            ? item.countInStock
                            : item.qty
                        }
                        onChange={(event) => {
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          );
                        }}
                      />
                      <IncreseQty
                        onClick={() => {
                          if (item.qty < item.countInStock) {
                            dispatch(addToCart(item.product, item.qty + 1));
                          }
                        }}
                      >
                        +
                      </IncreseQty>
                    </QtyInputContainer>
                    <InStock>Na zalihama ima {item.countInStock} boca!</InStock>
                  </QtyContainer>
                  <UnitPrice>
                    {item.price} HRK/{item.bottleSize} L
                  </UnitPrice>
                  <TotalPrice>{item.price * item.qty} HRK</TotalPrice>
                  <RemoveItem onClick={() => removeItemHandler(item.product)}>
                    Ukloni
                  </RemoveItem>
                </ItemRow>
              </Item>
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
