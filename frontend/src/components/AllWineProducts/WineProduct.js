import React, { useState, useEffect } from "react";
import { ProductContainer } from "./WineProductElements";
import Product from "./Product";
import axios from "axios";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";

function WineProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/wines");
        setIsLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // runs only ones because the array is empty

  return (
    <div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ProductContainer>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ProductContainer>
      )}
    </div>
  );
}

export default WineProduct;
