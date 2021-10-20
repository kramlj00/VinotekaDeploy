import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  font-family: "Quicksand", sans-serif;

  margin-right: 18px;
  padding: 20px;
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
`;

export const CartTitle = styled.h1`
  //font-family: "Dancing Script", cursive;
  margin: 20px;
  margin-left: 40px;
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
`;

export const GoShopping = styled.button`
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
`;

export const Image = styled(Link)`
  height: 170px;
  // width: 200px;
  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ItemSort = styled.h2`
  text-decoration: none;
  color: #000;
  font-size: 20px;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85px;
`;

export const ItemSeller = styled.div``;

export const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 17px;
  color: #6c757d;
`;

export const UnitPrice = styled.div`
  font-size: 24px;
`;

export const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
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

export const SecondColumn = styled.div`
  dispaly: flex;
  flex-direction: column;
  margin: 20px;
  flex-grow: 0.3;
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
