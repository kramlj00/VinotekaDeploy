import React from "react";
import {
  ProductContainer,
  Card,
  Image,
  CardBody,
  Sort,
  Title,
  Price,
} from "./WineProductElements";
import data from "../../data";
import Product from "./Product";

function WineProduct() {
  return (
    <ProductContainer>
      {data.products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductContainer>
  );
}

export default WineProduct;
