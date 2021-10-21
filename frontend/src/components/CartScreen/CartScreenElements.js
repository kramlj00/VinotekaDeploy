import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  font-family: "Quicksand", sans-serif;
  padding: 10px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.65;

  @media screen and (max-width: 1300px) {
    flex-grow: 0.4;
  }
`;

export const CartTitle = styled.h1`
  //font-family: "Dancing Script", cursive;
  margin: 20px;
  margin-left: 40px;

  @media screen and (max-width: 1300px) {
    margin-left: 10px;
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-left: 40px;
  font-size: 24px;
  background-color: #fcd2e3;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1300px) {
    margin: auto;
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

export const GoShopping = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  width: 60%;
  margin-top: 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #e83946;
  border: none;
  transition: transform 80ms ease-in;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 700px) {
    width: 70%;
  }

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;

export const ItemsList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li``;

export const ItemRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 15px;

  @media screen and (max-width: 1300px) {
    height: 150px;
    margin-left: -30px;
    margin-right: 10px;
  }

  @media screen and (max-width: 1000px) {
    justify-content: flex-start;
    height: 250px;
  }

  @media screen and (max-width: 480px) {
    margin-left: -40px;
    margin-right: 0px;
  }
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-left: 10px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    height: 220px;
  }
`;

export const Image = styled(Link)`
  height: 170px;
  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }

  @media screen and (max-width: 1300px) {
    height: 145px;
  }

  @media screen and (max-width: 1000px) {
    height: 220px;
  }

  @media screen and (max-width: 600px) {
    height: 140px;
  }
`;

export const ItemSort = styled.h2`
  text-decoration: none;
  color: #000;
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85px;

  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;

export const ItemSeller = styled.div``;

export const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 17px;
  color: #6c757d;

  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 13px;
    letter-spacing: 1px;
  }
`;

export const UnitPrice = styled.div`
  font-size: 24px;

  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

export const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const RemoveItem = styled.button`
  color: #fff;
  background-color: #d10a0a;
  text-transform: uppercase;
  padding: 10px 25px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: transform 80ms ease-in;
  margin-left: 20px;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 600px) {
    padding: 10px 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 7px 7px;
  }
`;

export const SecondColumn = styled.div`
  dispaly: flex;
  flex-direction: column;
  margin: 20px;
  background-color: whitesmoke;
  height: 150px;
  padding: 20px;
  border-radius: 20px;
`;

export const Subtotal = styled.h2`
  font-size: 25px;
  margin-bottom: 30px;
`;

export const Checkout = styled.button`
  text-transform: uppercase;
  width: 100%;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #32a852;
  border: none;
  transition: transform 80ms ease-in;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;
