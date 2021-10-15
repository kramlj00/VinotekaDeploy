import React from "react";
import {
  Card,
  Image,
  Title,
  CardBody,
  Sort,
  Price,
} from "./WineProductElements";

function Product(props) {
  const { product } = props;
  return (
    <Card key={product._id} href={`/wine/${product._id}`}>
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
