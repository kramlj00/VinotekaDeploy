import React from "react";

import {
  Container,
  ImageContainer,
  ProductInfo,
  AddToCartContainer,
} from "../components/WineProduct/WineProductElements";
import {
  Title,
  Sort,
  Price,
} from "../components/AllWineProducts/WineProductElements";
import data from "../data";
import WineProduct from "../components/WineProduct/WineProduct";

function WineProductPage(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);

  // if product does not exist
  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <WineProduct product={product} />;
}

export default WineProductPage;
