import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import ReactPaginate from "react-paginate";
import { theme } from "../../themes/defaultTheme";
import { useMedia } from "use-media";

function WineProduct(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const isDesktopScreen = useMedia({
    minWidth: theme.breakpoints.tablet,
    maxWidth: theme.breakpoints.desktop,
  });
  const isTabletScreen = useMedia({
    maxWidth: theme.breakpoints.tablet,
  });

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = isDesktopScreen ? 9 : isTabletScreen ? 6 : 12;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = products && Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(listProducts(props.inputValue, "", ""));
  }, [dispatch, props.inputValue]);

  const displayProducts = () => {
    return products
      .slice(pagesVisited, pagesVisited + productsPerPage)
      .map((product) => (
        <Product key={product.id} product={product} props={props} />
      ));
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
        <>
          <ProductContainer>{displayProducts()}</ProductContainer>
          <PaginationContainer>
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </PaginationContainer>
        </>
      )}
    </>
  );
}

export default WineProduct;

const PaginationContainer = styled.div`
  margin: auto;
  margin-top: 70px;

  .paginationButtons {
    width: 80%;
    padding-inline-start: 0px;
    height: 40px;
    list-style: none;
    cursor: pointer;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
  }

  .paginationButtons a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;

    ${({ theme }) => `
      border: 1px solid ${theme.color.secondary.rightsGrey};
      color: ${theme.color.secondary.rightsGrey};
    `}
  }

  .paginationButtons a:hover {
    ${({ theme }) => `
      background-color: ${theme.color.secondary.rightsGrey};
      color: ${theme.color.main.white};
    `}
  }

  .paginationActive a {
    ${({ theme }) => `
      background-color: ${theme.color.secondary.rightsGrey};
      color: ${theme.color.main.white};
    `}
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 2000px;
  z-index: -1;
  margin: auto;
  justify-content: center;
  padding-left: 24px;
  padding-right: 24px;
`;
