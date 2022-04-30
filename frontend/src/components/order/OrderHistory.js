import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { deleteOrder, listOrderMine } from "../../actions/orderActions";
import QuestionModal from "../modals/QuestionModal";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import { ActionBtn } from "../global/buttons/ActionButton";

function OrderHistory({ props }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) props.history.push("/sign-in");

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) dispatch({ type: ORDER_DELETE_RESET });
    setIsDeleteModalOpen(false);
    dispatch(listOrderMine());
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setOrderId(id);
  };

  const closeDeleteAdModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAd = () => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <PageContainer marginRight={!error && !errorDelete ? "0px" : ""}>
      <Title>Moje narudžbe:</Title>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length ? (
        <TableContainer>
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
                    <BtnContainer>
                      <ActionBtn
                        infoBtn
                        onClick={() => {
                          props.history.push(`/order/${order.id}`);
                        }}
                      >
                        Detalji
                      </ActionBtn>
                      <ActionBtn
                        deleteBtn
                        marginLeft="20px"
                        onClick={() => handleDelete(order.id)}
                      >
                        Obriši
                      </ActionBtn>
                    </BtnContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </OrdersTable>
          {isDeleteModalOpen && (
            <QuestionModal
              questionText={"Jeste li sigurni da želite izbrisati narudžbu?"}
              confirmButtonText={"Da"}
              handleConfirm={handleDeleteAd}
              closeModal={closeDeleteAdModal}
            />
          )}
        </TableContainer>
      ) : (
        <MessageBox variant="danger">Nemate narudžbi</MessageBox>
      )}
    </PageContainer>
  );
}

export default OrderHistory;

const PageContainer = styled.div`
  min-height: 100vh;
  margin: 2rem;

  ${({ theme, marginRight }) => `
    font-family: ${theme.fontFamily.main};
    @media(max-width: ${theme.breakpoints.tablet}){
      margin-right: ${marginRight}
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 1rem;
    }
  `}
`;

const Title = styled.h1`
  padding-bottom: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarge};
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      padding-top: 20px;
    }
  `}
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
  `}
`;

const TableHeader = styled.thead``;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    ${({ theme }) => `
      background-color: ${theme.color.secondary.lightGrey};
    `}
  }
`;

const TableField = styled.th`
  text-align: left;
  /* border: 0.1rem solid #e4e4e4; */
  padding: 0.5rem;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    background-color: ${theme.color.main.dimGrey};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.medium};
      padding-right: 3rem;
    }
  `}
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  text-align: left;
  /* border: 0.1rem solid #e4e4e4; */
  padding: 0.5rem;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.medium};
      padding-right: 1rem;
    }
  `}
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
