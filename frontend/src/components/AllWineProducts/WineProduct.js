import React, { useEffect } from "react";
import { ProductContainer } from "./WineProductElements";
import Product from "./Product";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

function WineProduct(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]); // runs only ones because the array is empty

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ProductContainer>
          {products.map((product) => (
            <Product key={product._id} product={product} props={props} />
          ))}
        </ProductContainer>
      )}
    </div>
  );
}

export default WineProduct;
