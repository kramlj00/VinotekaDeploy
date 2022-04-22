import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import PageNotFound from "../components/PageNotFound.js/PageNotFound";
import EditProduct from "../components/product/EditProduct";

function EditProductPage(props) {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return product && product.seller_id !== user.id ? (
    <PageNotFound />
  ) : (
    <EditProduct
      loading={loading}
      error={error}
      product={product}
      productId={productId}
      props={props}
    />
  );
}

export default EditProductPage;
