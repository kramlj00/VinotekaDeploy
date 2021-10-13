import React from "react";
import {
  Card,
  Image,
  Title,
  CardBody,
  Sort,
  Price,
} from "./WineProductElements";

function Product({ product }) {
  return (
    <Card key={product._id} href={`/wines/${product._id}`}>
      <Image>
        <img className="medium" src={product.image} alt={product._id} />
      </Image>
      <CardBody>
        <Sort>{product.category}</Sort>
        <Title>{product.sort}</Title>
        <Price>- {product.price} HRK</Price>
      </CardBody>
    </Card>
  );
}

export default Product;
