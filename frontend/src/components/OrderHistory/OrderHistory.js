import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { listOrderMine } from "../../actions/orderActions";

function OrderHistory({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) props.history.push("/sign-in");

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <PageContainer>
      <Title>Moje narudžbe:</Title>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <OrdersTable>
          <TableHeader>
            <TableRow>
              <TableField>ID</TableField>
              <TableField>DATUM</TableField>
              <TableField>PLAĆENO</TableField>
              <TableField>DOSTAVLJENO</TableField>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>
                  {order.is_paid ? order.paid_at.substring(0, 10) : "Ne"}
                </TableCell>
                <TableCell>
                  {order.is_delivered
                    ? order.delivered_at.substring(0, 10)
                    : "Ne"}
                </TableCell>
                <TableCell>
                  <ActionBtn
                    onClick={() => {
                      props.history.push(`/order/${order.id}`);
                    }}
                  >
                    Detalji
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

export default OrderHistory;

const PageContainer = styled.div`
  min-height: 100vh;
  margin: 2rem;
  font-family: "Quicksand", sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

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
  /* border: 0.1rem solid #e4e4e4; */
  padding: 0.5rem;
  background-color: #f5f6fa;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  text-align: left;
  /* border: 0.1rem solid #e4e4e4; */
  padding: 0.5rem;
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
