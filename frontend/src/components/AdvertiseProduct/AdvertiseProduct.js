import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, SelectBtn } from "../global/global";

function AdvertiseProduct() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [bottleSize, setBottleSize] = useState(0);
  const [countInStock, setCountInStock] = useState(null);
  const [year, setYear] = useState(0);
  const [alcoholPercentage, setAlcoholPercantage] = useState(0);
  const [image, setImage] = useState("");
  const [vineyards, setVineyards] = useState("");
  const [isWriting, setIsWriting] = useState(true);
  const [isStockInputValid, setIsStockInputValid] = useState(true);
  const [isYearInputValid, setIsYearInputValid] = useState(true);

  const handleTextChange = (value, setValue) => {
    setIsWriting(true);
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setValue(value);
    }
  };

  const handleIntegerChange = (value, setValue, setIsInputValid) => {
    setIsWriting(true);
    if (value <= 0 || value % 1 !== 0) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }

    setValue(value);
  };

  return (
    <PageContainer>
      {/* {!user || user.type_id !== 2 ? (
        <>
          <MessageBox>
            Da biste oglasili proizvod morate se prvo prijaviti kao poslovni
            korisnik!
            {!user && <SignInBtn to={"/sign-in"}>Prijavite se</SignInBtn>}
          </MessageBox>
        </>
      ) : null} */}
      <>
        <Title>Oglasi svoje vino</Title>
        <Wrapper>
          <FormContainer>
            <LeftContainer>
              <Label for="wineSort">Sorta vina:</Label>
              <Input
                value={sort}
                type="text"
                id="wineSort"
                placeholder="Npr. Merlot"
                required
                onChange={(e) => handleTextChange(e.target.value, setSort)}
              />
              <Label for="category">Vrsta vina:</Label>
              <Input
                id="category"
                value={category}
                type="text"
                placeholder="Npr. Crno vino"
                required
                onChange={(e) => handleTextChange(e.target.value, setCategory)}
              />
              <Label for="description">Opis:</Label>
              <TextArea
                type="text"
                cols="40"
                rows="8"
                id="description"
                placeholder="Opis proizoda"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsWriting(true);
                }}
              />
              <InputContainer>
                  <InputWrapper>
                    <Label for="price">Cijena boce (HRK):</Label>
                    <Input
                      hasMeasuringUnit
                      type="number"
                      id="price"
                      placeholder="Npr. 100"
                      required
                      onKeyDown={(evt) =>
                        (evt.key === "e" || evt.key === "E") &&
                        evt.preventDefault()
                      }
                      onChange={(e) => {
                        setPrice(e.target.value);
                        setIsWriting(true);
                      }}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Label for="bottleSize">Veličina boce (L):</Label>
                    <Input
                      hasMeasuringUnit
                      type="number"
                      id="bottleSize"
                      placeholder="Npr. 1"
                      required
                      onKeyDown={(evt) =>
                        (evt.key === "e" || evt.key === "E") &&
                        evt.preventDefault()
                      }
                      onChange={(e) => {
                        setBottleSize(e.target.value);
                        setIsWriting(true);
                      }}
                    />
                  </InputWrapper>
              </InputContainer>
            </LeftContainer>
            <RightContainer>
              <InputContainer>
                <InputWrapper>
                  <Label for="countInStock">Broj boca na zalihama:</Label>
                  <Input
                    id="countInStock"
                    hasMarginRight
                    type="number"
                    placeholder="Npr. 200"
                    required
                    onKeyDown={(evt) =>
                      (evt.key === "e" || evt.key === "E") &&
                      evt.preventDefault()
                    }
                    onChange={(e) => {
                      handleIntegerChange(
                        e.target.value,
                        setCountInStock,
                        setIsStockInputValid
                      );
                    }}
                  />
                  {!isStockInputValid && <MessageBox>Wrong input</MessageBox>}
                </InputWrapper>
                <InputWrapper>
                  <Label for="year">Godina proizvodnje:</Label>
                  <Input
                    id="year"
                    min={1}
                    type="number"
                    placeholder="Npr. 2022"
                    required
                    onKeyDown={(evt) =>
                      (evt.key === "e" || evt.key === "E") &&
                      evt.preventDefault()
                    }
                    onChange={(e) => {
                      handleIntegerChange(
                        e.target.value,
                        setYear,
                        setIsYearInputValid
                      );
                    }}
                  />
                  {!isYearInputValid && <MessageBox>Wrong input</MessageBox>}
                </InputWrapper>
              </InputContainer>
                <InputWrapper>
                  <Label for="alcoholPercantage">Postotak alkohola (%):</Label>
                  <Input
                    id="alcoholPercantage"
                    hasMeasuringUnit
                    type="number"
                    placeholder="Npr. 17"
                    required
                    onKeyDown={(evt) =>
                      (evt.key === "e" || evt.key === "E") &&
                      evt.preventDefault()
                    }
                    onChange={(e) => {
                      setAlcoholPercantage(e.target.value);
                      setIsWriting(true);
                    }}
                  />
                </InputWrapper>
              <Label>Vinogorje:</Label>
              <Input
                value={vineyards}
                type="text"
                placeholder="Vinogorje"
                required
                onChange={(e) => handleTextChange(e.target.value, setVineyards)}
              />
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
          <AdvertiseBtnContainer>
            <SelectBtn>Oglasi proizvod</SelectBtn>
          </AdvertiseBtnContainer>
        </Wrapper>
      </>
    </PageContainer>
  );
}

export default AdvertiseProduct;

const AdvertiseBtnContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MeasuringUnit = styled.div`
  margin-left: 5px;
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
`;

const UnitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Label = styled.label``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const LeftContainer = styled.div`
  width: 45%;
  margin-right: 50px;
  margin-left: 50px;
  //margin-top: 22px;
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
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Quicksand", sans-serif;
`;

const FormContainer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
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
  height: 100vh;
`;

const MessageBox = styled.div`
  margin: auto;
  margin-top: -5px;
  font-size: 17px;
  font-weight: bold;
`;
