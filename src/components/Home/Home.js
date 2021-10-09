import React from "react";
import pocetna from "../../images/pocetna.jpg";
import o_nama from "../../images/onama.png";
import {
  HomeContainer,
  HomeImage,
  CardContainer,
  TextContainer,
  AboutUsTitle,
  AboutUsDescription,
  ImageContainer,
} from "./HomeElements";

function Home() {
  return (
    <HomeContainer>
      <HomeImage>
        <img src={pocetna} alt="pocetna"></img>
      </HomeImage>
      <CardContainer>
        <TextContainer>
          <AboutUsTitle>O nama</AboutUsTitle>
          <AboutUsDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />{" "}
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
            <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </AboutUsDescription>
        </TextContainer>
        <ImageContainer>
          <img src={o_nama} alt="o nama"></img>
        </ImageContainer>
      </CardContainer>
    </HomeContainer>
  );
}

export default Home;
