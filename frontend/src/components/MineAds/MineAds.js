import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { listProductMine } from "../../actions/productActions";
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
        <OrdersTable>
          <TableHeader>
            <TableRow>
              <TableField>DATUM OBJAVE</TableField>
              <TableField>SORTA</TableField>
              <TableField>KATEGORIJA</TableField>
              <TableField>BOCA NA ZALIHAMA</TableField>
              <TableField>CIJENA/VELIČINA BOCE</TableField>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell textAlign="left">
                  {item.createdAt.substring(0, 10)}
                </TableCell>
                <TableCell textAlign="left">{item.sort}</TableCell>
                <TableCell textAlign="left">{item.category}</TableCell>
                <TableCell textAlign="left">{item.countInStock}</TableCell>
                <TableCell textAlign="left">
                  {item.price} HRK / {item.bottleSize} L
                </TableCell>
                <TableCell textAlign="right">
                  <ActionBtn
                    onClick={() => {
                      props.history.push(`/wines/${item.id}`);
                    }}
                  >
                    Detalji
                  </ActionBtn>
                  <ActionBtn
                    marginLeft="20px"
                    onClick={() => {
                      props.history.push(`/edit/${item.id}`);
                    }}
                  >
                    Uredi
                  </ActionBtn>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </OrdersTable>
      )}
    </PageContainer>
  );
}

export default MineAds;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
`;

const TableHeader = styled.thead``;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #e8e8e8;
  }
`;

const TableField = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: #f5f6fa;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  text-align: ${({ textAlign }) => textAlign};
  padding: 0.5rem;
`;

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
  margin-left: ${({ marginLeft }) => marginLeft};

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
