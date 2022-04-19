import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { listProductMine } from "../../actions/productActions";
import { Link } from "react-router-dom";
import LoadingBox from "../LoadignBox/LoadingBox";

function MineAds({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) props.history.push("/sign-in");

  const productMineList = useSelector((state) => state.productMineList);
  const { loading, error, products } = productMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(products);
    dispatch(listProductMine());
  }, [dispatch]);

  return (
    <PageContainer>
      <Title>Moji oglasi:</Title>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ItemsContainer>
          {products &&
            products.map((item) => (
              <Item key={item.id}>
                <ItemRow>
                  <Image to={`/wines/${item.id}`}>
                    <img
                      src={item.image ? item.image : "/images/vino.jpg"}
                      alt={item.product}
                    />
                  </Image>
                  <ItemInfoWrapper>
                    <ItemSort>{item.sort}</ItemSort>
                    <ItemCategory>{item.category}</ItemCategory>
                    <BottlesInStock>{item.countInStock}</BottlesInStock>
                    <Price>
                      <strong>
                        {" "}
                        {item.price} HRK/{item.bottleSize} L{" "}
                      </strong>
                    </Price>
                    <ActionBtn
                      onClick={() => {
                        props.history.push(`/advertise_product`);
                      }}
                    >
                      Uredi
                    </ActionBtn>
                  </ItemInfoWrapper>
                </ItemRow>
              </Item>
            ))}
        </ItemsContainer>
      )}
    </PageContainer>
  );
}

export default MineAds;

const PageContainer = styled.div`
  min-height: 100vh;
  margin: 2rem;
  font-family: "Quicksand", sans-serif;
`;

const ActionBtn = styled.button`
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px #6c757d solid;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const ItemsContainer = styled.div``;

const Item = styled.li`
  list-style: none;
`;

const ItemRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  @media screen and (max-width: 1300px) {
    height: 150px;
    margin-right: 10px;
  }
  @media screen and (max-width: 715px) {
    height: 350px;
    display: flex;
    flex-direction: column;
  }
`;

const Image = styled(Link)`
  display: flex;
  align-self: center;
  height: 170px;
  margin-right: 20px;
  width: 160px;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1300px) {
    height: 145px;
  }
  @media screen and (max-width: 1000px) {
    height: 140px;
  }
  @media screen and (max-width: 715px) {
    height: 170px;
  }
`;

const ItemSort = styled.h2`
  text-decoration: none;
  color: #000;
  font-size: 20px;
  width: 130px;
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
  @media screen and (max-width: 715px) {
    padding-top: 10px;
  }
`;

const BottlesInStock = styled.div`
  font-size: 20px;
`;

const Price = styled.div`
  margin-right: 20px;
  font-size: 20px;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-left: 10px;
  @media screen and (max-width: 715px) {
    flex-direction: column;
    padding: 0;
  }
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  @media screen and (max-width: 1000px) {
    height: 85px;
  }
`;

const ItemSeller = styled.div``;

const ItemCategory = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 17px;
  color: #6c757d;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
  @media screen and (max-width: 715px) {
    display: none;
  }
`;
