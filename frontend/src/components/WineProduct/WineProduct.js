import React from "react";
import {
  Container,
  ImageContainer,
  ProductInfo,
  AddToCartContainer,
} from "./WineProductElements";
import { Title, Sort, Price } from "../AllWineProducts/WineProductElements";
import data from "../../data";

function WineProduct(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  // if product does not exist
  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Container>
      <ImageContainer>
        <img src={product.image} alt={product._id} />
      </ImageContainer>
      <ProductInfo>
        <Title>{product.sort}</Title>
        <Sort>{product.category}</Sort>
        <Price>- {product.price} HRK</Price>
      </ProductInfo>
      <AddToCartContainer></AddToCartContainer>
    </Container>
  );
}

export default WineProduct;
