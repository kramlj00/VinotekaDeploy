import React, { useState } from "react";
import styled from "styled-components";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import QtyComponent from "./QtyComponent";

function WineProduct({ loading, error, product, productId, props }) {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    // changes route in react app
    if (qty) {
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Container>
            <FirstColumn>
              <Image src={product.image ? product.image : "/images/vino.jpg"} alt={product.id} />
            </FirstColumn>
            <SecondColumn>
              <ProductInfo>
                <Title>
                  {product.sort} - <Seller>{product.seller}</Seller>
                </Title>
                <Category>{product.category}</Category>
                <Description>{product.description}</Description>
                <AlcoholPercentage>
                  Postotak alkohola: <b>{product.alcoholPercentage}%</b>
                </AlcoholPercentage>
                <Year>
                  Godina proizvodnje: <b>{product.year}.</b>
                </Year>
                <Vineyards>
                  Vinogorje: <b>{product.vineyards}</b>
                </Vineyards>
                <Price>
                  <PriceLabel>CIJENA: </PriceLabel> {product.price} HRK/
                  {product.bottleSize} L
                </Price>
              </ProductInfo>
              <AddToCartContainer>
                <QtyComponent product={product} qty={qty} setQty={setQty} />
                {product.countInStock > 0 ? (
                  <AddToCart onClick={addToCartHandler}>
                    Dodaj u košaricu
                  </AddToCart>
                ) : (
                  <NotInStock>Trenutno nedostupno</NotInStock>
                )}
              </AddToCartContainer>
            </SecondColumn>
          </Container>
          <ReviewsContainer>
            <ReviewTitle>Komentari:</ReviewTitle>
            <ReviewWrapper>
              <ReviewAuthor>Kristina Ramljak</ReviewAuthor>
              <Rating>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
              </Rating>
              <ReviewText>Vino vrhunske kvalitete!</ReviewText>
            </ReviewWrapper>
          </ReviewsContainer>
        </>
      )}
    </>
  );
}

export default WineProduct;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  font-family: "Quicksand", sans-serif;

  @media screen and (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;

const FirstColumn = styled.div`
  width: 600px;
  margin: 1rem;

  @media screen and (max-width: 1000px) {
    width: 370px;
  }

  @media screen and (max-width: 670px) {
    width: 300px;
  }
`;

const Image = styled.img`
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  border: 0.1rem #c0c0c0 solid;
  border-radius: 0.5rem;
  max-width: 100%;
  max-height: 100%;
`;

const SecondColumn = styled.div`
  width: 50%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1150px) {
    width: 60%;
  }

  @media screen and (max-width: 1000px) {
    width: 80%;
  }

  @media screen and (max-width: 670px) {
    width: 90%;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceLabel = styled.span`
  color: #000;
  font-weight: bolder;
`;

const Category = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  color: #6c757d;
`;

const Title = styled.h1`
  padding-bottom: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  font-size: 24px;
  text-indent: 20px;
  padding-bottom: 20px;
  padding-top: 20px;

  @media screen and (max-width: 1150px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

const AlcoholPercentage = styled.p`
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

const Year = styled.p`
  font-size: 20px;
  padding-top: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

const Vineyards = styled.p`
  font-size: 20px;
  padding-bottom: 30px;
  padding-top: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #6c757d;
`;

const NotInStock = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 22px;
  color: #e83946;
  font-weight: bold;
`;

const AddToCartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  margin-top: 25px;

  @media screen and (max-width: 670px) {
    width: 400px;
  }

  @media screen and (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const AddToCart = styled.button`
  margin-left: 50px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  background-color: #e83946;
  color: #fff;
  border-color: #e83946;
  border: none;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;

  &:hover {
    background-color: #fcd2e3;
    color: #e83946;
    border: 2px solid #e83946;
    transform: scale(1.05);
    transition: all 0.5s ease-out;
  }

  @media screen and (max-width: 670px) {
    padding: 12px 35px;
    font-size: 14px;
  }

  @media screen and (max-width: 420px) {
    margin-left: 0px;
    margin-top: 20px;
    width: 100%;
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 30px;
  font-family: "Quicksand", sans-serif;
`;

const ReviewTitle = styled.h2``;

const ReviewWrapper = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c0c0c0;
`;

const ReviewAuthor = styled.div`
  color: #6c757d;
  font-size: 18px;
  padding-bottom: 5px;
`;

const ReviewText = styled.div``;

const Rating = styled.div`
  span {
    color: #f0c040;
    margin: 0.1rem;
  }
`;

const Seller = styled.a`
  text-decoration: none;
  &:hover {
    color: #32a852;
    cursor: pointer;
    transition: color 0.3s ease-out;
  }
`;
