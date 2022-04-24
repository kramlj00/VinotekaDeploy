import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import QtyComponent from "./QtyComponent";
import Rating from "react-star-review";
import { getCanUserComment } from "../../api/api";
import { REVIEW_CREATE_RESET } from "../../constants/reviewConstants";
import { SelectBtn } from "../global/global";
import { useSelector, useDispatch } from "react-redux";
import { createReview } from "../../actions/reviewActions";

function WineProductDetails({ loading, error, product, productId, props }) {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [canUserComment, setCanUserComment] = useState(false);
  const dispatch = useDispatch();

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = reviewCreate;

  useEffect(() => {
    getCanUserComment(setCanUserComment, productId);
  }, []);

  useEffect(() => {
    if (successReviewCreate) {
      setRating("");
      setComment("");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
  }, [dispatch, successReviewCreate]);

  const addToCartHandler = () => {
    // changes route in react app
    if (qty) {
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }
  };

  const handleRatingChange = (r) => {
    setRating(r);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating) dispatch(createReview({ rating, comment }, productId));
    else alert("Unesite ocjenu");
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Container>
            <FirstColumn>
              <Image
                src={product.image ? product.image : "/images/vino.jpg"}
                alt={product.id}
              />
            </FirstColumn>
            <SecondColumn>
              <ProductInfo>
                <Title>
                  {product.sort} - <Seller>{product.seller}</Seller>
                </Title>
                <Category>{product.category}</Category>
                <Description>{product.description}</Description>
                <AlcoholPercentage>
                  Postotak alkohola: <b>{product.alcoholPercentage}%</b>
                </AlcoholPercentage>
                <Year>
                  Godina proizvodnje: <b>{product.year}.</b>
                </Year>
                <Vineyards>
                  Vinogorje: <b>{product.vineyards}</b>
                </Vineyards>
                <Price>
                  <PriceLabel>CIJENA: </PriceLabel> {product.price} HRK/
                  {product.bottleSize} L
                </Price>
              </ProductInfo>
              <AddToCartContainer>
                <QtyComponent product={product} qty={qty} setQty={setQty} />
                {product.countInStock > 0 ? (
                  <AddToCart onClick={addToCartHandler}>
                    Dodaj u košaricu
                  </AddToCart>
                ) : (
                  <NotInStock>Trenutno nedostupno</NotInStock>
                )}
              </AddToCartContainer>
            </SecondColumn>
          </Container>
          <ReviewsContainer>
            {canUserComment && (
              <LeaveReviewContainer>
                <ReviewTitle>Ostavite recenziju:</ReviewTitle>
                {successReviewCreate && (
                  <MessageBox variant="info">
                    Recenzija uspješno objavljena
                  </MessageBox>
                )}
                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                {errorReviewCreate && (
                  <MessageBox variant="danger">{errorReviewCreate}</MessageBox>
                )}
                <RatingContainer>
                  <Rating
                    rating={5}
                    interactive
                    onRatingChanged={(r) => handleRatingChange(r)}
                  />
                </RatingContainer>
                <TextArea
                  type="text"
                  cols="40"
                  rows="8"
                  id="description"
                  maxLength={3000}
                  placeholder="Vaš komentar"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <SelectBtn onClick={handleReviewSubmit}>
                  Objavi recenziju
                </SelectBtn>
              </LeaveReviewContainer>
            )}
            <ReviewTitle>Komentari:</ReviewTitle>
            {!product.reviews.length && (
              <MessageBox variant="danger">Proizvod nema komentara</MessageBox>
            )}
            {product.reviews.map((review) => (
              <ReviewWrapper key={review.id}>
                <ReviewAuthor>Kristina Ramljak</ReviewAuthor>
                <RatingContainer>
                  <Rating rating={review.rating} />
                </RatingContainer>
                <CommentText>{review.comment}</CommentText>
              </ReviewWrapper>
            ))}
          </ReviewsContainer>
        </>
      )}
    </>
  );
}

