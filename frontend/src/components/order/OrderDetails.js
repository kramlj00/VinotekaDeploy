import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../../actions/orderActions";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { Link } from "react-router-dom";

function OrderDetails({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) props.history.push("/sign-in");

  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : order.message ? (
    <MessageBox variant="info">{order.message}</MessageBox>
  ) : (
    <ContentContainer>
      <Title>Narudžba: {order.orderDetails.id}</Title>
      <OrderInfoContainer>
        <UserInfo>
          <Title>Kontakt podaci:</Title>
          <Info>
            <strong>Mobitel:</strong> {order.orderShippingAddress.phoneNumber}{" "}
            <br />
            <strong>Email:</strong> {order.orderShippingAddress.email}
          </Info>
          <Title>Podaci za dostavu:</Title>
          <Info>
            <strong>Ime:</strong> {order.orderShippingAddress.name} <br />
            <strong>Adresa:</strong> {order.orderShippingAddress.address},{" "}
            {order.orderShippingAddress.zip} {order.orderShippingAddress.city}
          </Info>
          <Title>Plaćanje:</Title>
          <Info>
            <strong>Način plaćanja:</strong> {order.orderDetails.payment_method}
          </Info>
        </UserInfo>
        <OrderSummary>
          <Title>Pregled narudžbe:</Title>
          <PriceContainer>
            <PriceInfoContainer>
              <Info>Osnovna cijena:</Info>
              <Info>{order.orderPrices.itemsPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>Dostava:</Info>
              <Info>{order.orderPrices.shippingPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>Porez:</Info>
              <Info>{order.orderPrices.taxPrice.toFixed(2)} HRK</Info>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <Info>
                <strong>Ukupno:</strong>
              </Info>
              <Info>
                <strong>{order.orderPrices.totalPrice.toFixed(2)} HRK</strong>
              </Info>
            </PriceInfoContainer>
          </PriceContainer>
        </OrderSummary>
      </OrderInfoContainer>
      <ArticlesContainer>
        <Title>Artikli:</Title>
        <ItemsContainer>
          {order.orderItems.map((item) => (
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
                  <Price>
                    {item.qty} x {item.price} HRK ={" "}
                    <strong> {item.qty * item.price} HRK </strong>
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

export default OrderDetails;

const ContentContainer = styled.div`
  margin: 20px 40px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 10px;
    } 
  `}
`;

const OrderInfoContainer = styled.section`
  display: flex;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    @media(max-width: ${theme.breakpoints.tablet}){
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
  width: 50%;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      padding: 15px 30px;
    } 
  `}
`;

const OrderSummary = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 25px 40px;
  border-radius: 10px;
  width: 50%;
  margin-left: 40px;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 100%;
      margin-left: 0;
      margin-top: 40px;
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
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

const ArticlesContainer = styled.section`
  margin-top: 20px;
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
