import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadignBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { listOrderMine } from "../../actions/orderActions";

function OrderHistory() {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  console.log(orders);

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
              {/* <TableField>UKUPNO</TableField> */}
              <TableField>PLAĆENO</TableField>
              <TableField>DOSTAVLJENO</TableField>
              {/* <TableField>AKCIJE</TableField> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                {/* <TableCell>{order.totalPrice.toFixed(2)}</TableCell> */}
                <TableCell>
                  {order.is_paid ? order.paid_at.substring(0, 10) : "Ne"}
                </TableCell>
                <TableCell>
                  {order.is_delivered
                    ? order.delivered_at.substring(0, 10)
                    : "Ne"}
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

const Title = styled.h1``;

const OrdersTable = styled.table``;

const TableHeader = styled.thead``;

const TableRow = styled.tr``;

const TableField = styled.th``;

const TableBody = styled.tbody``;

const TableCell = styled.td``;

const ActionBtn = styled.button``;
