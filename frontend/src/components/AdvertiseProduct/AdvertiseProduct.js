import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, SelectBtn } from "../global/global";

function AdvertiseProduct() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [bottleSize, setBottleSize] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [year, setYear] = useState(0);
  const [image, setImage] = useState("");
  const [isWriting, setIsWriting] = useState(true);

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
              <Input
                type="text"
                placeholder="Naziv vina"
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setIsWriting(true);
                }}
              />
              <Input
                type="text"
                placeholder="Vrsta vina"
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIsWriting(true);
                }}
              />
              <TextArea
                type="text"
                cols="40"
                rows="8"
                placeholder="Opis"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsWriting(true);
                }}
              />
              <InputContainer>
                <InputWrapper>
                  <Label>Cijena boce u HRK:</Label>
                  <UnitWrapper>
                    <Input
                      hasMeasuringUnit
                      type="number"
                      required
                      onChange={(e) => {
                        setPrice(e.target.value);
                        setIsWriting(true);
                      }}
                    />
                    <MeasuringUnit>HRK</MeasuringUnit>
                  </UnitWrapper>
                </InputWrapper>
                <InputWrapper>
                  <Label>Veličina boce:</Label>
                  <UnitWrapper>
                    <Input
                      hasMeasuringUnit
                      type="number"
                      required
                      onChange={(e) => {
                        setBottleSize(e.target.value);
                        setIsWriting(true);
                      }}
                    />
                    <MeasuringUnit>L</MeasuringUnit>
                  </UnitWrapper>
                </InputWrapper>
              </InputContainer>
            </LeftContainer>
            <RightContainer>
              <InputContainer>
                <InputWrapper>
                  <Label>Broj boca na zalihama:</Label>
                  <Input
                    hasMarginRight
                    type="number"
                    required
                    onChange={(e) => {
                      setCountInStock(e.target.value);
                      setIsWriting(true);
                    }}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label for="countInStock">Godina proizvodnje:</Label>
                  <Input
                    id="countInStock"
                    type="number"
                    required
                    onChange={(e) => {
                      setYear(e.target.value);
                      setIsWriting(true);
                    }}
                  />
                </InputWrapper>
              </InputContainer>
              <InputWrapper>
                <Label for="image">Odaberite sliku vina:</Label>
                <Input
                  id="image"
                  type="file"
                  required
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
`;

const UnitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 22px;
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
  display: flex;
  flex-direction: column;
  width: 95%;
  font-size: 24px;
  background-color: #fcd2e3;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 10px;

  @media screen and (max-width: 1300px) {
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const SignInBtn = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  width: 40%;
  margin-top: 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #e83946;
  border: none;
  transition: transform 80ms ease-in;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 700px) {
    width: 70%;
  }

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;
