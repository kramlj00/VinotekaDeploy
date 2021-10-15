import React from "react";
import {
  Container,
  Title,
  ProductInfo,
  FirstColumn,
  SecondColumn,
  AddToCartContainer,
  Description,
  PriceLabel,
  QuantityLabel,
  AddToCart,
  QtyContainer,
  DecreseQty,
  QtyInput,
  IncreseQty,
  QtyInputContainer,
  ReviewsContainer,
  ReviewTitle,
  ReviewWrapper,
  ReviewAuthor,
  ReviewText,
  Rating,
} from "./WineProductElements";
import { Sort, Price } from "../AllWineProducts/WineProductElements";

function WineProduct({ product }) {
  return (
    <Container>
      <FirstColumn>
        <img src={product.image} alt={product._id} />
      </FirstColumn>
      <SecondColumn>
        <ProductInfo>
          <Title>{product.sort}</Title>
          <Sort>{product.category}</Sort>
          <Description>{product.description}</Description>
          <Price>
            <PriceLabel>CIJENA: </PriceLabel> {product.price} HRK/L
          </Price>
        </ProductInfo>
        <AddToCartContainer>
          <QtyContainer>
            <QuantityLabel>Količina: </QuantityLabel>
            <QtyInputContainer>
              <DecreseQty>-</DecreseQty>
              <QtyInput type="number" defaultValue="1" />
              <IncreseQty>+</IncreseQty>
            </QtyInputContainer>
          </QtyContainer>
          <AddToCart>Dodaj u košaricu</AddToCart>
        </AddToCartContainer>
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
      </SecondColumn>
    </Container>
  );
}

export default WineProduct;
