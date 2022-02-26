import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  font-family: "Quicksand", sans-serif;

  @media screen and (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;

export const FirstColumn = styled.div`
  width: 600px;
  margin: 1rem;

  @media screen and (max-width: 1000px) {
    width: 370px;
  }

  @media screen and (max-width: 670px) {
    width: 300px;
  }
`;

export const Image = styled.img`
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  border: 0.1rem #c0c0c0 solid;
  border-radius: 0.5rem;
  max-width: 100%;
  max-height: 100%;
`;

export const SecondColumn = styled.div`
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

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PriceLabel = styled.span`
  color: #000;
  font-weight: bolder;
`;

export const Title = styled.h1`
  padding-bottom: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 30px;
  }
`;

export const Description = styled.p`
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

export const InStock = styled.div`
  margin-top: 15px;
  color: #32a852;

  @media screen and (max-width: 1000px) {
    margin-top: 5px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
`;

export const AddToCartContainer = styled.div`
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

export const QuantityLabel = styled.span`
  font-size: 22px;
  margin-bottom: 2px;

  @media screen and (max-width: 670px) {
    font-size: 19px;
  }
`;

export const QtyInputContainer = styled.div`
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

export const DecreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-right: 1px solid #c0c0c0;
  cursor: pointer;
`;

export const IncreseQty = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  font-size: 28px;
  border-left: 1px solid #c0c0c0;
  cursor: pointer;
`;

export const QtyInput = styled.input`
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

export const QtyContainer = styled.div`
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

export const AddToCart = styled.button`
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
  margin-top: 50px;
`;

export const ReviewTitle = styled.h2``;

export const ReviewWrapper = styled.div`
  margin-top: 10px;
  //background-color: yellow;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #6c757d;
`;

export const ReviewAuthor = styled.div`
  color: #6c757d;
  font-size: 18px;
  padding-bottom: 5px;
`;

export const ReviewText = styled.div``;

export const Rating = styled.div`
  span {
    color: #f0c040;
    margin: 0.1rem;
  }
`;

export const Seller = styled.a`
  text-decoration: none;
  &:hover {
    color: #32a852;
    cursor: pointer;
    transition: color 0.3s ease-out;
  }
`;
