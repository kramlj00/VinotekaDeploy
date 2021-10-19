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
  InStock,
  Seller,
} from "./WineProductElements";
import {
  Category,
  NotInStock,
  Price,
} from "../AllWineProducts/WineProductElements";

import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";

function WineProduct({ loading, error, product }) {
  const [qty, setQty] = useState(1);

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
    console.log(qty);
  };

  const incrementQty = () => {
    if (product.countInStock > qty) {
      setQty(qty + 1);
      console.log(qty);
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
            <img src={product.image} alt={product._id} />
          </FirstColumn>
          <SecondColumn>
            <ProductInfo>
              <Title>
                {product.sort} - <Seller>{product.seller}</Seller>
              </Title>
              <Category>{product.category}</Category>
              <Description>{product.description}</Description>
              <Price>
                <PriceLabel>CIJENA: </PriceLabel> {product.price} HRK/L
              </Price>
            </ProductInfo>
            <AddToCartContainer>
              <QtyContainer>
                <QuantityLabel>Količina: </QuantityLabel>
                <QtyInputContainer>
                  <DecreseQty onClick={decrementQty}>-</DecreseQty>
                  <QtyInput
                    type="number"
                    value={qty > product.countInStock ? 1 : qty}
                    min="1"
                    onChange={(event) => {
                      setQty(parseInt(event.target.value));
                    }}
                  />
                  <IncreseQty onClick={incrementQty}>+</IncreseQty>
                </QtyInputContainer>
                <InStock>Na zalihama ima {product.countInStock} boca!</InStock>
              </QtyContainer>
              {product.countInStock > 0 ? (
                <AddToCart>Dodaj u košaricu</AddToCart>
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
