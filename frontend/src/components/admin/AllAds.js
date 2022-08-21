import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts } from "../../actions/productActions";
import LoadingBox from "../global/LoadingBox";
import MessageBox from "../global/notifications/MessageBox";
import { ActionBtn } from "../global/buttons/ActionButton";
import QuestionModal from "../modals/QuestionModal";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";
import NotificationBox from "../global/notifications/Notification";

function AllAds({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (
    !userInfo ||
    (userInfo.id && userInfo.id !== 1) ||
    (userInfo.data && userInfo.data.id !== 1)
  )
    props.history.push("/sign-in"); // zaminit s page not found linkom
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [showSuccessDeleteMsg, setShowSuccessDeleteMsg] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      setShowSuccessDeleteMsg(true);
    }
    setIsDeleteModalOpen(false);
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setProductId(id);
  };

  const closeDeleteAdModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAd = () => {
    dispatch(deleteProduct(productId));
  };

  return (
    <PageContainer>
      {showSuccessDeleteMsg && (
        <NotificationBox>Oglas uspješno izbrisan!</NotificationBox>
      )}
      <Title>Svi oglasi:</Title>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products.length ? (
        <TableContainer>
          <OrdersTable>
            <TableHeader>
              <TableRow>
                <TableField>DATUM OBJAVE</TableField>
                <TableField>SORTA</TableField>
                <TableField>KATEGORIJA</TableField>
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
                  <TableCell textAlign="left">
                    {item.price} HRK / {item.bottleSize} L
                  </TableCell>
                  <TableCell textAlign="right">
                    <BtnContainer>
                      <ActionBtn
                        infoBtn
                        onClick={() => {
                          props.history.push(`/wines/${item.id}`);
                        }}
                      >
                        Detalji
                      </ActionBtn>
                      <ActionBtn
                        editBtn
                        marginLeft="20px"
                        onClick={() => {
                          props.history.push(`/edit_product/${item.id}`);
                        }}
                      >
                        Uredi
                      </ActionBtn>
                      <ActionBtn
                        deleteBtn
                        marginLeft="20px"
                        onClick={() => handleDelete(item.id)}
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
              questionText={"Jeste li sigurni da želite izbrisati oglas?"}
              confirmButtonText={"Da"}
              handleConfirm={handleDeleteAd}
              closeModal={closeDeleteAdModal}
            />
          )}
        </TableContainer>
      ) : (
        <MessageBox variant="danger">Nemate oglašenih proizvoda</MessageBox>
      )}
    </PageContainer>
  );
}

export default AllAds;

const BtnContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
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
  text-align: ${({ textAlign }) => textAlign};
  padding: 0.5rem;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.medium};
      padding-right: 1rem;
    }
  `}
`;

const PageContainer = styled.div`
  min-height: 100vh;
  margin: 2rem;

  ${({ theme, marginRight }) => `
    font-family: ${theme.fontFamily.main};
    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 1rem;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      // margin-right: ${marginRight}
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
