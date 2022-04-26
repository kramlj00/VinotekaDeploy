import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { Input, SelectBtn, BackIconContainer } from "../global/global";
import { ErrorMessage } from "../global/notifications/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../global/notifications/MessageBox";
import LoadingBox from "../global/LoadingBox";
import { theme } from "../../themes/defaultTheme";
import { useMedia } from "use-media";
import { updateProduct } from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

function EditProduct({ loading, error, product, props }) {
  const isSmallScreen = useMedia({ maxWidth: theme.breakpoints.tablet });
  const [isWriting, setIsWriting] = useState(true);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bottleSize, setBottleSize] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [year, setYear] = useState("");
  const [alcoholPercentage, setAlcoholPercentage] = useState("");
  const [image, setImage] = useState("");
  const [vineyards, setVineyards] = useState("");
  const [isRightActive, setIsRightActive] = useState(false);

  const [isStockInputValid, setIsStockInputValid] = useState(true);
  const [isYearInputValid, setIsYearInputValid] = useState(true);
  const [isSortValid, setIsSortValid] = useState(true);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isVineyardsValid, setIsVineyardsValid] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    if (product) {
      setAlcoholPercentage(product.alcoholPercentage);
      setBottleSize(product.bottleSize);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setPrice(product.price);
      setSort(product.sort);
      setVineyards(product.vineyards);
      setYear(product.year);
    }
  }, [product]);

  const editProductHandler = () => {
    if (
      isSortValid &&
      isCategoryValid &&
      isDescriptionValid &&
      isVineyardsValid &&
      isYearInputValid &&
      isStockInputValid &&
      price &&
      bottleSize &&
      alcoholPercentage
    ) {
      setIsWriting(false);
      dispatch(
        updateProduct({
          id: product.id,
          category,
          image,
          price,
          bottleSize,
          sort,
          description,
          year,
          alcoholPercentage,
          vineyards,
          countInStock,
        })
      );
    }
  };

  const handleTextChange = (value, setValue, setIsValueValid) => {
    setIsWriting(true);
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(value)) {
      setValue(value);
    }
    value.length < 3 ? setIsValueValid(false) : setIsValueValid(true);
  };

  const handleCountInStockChange = (value) => {
    setIsWriting(true);

    if (!value.includes(",") && parseInt(value) !== 0 && !value.includes("-"))
      setCountInStock(parseInt(value));
  };

  const handleBottleSizeChange = (value) => {
    setIsWriting(true);

    if (value.length < 5 && !value.includes("-"))
      setBottleSize(parseFloat(value));
  };

  const handlePriceChange = (value) => {
    setIsWriting(true);

    if (value.length < 10 && parseFloat(value) !== 0 && !value.includes("-"))
      setPrice(value);
  };

  const handleAlcoholPercentageChange = (value) => {
    setIsWriting(true);

    if (value.length < 6 && parseFloat(value) !== 0 && !value.includes("-"))
      setAlcoholPercentage(parseFloat(value));
  };

  const handleYearChange = (value) => {
    setIsWriting(true);

    if (value.length < 5 && parseInt(value) !== 0 && !value.includes("-"))
      setYear(parseInt(value));
  };

  const handleForwardIconClick = () => {
    setIsRightActive(true);
  };

  const handleBackIconClick = () => {
    setIsRightActive(false);
  };

  return (
    <PageContainer>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Title>Uredi svoj oglas</Title>
          {loadingUpdate && <LoadingBox />}
          {errorUpdate && (
            <MessageBoxWrapper>
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            </MessageBoxWrapper>
          )}
          {successUpdate && !isWriting && (
            <MessageBoxWrapper>
              <MessageBox variant="info">Profil uspješno ažuriran!</MessageBox>
            </MessageBoxWrapper>
          )}
          <Wrapper>
            <FormContainer isRightActive={isRightActive}>
              <LeftContainer isRightActive={isRightActive}>
                <Label htmlFor="wineSort">Sorta vina:</Label>
                <Input
                  value={sort}
                  type="text"
                  id="wineSort"
                  placeholder="Npr. Merlot"
                  required
                  onChange={(e) =>
                    handleTextChange(e.target.value, setSort, setIsSortValid)
                  }
                />

                <ErrorMessage
                  hasPadding
                  visibility={sort && sort.length < 3 ? "visible" : "hidden"}
                >
                  * Sorta mora imati barem 3 slova!
                </ErrorMessage>
                <Label htmlFor="category">Vrsta vina:</Label>
                <Input
                  id="category"
                  value={category}
                  type="text"
                  placeholder="Npr. Crno vino"
                  required
                  onChange={(e) =>
                    handleTextChange(
                      e.target.value,
                      setCategory,
                      setIsCategoryValid
                    )
                  }
                />
                <ErrorMessage
                  hasPadding
                  visibility={
                    category && category.length < 3 ? "visible" : "hidden"
                  }
                >
                  * Kategorija mora imati barem 3 slova!
                </ErrorMessage>
                <Label htmlFor="description">Opis:</Label>
                <TextArea
                  type="text"
                  cols="40"
                  rows="8"
                  id="description"
                  maxLength={3000}
                  value={description}
                  placeholder="Opis proizoda"
                  required
                  onChange={(e) => {
                    setIsWriting(true);
                    setDescription(e.target.value);
                  }}
                />
                <ErrorMessage
                  hasPadding
                  visibility={
                    description && description.length < 3 ? "visible" : "hidden"
                  }
                >
                  * Opis mora imati barem 3 znaka!
                </ErrorMessage>
                <InputContainer>
                  <InputWrapper>
                    <Label htmlFor="price">Cijena boce (HRK):</Label>
                    <Input
                      hasMeasuringUnit
                      value={price}
                      type="number"
                      id="price"
                      placeholder="Npr. 100"
                      required
                      onKeyDown={(evt) =>
                        (evt.key === "e" || evt.key === "E") &&
                        evt.preventDefault()
                      }
                      onChange={(e) => {
                        handlePriceChange(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      hasPadding
                      visibility={price && price > 50000 ? "visible" : "hidden"}
                    >
                      * Pogrešan unos!
                    </ErrorMessage>
                  </InputWrapper>
                  <InputWrapper>
                    <Label htmlFor="bottleSize">Veličina boce (L):</Label>
                    <InputWrapper>
                      <Input
                        hasMeasuringUnit
                        type="number"
                        id="bottleSize"
                        value={bottleSize}
                        placeholder="Npr. 1"
                        required
                        onKeyDown={(evt) =>
                          (evt.key === "e" || evt.key === "E") &&
                          evt.preventDefault()
                        }
                        onChange={(e) => {
                          handleBottleSizeChange(e.target.value);
                        }}
                      />
                      <ErrorMessage
                        hasPadding
                        visibility={
                          bottleSize && bottleSize > 3 ? "visible" : "hidden"
                        }
                      >
                        * Pogrešan unos!
                      </ErrorMessage>
                    </InputWrapper>
                  </InputWrapper>
                </InputContainer>
              </LeftContainer>
              <RightContainer isRightActive={isRightActive}>
                <InputContainer>
                  <InputWrapper marginRight={"20px"}>
                    <Label htmlFor="countInStock">Broj boca na zalihama:</Label>
                    <Input
                      id="countInStock"
                      value={countInStock}
                      hasMarginRight
                      type="number"
                      placeholder="Npr. 200"
                      required
                      onKeyDown={(evt) =>
                        (evt.key === "e" || evt.key === "E") &&
                        evt.preventDefault()
                      }
                      onChange={(e) => {
                        handleCountInStockChange(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      hasPadding
                      visibility={
                        countInStock && countInStock > 100000000
                          ? "visible"
                          : "hidden"
                      }
                    >
                      * Pogrešan unos!
                    </ErrorMessage>
                  </InputWrapper>
                  <InputWrapper>
                    <Label htmlFor="year">Godina proizvodnje:</Label>
                    <Input
                      id="year"
                      min={1}
                      type="number"
                      placeholder="Npr. 2022"
                      value={year}
                      required
                      onKeyDown={(evt) =>
                        (evt.key === "e" || evt.key === "E") &&
                        evt.preventDefault()
                      }
                      onChange={(e) => {
                        handleYearChange(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      hasPadding
                      visibility={
                        year && year.length > 4 ? "visible" : "hidden"
                      }
                    >
                      * Pogrešan unos!
                    </ErrorMessage>
                  </InputWrapper>
                </InputContainer>
                <InputWrapper>
                  <Label htmlFor="alcoholPercantage">
                    Postotak alkohola (%):
                  </Label>
                  <Input
                    id="alcoholPercantage"
                    hasMeasuringUnit
                    type="number"
                    value={alcoholPercentage}
                    placeholder="Npr. 17"
                    required
                    onKeyDown={(evt) =>
                      (evt.key === "e" || evt.key === "E") &&
                      evt.preventDefault()
                    }
                    onChange={(e) => {
                      handleAlcoholPercentageChange(e.target.value);
                    }}
                  />
                  <ErrorMessage
                    hasPadding
                    visibility={
                      alcoholPercentage && alcoholPercentage > 30
                        ? "visible"
                        : "hidden"
                    }
                  >
                    * Pogrešan unos!
                  </ErrorMessage>
                </InputWrapper>
                <Label>Vinogorje:</Label>
                <Input
                  value={vineyards}
                  type="text"
                  placeholder="Vinogorje"
                  required
                  onChange={(e) =>
                    handleTextChange(
                      e.target.value,
                      setVineyards,
                      setIsVineyardsValid
                    )
                  }
                />
                <ErrorMessage
                  hasPadding
                  visibility={
                    vineyards && vineyards.length < 3 ? "visible" : "hidden"
                  }
                >
                  * Vinogorje mora imati barem 3 slova!
                </ErrorMessage>
                <InputWrapper>
                  <Label htmlFor="image">Odaberite sliku vina:</Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.value);
                      setIsWriting(true);
                    }}
                  />
                </InputWrapper>
              </RightContainer>
            </FormContainer>
            <AdvertiseBtnContainer isRightActive={isRightActive}>
              <SelectBtn onClick={editProductHandler}>
                Spremi promjene
              </SelectBtn>
            </AdvertiseBtnContainer>
            <ForwardIconContainer
              isRightActive={isRightActive}
              onClick={handleForwardIconClick}
            >
              <ArrowForwardOutlined fontSize="large" />
            </ForwardIconContainer>
            {isSmallScreen && (
              <BackIconContainer
                isRightActive={isRightActive}
                display={isRightActive ? "flex" : "none"}
                onClick={handleBackIconClick}
              >
                <ArrowBackOutlined fontSize="large" />
              </BackIconContainer>
            )}
          </Wrapper>
        </>
      )}
    </PageContainer>
  );
}

export default EditProduct;

const MessageBoxWrapper = styled.div`
  padding-top: 10px;
  margin: auto;
  width: 100%;
`;

const AdvertiseBtnContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  ${(props) => `
    @media(max-width: ${props.theme.breakpoints.tablet}){
      display: ${props.isRightActive ? "inline-block" : "none"};
    }
  `}
`;

const ForwardIconContainer = styled.div`
  display: none;
  ${(props) => `
    @media(max-width: ${props.theme.breakpoints.tablet}){
      display: flex;
      color: ${props.theme.color.main.roseRed};
      cursor: pointer;
      border: 1px solid ${props.theme.color.main.roseRed};
      height: 40px;
      width: 40px;
      border-radius: 50%;
      align-self: flex-end;
      margin-right: 20px;
      margin-bottom: 20px;
      padding-left: 2px;

      display: ${props.isRightActive ? "none" : "inline-block"};
    }
  `}
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      flex-direction: column;
    }
  `}
`;

const Label = styled.label``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => `
    margin-right: ${props.marginRight ? "10px" : ""};
  `}
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

const RightContainer = styled.div`
  margin-right: 50px;
  width: 42%;

  ${(props) => `
    @media(max-width: ${props.theme.breakpoints.tablet}){
      margin: auto;
      width: 80%;
      display: ${props.isRightActive ? "inline-block" : "none"};
    }
    @media(max-width: ${props.theme.breakpoints.mobile}){
      width: 100%;
    }
  `}
`;

const LeftContainer = styled.div`
  width: 45%;
  margin-right: 50px;
  margin-left: 50px;

  ${(props) => `
    @media(max-width: ${props.theme.breakpoints.tablet}){
      margin: auto;
      width: 80%;
      display: ${props.isRightActive ? "none" : "inline-block"};
    }
    @media(max-width: ${props.theme.breakpoints.mobile}){
      width: 100%;
    }
  `}
`;

const Wrapper = styled.div`
  margin: auto;
  margin-top: 26px;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    background-color: ${theme.color.main.white};
  `}
`;

const FormContainer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      width: 70%;
    }
  `}
`;

const Title = styled.h1`
  font-weight: normal;
  text-align: center;
  margin-top: 20px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.secondary};
    font-size: ${theme.fontSize.subtitle};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.large};
    }
  `}
`;

const PageContainer = styled.div`
  height: 120vh;
  width: 70%;
  margin: auto;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      width: 90%;
    }
  `}
`;
