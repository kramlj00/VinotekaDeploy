import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import WineProductDetails from "../components/WineProductDetails/WineProductDetails";
import { getCanUserComment } from "../api/api";

function WineProductPage(props) {
  const [canUserComment, setCanUserComment] = useState(false);
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    product && getCanUserComment(setCanUserComment, productId);
  }, [dispatch, productId]);

  return (
    <WineProductDetails
      loading={loading}
      error={error}
      product={product}
      productId={productId}
      canUserComment={canUserComment}
      props={props}
    />
  );
}

export default WineProductPage;
