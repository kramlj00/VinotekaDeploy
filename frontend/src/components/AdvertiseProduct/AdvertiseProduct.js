import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { Input, SelectBtn, ErrorMessage } from "../global/global";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../actions/productActions";
import MessageBox from "../MessageBox/MessageBox";

function AdvertiseProduct() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [bottleSize, setBottleSize] = useState(0);
  const [countInStock, setCountInStock] = useState(null);
  const [year, setYear] = useState("");
  const [alcoholPercentage, setAlcoholPercentage] = useState(0);
  const [image, setImage] = useState("");
  const [vineyards, setVineyards] = useState("");
  const [isWriting, setIsWriting] = useState(true);
  const [isDataSent, setIsDataSent] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  const [isStockInputValid, setIsStockInputValid] = useState(true);
  const [isYearInputValid, setIsYearInputValid] = useState(true);
  const [isSortValid, setIsSortValid] = useState(true);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isVineyardsValid, setIsVineyardsValid] = useState(true);

  const productAdd = useSelector((state) => state.productAdd);
  const { error, message } = productAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      setSort("");
      setCategory("");
      setPrice("");
      setBottleSize("");
      setDescription("");
      setYear("");
      setCountInStock("");
      setAlcoholPercentage("");
      setVineyards("");
      setImage("");
    }
  }, [isDataSent]);

  const advertiseProductHandler = () => {
    const seller = user.name;
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
      dispatch(
        addNewProduct(
          category,
          image,
          price,
          bottleSize,
          sort,
          seller,
          description,
          year,
          alcoholPercentage,
          vineyards,
          countInStock
        )
      );
      setIsDataSent(true);
    }
    setIsWriting(false);
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
    if (value <= 0) {
      setIsStockInputValid(false);
    } else {
      setIsStockInputValid(true);
    }
    if (!value.includes(",") && parseInt(value) !== 0)
      setCountInStock(parseInt(value));
  };

  const handleBottleSizeChange = (value) => {
    if (value.length < 5) setBottleSize(parseFloat(value));
    setIsWriting(true);
  };

  const handlePriceChange = (value) => {
    if (value.length < 10 && parseFloat(value) !== 0) setPrice(value);
    setIsWriting(true);
  };

  const handleAlcoholPercentageChange = (value) => {
    if (value.length < 6 && parseFloat(value) !== 0 && !value.includes("-"))
      setAlcoholPercentage(parseFloat(value));
    setIsWriting(true);
  };

  const handleYearChange = (value) => {
    if (value <= 0) {
      setIsYearInputValid(false);
    } else {
      setIsYearInputValid(true);
    }
    if (value.length < 5 && parseInt(value) !== 0) setYear(parseInt(value));
    setIsWriting(true);
  };

  const handleForwardIconClick = () => {
    setIsRightActive(true);
  };

  const handleBackIconClick = () => {
    setIsRightActive(false);
  };

  return (
    <PageContainer>
      {/* {!user || user.type_id !== 2 ? (
        <>
          <InfoBox>
            Da biste oglasili proizvod morate se prvo prijaviti kao poslovni
            korisnik!
            {!user && <SignInBtn to={"/sign-in"}>Prijavite se</SignInBtn>}
          </InfoBox>
        </>
      ) : null} */}
      <>
        <Title>Oglasi svoje vino</Title>
        {isDataSent &&
          (error ? (
            <MessageBoxWrapper>
              <MessageBox variant="danger">{error}</MessageBox>
            </MessageBoxWrapper>
          ) : (
            <MessageBoxWrapper>
              <MessageBox variant="info">{message}</MessageBox>
            </MessageBoxWrapper>
          ))}
        <Wrapper>
          <FormContainer isRightActive={isRightActive}>
            <LeftContainer isRightActive={isRightActive}>
              <Label for="wineSort">Sorta vina:</Label>
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
              <Label for="category">Vrsta vina:</Label>
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
              <Label for="description">Opis:</Label>
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
                  <Label for="price">Cijena boce (HRK):</Label>
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
                  <Label for="bottleSize">Veličina boce (L):</Label>
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
                  <Label for="countInStock">Broj boca na zalihama:</Label>
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
                      !isStockInputValid && countInStock ? "visible" : "hidden"
                    }
                  >
                    * Pogrešan unos!
                  </ErrorMessage>
                </InputWrapper>
                <InputWrapper>
                  <Label for="year">Godina proizvodnje:</Label>
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
                      !isYearInputValid && year ? "visible" : "hidden"
                    }
                  >
                    * Pogrešan unos!
                  </ErrorMessage>
                </InputWrapper>
              </InputContainer>
              <InputWrapper>
                <Label for="alcoholPercantage">Postotak alkohola (%):</Label>
                <Input
                  id="alcoholPercantage"
                  hasMeasuringUnit
                  type="number"
                  value={alcoholPercentage}
                  placeholder="Npr. 17"
                  required
                  onKeyDown={(evt) =>
                    (evt.key === "e" || evt.key === "E") && evt.preventDefault()
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
                <Label for="image">Odaberite sliku vina:</Label>
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
            <SelectBtn onClick={advertiseProductHandler}>
              Oglasi proizvod
            </SelectBtn>
          </AdvertiseBtnContainer>
          <ForwardIconContainer
            isRightActive={isRightActive}
            onClick={handleForwardIconClick}
          >
            <ArrowForwardOutlined fontSize="large" />
          </ForwardIconContainer>
          <BackIconContainer
            isRightActive={isRightActive}
            onClick={handleBackIconClick}
          >
            <ArrowBackOutlined fontSize="large" />
          </BackIconContainer>
        </Wrapper>
      </>
    </PageContainer>
  );
}

