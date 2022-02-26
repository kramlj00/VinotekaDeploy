import React, { useState } from "react";
import {
  Container,
  Title,
  ProductInfo,
  FirstColumn,
  SecondColumn,
  AddToCartContainer,
  Description,
  PriceLabel,
  AddToCart,
  ReviewsContainer,
  ReviewTitle,
  ReviewWrapper,
  ReviewAuthor,
  ReviewText,
  Rating,
  Seller,
} from "./WineProductElements";
import {
  Category,
  NotInStock,
  Price,
} from "../AllWineProducts/WineProductElements";

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
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container>
          <FirstColumn>
            <img src={product.image} alt={product.id} />
          </FirstColumn>
          <SecondColumn>
            <ProductInfo>
              <Title>
                {product.sort} - <Seller>{product.seller}</Seller>
              </Title>
              <Category>{product.category}</Category>
              <Description>{product.description}</Description>
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
      )}
    </div>
  );
}

export default WineProduct;
