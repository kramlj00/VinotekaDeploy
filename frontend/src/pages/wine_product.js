import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import WineProduct from "../components/WineProduct/WineProduct";

function WineProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <WineProduct
      loading={loading}
      error={error}
      product={product}
      productId={productId}
      props={props}
    />
  );
}

export default WineProductPage;
