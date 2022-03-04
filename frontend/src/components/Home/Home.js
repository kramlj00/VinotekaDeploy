import React, { useState, useEffect } from "react";
// import pocetna from "../../images/pocetna.jpg";
import {
  HomeContainer,
  HomeImageContainer,
  Image,
  TitleWrapper,
  Saying,
  SayingAuthor,
  GoShoppingContainer,
  GoShoppingLink,
  GoShoppingBtn,
} from "./HomeElements";
import HomeCard from "../HomeCard/HomeCard";
import { Fade } from "react-awesome-reveal";

function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    changeOpacity();
    return () => {
      setIsScrolling(false); //clean the state in the unmount of the component
    };
  }, []);

  const changeOpacity = () => {
    if (window.scrollY >= 100) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  window.addEventListener("scroll", changeOpacity);

  return (
    <HomeContainer>
      <HomeImageContainer>
        <Image
          src="/images/pocetna.jpg"
          alt="pocetna"
          className={isScrolling ? "active" : null}
        />

        <TitleWrapper>
          <Fade triggerOnce={true} delay={200}>
            <Saying>"Vino je poezija u boci"</Saying>
            <SayingAuthor>- Clifton Fadiman</SayingAuthor>
          </Fade>
        </TitleWrapper>

        <GoShoppingContainer>
          <Fade triggerOnce={true} delay={400}>
            <GoShoppingLink to="/wines">
              <GoShoppingBtn>Kreni kupovati</GoShoppingBtn>
            </GoShoppingLink>
          </Fade>
        </GoShoppingContainer>
      </HomeImageContainer>

      <HomeCard />
    </HomeContainer>
  );
}

export default Home;
