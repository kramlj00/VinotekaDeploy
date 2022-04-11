import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import LoadingBox from "../LoadignBox/LoadingBox";
import { MessageBox } from "../global/global";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

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
        <MessageBox>Vaše pretraživanje nije dalo rezultata.</MessageBox>
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
`;
