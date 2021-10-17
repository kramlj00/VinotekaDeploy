import React from "react";
import {
  Card,
  Image,
  Title,
  CardBody,
  Category,
  Price,
  AddToCart,
  NotInStock,
} from "./WineProductElements";

function Product(props) {
  const { product } = props;
  return (
    <Card key={product._id}>
      <Image href={`/wine/${product._id}`}>
        <img className="medium" src={product.image} alt={product._id} />
      </Image>
      <CardBody href={`/wine/${product._id}`}>
        <Category>{product.category}</Category>
        <Title>{product.sort}</Title>
        <Price>- {product.price} HRK</Price>
      </CardBody>
      {product.countInStock > 0 ? (
        <AddToCart>Dodaj u košaricu</AddToCart>
      ) : (
        <NotInStock>Trenutno nedostupno</NotInStock>
      )}
    </Card>
  );
}

export default Product;
