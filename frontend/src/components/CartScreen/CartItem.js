import React from "react";
import {
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
  ItemInfoWrapper,
} from "./CartScreenElements";
import {
  QtyInputContainer,
  QtyInput,
  DecreseQty,
  IncreseQty,
  InStock,
  QtyContainer,
} from "../WineProduct/WineProductElements";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  return (
    <Item key={item.product}>
      <ItemRow>
        <Image to={`/wine/${item.product}`}>
          <img src={item.image} alt={item.product} />
        </Image>
        <ItemInfoWrapper>
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
                  item.qty > item.countInStock ? item.countInStock : item.qty
                }
                onChange={(event) => {
                  if (Number(event.target.value) < item.countInStock)
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
        </ItemInfoWrapper>
        <RemoveItem onClick={() => removeItemHandler(item.product)}>
          Ukloni
        </RemoveItem>
      </ItemRow>
    </Item>
  );
}

export default CartItem;
