import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Card = styled.div`
  border: 0.1rem #c0c0c0 solid;
  width: 320px;
  background-color: #f8f8f8;
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

  &:hover {
    transform: scale(1.05);
    border: 0.1rem #6c757d solid;
  }
`;

export const CardBody = styled(Link)`
  text-decoration: none;
  padding: 1rem;
  font-family: "Quicksand", sans-serif;
  display: flex;
  flex-direction: column;
  height: 135px;
  justify-content: space-between;
`;

export const Image = styled(Link)`
  position: relative;
  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Category = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  color: #6c757d;
`;

export const Title = styled.h2`
  color: #000;
`;

export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #6c757d;
`;

export const AddToCart = styled.button`
  width: 90%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  margin-bottom: 10px;
  margin-left: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  background-color: #e83946;
  color: #fff;
  border: none;
  border-radius: 0.4rem;

  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;

  &:hover {
    background-color: #fcd2e3;
    color: #e83946;
    border: 2px solid #e83946;
    transition: all 0.5s ease-out;
  }
`;

export const NotInStock = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-size: 22px;
  color: #e83946;
  font-weight: bold;
`;