export default AdvertiseProduct;

const BackIconContainer = styled.div`
  display: none;
  color: #e83946;
  cursor: pointer;
  border: 1px solid #e83946;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    ${(props) => `
      display: ${props.isRightActive ? "flex" : "none"};
  `}
  }

  @media screen and (max-width: 680px) {
    margin-top: 50px;
    ${(props) => `
    display: ${props.isRightActive ? "flex" : "none"};
`}
  }
`;

const AdvertiseBtnContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 1000px) {
    ${(props) => `
      display: ${props.isRightActive ? "inline-block" : "none"};
  `}
  }
`;

const ForwardIconContainer = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    color: #e83946;
    cursor: pointer;
    border: 1px solid #e83946;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    align-self: flex-end;
    margin-right: 20px;
    margin-bottom: 20px;
    padding-left: 2px;

    ${(props) => `
      display: ${props.isRightActive ? "none" : "inline-block"};
  `}
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 680px) {
    flex-direction: column;
  }
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
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  resize: none;
  font-family: "Quicksand", sans-serif;
`;

const RightContainer = styled.div`
  margin-right: 50px;
  width: 42%;

  @media screen and (max-width: 1000px) {
    margin: auto;
    width: 80%;
    ${(props) => `
      display: ${props.isRightActive ? "inline-block" : "none"};
  `}

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const LeftContainer = styled.div`
  width: 45%;
  margin-right: 50px;
  margin-left: 50px;

  @media screen and (max-width: 1000px) {
    margin: auto;
    width: 80%;
    ${(props) => `
      display: ${props.isRightActive ? "none" : "inline-block"};
    `}
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  margin: auto;
  margin-top: 26px;
  margin-bottom: 100px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 70%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Quicksand", sans-serif;

  @media screen and (max-width: 1300px) {
    width: 90%;
  }
`;

const FormContainer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    width: 70%;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  font-family: "Dancing Script", cursive;
  font-weight: normal;
  text-align: center;
  margin-top: 20px;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
`;

const PageContainer = styled.div`
  height: 120vh;

  @media screen and (max-width: 680px) {
    height: 100vh;
  }
`;

const InfoBox = styled.div`
  margin: auto;
  margin-top: -5px;
  font-size: 17px;
  font-weight: bold;
`;

const MessageBoxWrapper = styled.div`
  padding-top: 10px;
  width: 70%;
  margin: auto;

  @media screen and (max-width: 1300px) {
    width: 90%;
  }
`;
