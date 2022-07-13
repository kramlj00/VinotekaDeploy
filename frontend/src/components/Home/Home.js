import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
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

// Animations
const jumpAnimation = keyframes`
0% { transform: translate(-50%, -50%); }
50% { transform: translate(-50%, -65%); }

/* 55% { transform: translate(-50%, -60%) rotate(5deg); }
60% { transform: translate(-50%, -60%) rotate(-5deg); }
65% { transform: translate(-50%, -60%) rotate(5deg); }
60% { transform: translate(-50%, -60%) rotate(-5deg); } */

100% { transform: translate(-50%, -50%); }
`;

const HomeContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
`;

const TitleWrapper = styled.div``;

const GoShoppingLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const GoShoppingBtn = styled.button`
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
  }

  ${({ theme }) => `
      color: ${theme.color.main.white};
      background-color: ${theme.color.main.wineRed};
      border: 1px solid ${theme.color.main.borderWineRed};
      font-size: ${theme.fontSize.medium};
      
      @media(max-width: ${theme.breakpoints.desktop}){
        left: 50%;
        top: 55%;
      } 
      @media(max-width: ${theme.breakpoints.tablet}){
        padding: 10px 40px;
      }
      @media(max-width: ${theme.breakpoints.mobile}){
        font-size: ${theme.fontSize.mediumSmall};
        padding: 9px 35px;
      }
    `}
`;

const GoShoppingContainer = styled.div``;

const Image = styled.img`
  height: 85vh;
  width: 100vw;
  object-fit: cover;

  &.active {
    -webkit-filter: blur(3px);
    transition: -webkit-filter 1.5s linear;
  }

  ${({ theme }) => `
  @media(max-width: ${theme.breakpoints.tablet}){
    object-position: -40px 0;
  } 
`}
`;

const HomeImageContainer = styled.div`
  > ${TitleWrapper} {
    visibility: visible;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-flow: column;
    background: transparent;
    position: absolute;
    top: 65%;
    left: 72%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;

    ${({ theme }) => `
      color: ${theme.color.main.white};
      
      @media(max-width: ${theme.breakpoints.desktop}){
        left: 50%;
        top: 55%;
      } 
    `}
  }

  > ${GoShoppingContainer} {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    margin-top: -40px;
    animation-name: ${jumpAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;

    &:hover {
      animation-play-state: paused;
    }
  }
`;

const Saying = styled.h1`
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.secondary};
    font-size: ${theme.fontSize.title};

    @media(max-width: ${theme.breakpoints.desktop}){
      font-size: ${theme.fontSize.subtitleLarge};
    } 
    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.subtitle};
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.large};
    } 
  `}
`;

const SayingAuthor = styled.p`
  font-size: 50px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  padding-top: 25px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.secondary};
    font-size: ${theme.fontSize.subtitle};


    @media(max-width: ${theme.breakpoints.desktop}){
      font-size: ${theme.fontSize.subtitle};
    } 
    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.large};
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumLarge};
    } 
  `}
`;
