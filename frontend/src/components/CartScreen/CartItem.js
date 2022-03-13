import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const handleOnInputChange = (event) => {
    if (event.target.value > 0 && event.target.value % 1 === 0) {
      if (Number(event.target.value) <= item.countInStock)
        dispatch(addToCart(item.product, Number(event.target.value)));
    }
  };

  return (
    <Item key={item.product}>
      <ItemRow>
        <Image to={`/wines/${item.product}`}>
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
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "E") && evt.preventDefault()
                }
                onChange={handleOnInputChange}
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

const Item = styled.li``;

const ItemRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 15px;

  @media screen and (max-width: 1300px) {
    height: 150px;
    margin-left: -30px;
    margin-right: 10px;
  }

  @media screen and (max-width: 1000px) {
    justify-content: flex-start;
    height: 250px;
  }

  @media screen and (max-width: 480px) {
    margin-left: -40px;
    margin-right: 0px;
  }
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-left: 10px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    height: 220px;
  }
`;

const Image = styled(Link)`
  height: 170px;
  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }

  @media screen and (max-width: 1300px) {
    height: 145px;
  }

  @media screen and (max-width: 1000px) {
    height: 220px;
  }

  @media screen and (max-width: 600px) {
    height: 140px;
  }
`;

const ItemSort = styled.h2`
  text-decoration: none;
  color: #000;
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85px;

  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;

const ItemSeller = styled.div``;

const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 17px;
  color: #6c757d;

  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 13px;
    letter-spacing: 1px;
  }
`;

const UnitPrice = styled.div`
  font-size: 24px;

  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

const RemoveItem = styled.button`
  color: #fff;
  background-color: #d10a0a;
  text-transform: uppercase;
  padding: 10px 25px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: transform 80ms ease-in;
  margin-left: 20px;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 600px) {
    padding: 10px 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 7px 7px;
  }
`;

const InStock = styled.div`
  margin-top: 15px;
  color: #32a852;

  @media screen and (max-width: 1000px) {
    margin-top: 5px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
`;

const QtyInputContainer = styled.div`
  display: flex;
  width: 130px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c0c0c0;
  padding-top: 2px;

  @media screen and (max-width: 1000px) {
    width: 110px;
    height: 45px;
  }
`;

const DecreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-right: 1px solid #c0c0c0;
  cursor: pointer;
`;

const IncreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-left: 1px solid #c0c0c0;
  cursor: pointer;
`;

const QtyInput = styled.input`
  width: 70px;
  height: 50px;
  text-align: center;
  border: 0;
  background-color: transparent;
  font-size: 22px;
  outline: none;

  @media screen and (max-width: 1000px) {
    width: 60px;
  }
`;

const QtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }
`;
