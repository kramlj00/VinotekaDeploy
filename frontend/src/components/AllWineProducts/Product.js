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

function Product({ product, props }) {
  function addToCartHandler() {
    // changes route in react app
    props.props.history.push(`/cart/${product.id}?qty=1`);
  }

  return (
    <Card key={product.id}>
      <Image to={`/wines/${product.id}`}>
        <img className="medium" src={product.image} alt={product.id} />
      </Image>
      <CardBody to={`/wines/${product.id}`}>
        <Category>{product.category}</Category>
        <Title>{product.sort}</Title>
        <Price>- {product.price} HRK</Price>
      </CardBody>
      {product.countInStock > 0 ? (
        <AddToCart onClick={addToCartHandler}>Dodaj u košaricu</AddToCart>
      ) : (
        <NotInStock>Trenutno nedostupno</NotInStock>
      )}
    </Card>
  );
}

export default Product;
