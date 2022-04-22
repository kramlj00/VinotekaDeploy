import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { listProductMine, deleteProduct } from "../../actions/productActions";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import QuestionModal from "../modals/QuestionModal";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";

function MineAds({ props }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) props.history.push("/sign-in");

  const productMineList = useSelector((state) => state.productMineList);
  const { loading, error, products } = productMineList;
  const dispatch = useDispatch();

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    setIsDeleteModalOpen(false);
    dispatch(listProductMine());
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setProductId(id);
  };

  const closeDeleteAdModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAd = () => {
    console.log("HERE COMES DISPATCH");
    console.log(productId);
    dispatch(deleteProduct(productId));
  };

  return (
    <PageContainer>
      <Title>Moji oglasi:</Title>
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
                    <BtnContainer>
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
                          props.history.push(`/edit_product/${item.id}`);
                        }}
                      >
                        Uredi
                      </ActionBtn>
                      <ActionBtn
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
        <MessageBox varient="danger">Nemate oglašenih proizvoda</MessageBox>
      )}
    </PageContainer>
  );
}

export default MineAds;

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

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    @media(max-width: ${theme.breakpoints.tablet}){
      margin-right: 0;
    }
  `}
`;

const ActionBtn = styled.button`
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 10px;
  background-color: transparent;
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

  ${({ theme }) => `
    border: 1px solid ${theme.color.secondary.rightsGrey};
  `}
`;

const Title = styled.h1`
  padding-bottom: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.large};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarge};
    }
  `}
`;
