import React from "react";
import TransitionedCardFan from "../TransitionedCardFan/TransitionedCardFan";
// import {
//   CardContainer,
//   AboutUsTitle,
//   AboutUsDescription,
//   LeftSide,
//   RightSide,
// } from "./HomeCardElements";
import { Rotate, Zoom, Slide } from "react-awesome-reveal";
import styled from "styled-components";

function HomeCard() {
  return (
    <Slide triggerOnce={true}>
      <CardContainer>
        <LeftSide>
          <AboutUsTitle>Dobrodošli!</AboutUsTitle>
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
        </LeftSide>
        <RightSide>
          <TransitionedCardFan />
        </RightSide>
      </CardContainer>
    </Slide>
  );
}

export default HomeCard;

const CardContainer = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 480px) {
    margin-top: 20px;
  }
`;
const AboutUsTitle = styled.h1`
  font-size: 45px;
  font-family: "Dancing Script", cursive;
  font-weight: normal;
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
`;
const AboutUsDescription = styled.p`
  font-family: "Quicksand", sans-serif;
  line-height: 38px;
  text-indent: 50px;
  font-size: 22px;

  @media screen and (max-width: 700px) {
    line-height: 30px;
    text-indent: 45px;
    font-size: 20px;
  }
  @media screen and (max-width: 480px) {
    line-height: 25px;
    text-indent: 30px;
    font-size: 18px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-left: 100px;
  margin-bottom: 38px;

  @media screen and (max-width: 1200px) {
    margin-left: 0px;
    width: 90%;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-grow: 1;
  width: 50%;
  justify-content: center;
  align-items: center;
  float: left;
`;