export default WineProductDetails;

const LeaveReviewContainer = styled.section`
  margin-bottom: 50px;
`;

const RatingContainer = styled.div`
  padding: 5px 0;
`;

const TextArea = styled.textarea`
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  resize: none;

  ${({ theme }) => `
    background-color: ${theme.color.secondary.lightGrey};
    font-family: ${theme.fontFamily.main};
  `}
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.tablet}){
      flex-wrap: wrap;
    }
  `}
`;

const FirstColumn = styled.div`
  width: 600px;
  margin: 1rem;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 370px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 300px;
    }
  `}
`;

const Image = styled.img`
  border-radius: 0.5rem;
  border-radius: 0.5rem;
  max-width: 100%;
  max-height: 100%;

  ${({ theme }) => `
    border: 0.1rem solid ${theme.color.secondary.productsBorderGrey};
  `}
`;

const SecondColumn = styled.div`
  width: 50%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      width: 60%;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 80%;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
    }
  `}
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceLabel = styled.span`
  font-weight: bolder;

  ${({ theme }) => `
    color: ${theme.color.main.black};
  `}
`;

const Category = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.main.rightsGrey};
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

const Description = styled.p`
  text-indent: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  line-height: 38px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarger};
      line-height: 25px;
      text-indent: 10px;
    } 
  `}
`;

const AlcoholPercentage = styled.p`
  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    }
  `}
`;

const Year = styled.p`
  padding-top: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    }
  `}
`;

const Vineyards = styled.p`
  padding-bottom: 30px;
  padding-top: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    }
  `}
`;

const Price = styled.p`
  font-weight: bold;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.secondary.rightsGrey};
  `}
`;

const NotInStock = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-weight: bold;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger};
    color: ${theme.color.main.roseRed};
  `}
`;

const AddToCartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  margin-top: 25px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
  `}
`;

const AddToCart = styled.button`
  margin-left: 50px;
  border-radius: 20px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  border: none;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
  -webkit-transition: -webkit-transform 0.2s ease-out;
  -moz-transition: -moz-transform 0.2s ease-out;
  -o-transition: -o-transform 0.2s ease-out;
  -ms-transition: -ms-transform 0.2s ease-out;

  ${({ theme }) => `
    background-color: ${theme.color.main.roseRed};
    border-color: ${theme.color.main.roseRed};
    color: ${theme.color.main.white};
    font-size: ${theme.fontSize.medium};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumSmall};
      padding: 12px 35px;
      margin-left: 0px;
      margin-top: 20px;
      width: 100%;
    }

    &:hover {
      background-color: ${theme.color.main.lightPink};
      color: ${theme.color.main.roseRed};
      border: 2px solid ${theme.color.main.roseRed};
      transform: scale(1.05);
      transition: all 0.5s ease-out;
    }
  `}
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 30px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};

    @media(max-width: ${theme.breakpoints.desktop}){
      margin: 40px 30px;
    }

    @media(max-width: ${theme.breakpoints.mobile}){
      margin: 0px 30px;
      width: 90vw;
      margin: auto;
    }
  `}
`;

const ReviewTitle = styled.h2``;

const ReviewWrapper = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  ${({ theme }) => `
    border-bottom: 1px solid ${theme.color.secondary.productsBorderGrey};
  `}
`;

const ReviewAuthor = styled.div`
  font-size: 18px;
  padding-bottom: 5px;

  ${({ theme }) => `
    color: ${theme.color.secondary.rightsGrey};
    font-size: ${theme.fontSize.mediumLarger};
  `}
`;

const CommentText = styled.div``;

// const Rating = styled.div`
//   span {
//     color: #f0c040;
//     margin: 0.1rem;
//   }
// `;

const Seller = styled.a`
  text-decoration: none;
  &:hover {
    cursor: pointer;
    transition: color 0.3s ease-out;
    ${({ theme }) => `
      color: ${theme.color.main.green};
    `}
  }
`;
