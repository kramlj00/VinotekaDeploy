import React from "react";
import styled from "styled-components";
import pocetna from "../images/pocetna.jpg";
import o_nama from "../images/onama.png";

function Home() {
  return (
    <HomeContainer>
      <HomeImage>
        <img src={pocetna} alt="pocetna"></img>
      </HomeImage>
      <CardContainer>
        <TextContainer>
          <Title>O nama</Title>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />{" "}
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
            <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </Description>
        </TextContainer>
        <ImageContainer>
          <img src={o_nama} alt="o nama"></img>
        </ImageContainer>
      </CardContainer>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div``;

const HomeImage = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

const CardContainer = styled.div`
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 20px;
`;

const TextContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  font-family: "Dancing Script", cursive;
  font-weight: normal;
`;

const Description = styled.p`
  padding-top: 10px;
  font-family: "Quicksand", sans-serif;
  line-height: 2.2rem;
  text-indent: 50px;
  font-size: 1.5rem;
`;

const ImageContainer = styled.div`
  width: 50%;
  img {
    width: 100%;
    height: auto;
  }
`;
