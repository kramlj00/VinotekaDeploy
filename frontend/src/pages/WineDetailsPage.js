import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import WineProductDetails from "../components/WineProductDetails/WineProductDetails";

function WineProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <WineProductDetails
      loading={loading}
      error={error}
      product={product}
      productId={productId}
      props={props}
    />
  );
}

export default WineProductPage;
