import React from "react";
import pocetna from "../../images/pocetna.jpg";
import {
  HomeContainer,
  HomeImage,
  TitleWrapper,
  Saying,
  SayingAuthor,
} from "./HomeElements";
import HomeCard from "../HomeCard/HomeCard";

function Home() {
  return (
    <HomeContainer>
      <HomeImage>
        <img src={pocetna} alt="pocetna"></img>
        {/*  
        <TitleWrapper>
          <Saying>"Vino je poezija u boci"</Saying>
          <SayingAuthor>- Clifton Fadiman</SayingAuthor>
        </TitleWrapper>
        */}
      </HomeImage>
      <HomeCard />
    </HomeContainer>
  );
}

export default Home;
