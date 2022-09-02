import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Product({ product, props }) {
  function addToCartHandler() {
    // changes route in react app
    props.props.history.push(`/cart/${product.id}?qty=1`);
  }

  return (
    <Card key={product.id}>
      <ImageContainer to={`/wines/${product.id}`}>
        <ProductImg
          src={product.image ? product.image : "/images/vino.jpg"}
          alt={product.id}
        />
      </ImageContainer>
      <CardBody to={`/wines/${product.id}`}>
        <Category>{product.category}</Category>
        <Title>{product.sort}</Title>
        <Price>~ {product.price} HRK</Price>
      </CardBody>
      {product.countInStock > 0 ? (
        <AddToCart onClick={addToCartHandler}>Dodaj u košaricu</AddToCart>
      ) : (
        <NotInStock>Trenutno nedostupno :(</NotInStock>
      )}
    </Card>
  );
}

export default Product;

const Card = styled.div`
  width: 320px;
  border-radius: 0.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;
  transition: transform 0.5s ease-out;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  ${({ theme }) => `
    background-color: ${theme.color.main.dimGrey};

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  `}
`;

const ImageContainer = styled(Link)`
  position: relative;
  height: 320px;
  margin: auto;
`;

const ProductImg = styled.img`
  border-radius: 0.5rem 0.5rem 0 0;
  max-width: 100%;
  max-height: 100%;
  height: -webkit-fill-available;
  object-fit: cover;
  z-index: 10;
`;

const CardBody = styled(Link)`
  text-decoration: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 135px;
  justify-content: space-between;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.mobile}){
      height: 115px;
      padding-top: 0px;
    }
  `}
`;

const Category = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.secondary.rightsGrey};
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    }
  `}
`;

const Title = styled.h2`
  ${({ theme }) => `
    color: ${theme.color.main.black};
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarger};
    }
  `}
`;

const Price = styled.p`
  font-weight: bold;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.secondary.rightsGrey};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
    }
  `}
`;

const NotInStock = styled.button`
  width: 90%;
  height: 50px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;
  background-color: transparent;

  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.main.roseRed};
    border: 2px solid ${theme.color.main.roseRed};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumSmall};
      height: 40px;
    }
  `}
`;

// const NotInStock = styled.div`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   letter-spacing: 1px;
//   font-weight: bold;

//   ${({ theme }) => `
//     font-size: ${theme.fontSize.mediumLarger};
//     color: ${theme.color.main.roseRed};

//     @media(max-width: ${theme.breakpoints.mobile}){
//       // font-size: ${theme.fontSize.medium};
//       height: 40px;
//     }
//   `}
// `;

const AddToCart = styled.button`
  width: 90%;
  height: 50px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;

  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    background-color: ${theme.color.main.roseRed};
    color: ${theme.color.main.white};

    &:hover {
      background-color: ${theme.color.secondary.lightPink};
      color: ${theme.color.main.roseRed};
      border: 2px solid ${theme.color.main.roseRed};
      transition: all 0.5s ease-out;
    }

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumSmall};
      height: 40px;
    }
  `}
`;
