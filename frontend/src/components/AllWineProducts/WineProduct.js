import React, { useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";

function WineProduct(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(props.inputValue, "", ""));
  }, [dispatch, props.inputValue]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : !products.length ? (
        <MessageBox variant="danger">
          Vaše pretraživanje nije dalo rezultata.
        </MessageBox>
      ) : (
        <ProductContainer>
          {products.map((product) => (
            <Product key={product.id} product={product} props={props} />
          ))}
        </ProductContainer>
      )}
    </>
  );
}

export default WineProduct;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  z-index: -1;
`;
