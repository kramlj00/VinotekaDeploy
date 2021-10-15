import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  font-family: "Quicksand", sans-serif;
`;
export const FirstColumn = styled.div`
  border: 0.1rem #c0c0c0 solid;
  width: 600px;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  margin: 1rem;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }
`;
export const SecondColumn = styled.div`
  width: 50%;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;
export const ProductInfo = styled.div``;

export const PriceLabel = styled.span`
  color: #000;
  font-weight: bolder;
`;

export const Title = styled.h1``;

export const Description = styled.p`
  font-size: 24px;
  text-indent: 20px;
  line-height: 2rem;
`;

export const AddToCartContainer = styled.div`
  //background-color: yellow;
  display: flex;
  align-items: center;
  width: 600px;
`;

export const QuantityLabel = styled.span`
  font-size: 22px;
  margin-bottom: 2px;
`;

export const QtyInputContainer = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c0c0c0;
  padding-top: 2px;
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
  width: 45px;
  height: 50px;
  padding-left: 15px;
  border: 0;
  background-color: transparent;
  font-size: 25px;
  outline: none;
`;

export const QtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-weight: 700;
`;
export const AddToCart = styled.button`
  margin-left: 50px;
  margin-top: 35px;
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
  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const ReviewTitle = styled.h2``;

export const ReviewWrapper = styled.div``;

export const ReviewAuthor = styled.div``;

export const ReviewText = styled.div``;

export const Rating = styled.div``;
