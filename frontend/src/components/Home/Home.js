import React, { useState, useEffect } from "react";
import pocetna from "../../images/pocetna.jpg";
import {
  HomeContainer,
  HomeImage,
  TitleWrapper,
  Saying,
  SayingAuthor,
  ArrowContainer,
  ArrowDown,
} from "./HomeElements";
import HomeCard from "../HomeCard/HomeCard";
import { Link } from "react-scroll";
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
    // console.log(window.scrollY);
    if (window.scrollY >= 100) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  window.addEventListener("scroll", changeOpacity);

  return (
    <HomeContainer>
      <HomeImage>
        <img
          src={pocetna}
          alt="pocetna"
          className={isScrolling ? "active" : null}
        ></img>

        <TitleWrapper>
          <Fade triggerOnce={true} delay={200}>
            <Saying>"Vino je poezija u boci"</Saying>
            <SayingAuthor>- Clifton Fadiman</SayingAuthor>
          </Fade>
        </TitleWrapper>

        <ArrowContainer>
          <Link
            activeClass="active"
            to="card"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Fade triggerOnce={true} delay={400}>
              <ArrowDown />
            </Fade>
          </Link>
        </ArrowContainer>
      </HomeImage>

      <HomeCard />
    </HomeContainer>
  );
}

export default Home;
