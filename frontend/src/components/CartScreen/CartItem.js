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
    if (event.target.value > item.countInStock) {
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
                  value={isValueOutOfRange ? item.countInStock : item.qty}
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
            <TotalPrice>{(item.price * item.qty).toFixed(2)} HRK</TotalPrice>
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
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.desktop}){
      height: 150px;
      margin-left: -30px;
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

const Image = styled(Link)`
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

const QtyPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0.7;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 80vw;
    } 
  `}
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  width: 155px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      height: 85px;
      width: auto;
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
    @media(max-width: ${theme.breakpoints.tablet}){
      display: none;
    } 
  `}
`;

const UnitPrice = styled.div`
  width: 220px;
  text-align: center;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    @media(max-width: ${theme.breakpoints.tablet}){
      display: none;
    } 
  `}
`;

const TotalPrice = styled.div`
  font-weight: bold;
  width: 130px;
  text-align: end;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    @media(max-width: ${theme.breakpoints.tablet}){
      align-self: flex-end;
    } 
  `}
`;

const RemoveItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  align-self: flex-start;
  cursor: pointer;
  margin-left: 10px;

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
    background-color: ${theme.color.main.white};
    @media(max-width: ${theme.breakpoints.tablet}){
      position: absolute;
      right: 25px;
    } 
  `}
`;

const InStock = styled.div`
  margin-top: 15px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.secondary.green};
  `}
`;

const QtyInputContainer = styled.div`
  display: flex;
  width: 130px;
  justify-content: space-around;
  align-items: center;
  padding-top: 2px;

  ${({ theme }) => `
    border: 1px solid ${theme.color.secondary.productsBorderGrey};
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 110px;
    height: 45px;
    } 
  `}
`;

const DecreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  cursor: pointer;

  ${({ theme }) => `
    border-right: 1px solid ${theme.color.secondary.productsBorderGrey};
  `}
`;

const IncreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  cursor: pointer;

  ${({ theme }) => `
    border-left: 1px solid ${theme.color.secondary.productsBorderGrey};
  `}
`;

const QtyInput = styled.input`
  width: 70px;
  height: 50px;
  text-align: center;
  border: 0;
  background-color: transparent;
  outline: none;

  ${({ theme }) => `
  font-size: ${theme.fontSize.mediumLarge};
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 60px;
    } 
  `}
`;

const QtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: 220px;

  ${({ theme }) => `
    color: ${theme.color.secondary.rightsGrey};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 200px;
      align-items: flex-start;
    } 
  `}
`;
