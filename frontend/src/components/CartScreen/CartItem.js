import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

function CartItem({ item }) {
  const [isValueOutOfRange, setIsValueOutOfRange] = useState(false);
  const [itemQty, setItemQty] = useState(0);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setIsValueOutOfRange(false);
  }, [itemQty]);

  const removeItemHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const handleOnInputChange = (event) => {
    if(event.target.value > item.countInStock) {
      setIsValueOutOfRange(true);
      dispatch(addToCart(item.product, item.countInStock));
      setItemQty(item.countInStock);
    } else if (event.target.value > 0 && event.target.value % 1 === 0) {
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
        <QtyPriceContainer>
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
                isValueOutOfRange ? item.countInStock : item.qty
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
        </QtyPriceContainer>
        </ItemInfoWrapper>
        <RemoveItem onClick={() => removeItemHandler(item.product)}>
          <ClearIcon />
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
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media screen and (max-width: 1300px) {
    height: 150px;
    margin-left: -30px;
    margin-right: 10px;
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

const Image = styled(Link)`
  display: flex;
  align-self: center;
  height: 170px;
  margin-right: 20px;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
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

const QtyPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0.7;

  @media screen and (max-width: 715px) {
    width: 80vw;
  }
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  width: 155px;

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
    font-size: 14px;
  }

  @media screen and (max-width: 715px) {
    display: none;
  }
`;

const UnitPrice = styled.div`
  font-size: 24px;
  width: 220px;
  text-align: center;

  @media screen and (max-width: 1000px) {
    font-size: 16px;
    width: 120px;
  }

  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  width: 100px;
  text-align: end;

  @media screen and (max-width: 1000px) {
    font-size: 22px;
  }

  @media screen and (max-width: 715px) {
    align-self: flex-end;
  }
`;

const RemoveItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  align-self: flex-start;
  background-color: #f5f6fa;
  cursor: pointer;
  margin-left: 10px;
  background-color: #ffffff;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 715px) {
    position: absolute;
    right: 25px;
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
  width: 220px;

  @media screen and (max-width: 900px) {
    width: 200px;
  }

  @media screen and (max-width: 715px) {
    align-items: flex-start;
  }
`;
