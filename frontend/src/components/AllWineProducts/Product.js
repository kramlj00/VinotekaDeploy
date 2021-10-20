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
  //const { product } = props;

  function addToCartHandler() {
    // changes route in react app
    props.props.history.push(`/cart/${product._id}?qty=1`);
  }

  return (
    <Card key={product._id}>
      <Image to={`/wine/${product._id}`}>
        <img className="medium" src={product.image} alt={product._id} />
      </Image>
      <CardBody to={`/wine/${product._id}`}>
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
