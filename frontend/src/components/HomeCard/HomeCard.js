import React from "react";
import TransitionedCardFan from "../TransitionedCardFan/TransitionedCardFan";
import { Rotate, Zoom, Slide } from "react-awesome-reveal";
import styled from "styled-components";

function HomeCard() {
  return (
    <Slide triggerOnce={true}>
      <CardContainer>
        <LeftSide>
          <AboutUsTitle>Dobro došli!</AboutUsTitle>
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
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
  min-height: 550px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.desktop}){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
    } 
  `}
`;
const AboutUsTitle = styled.h1`
  font-weight: normal;
  text-align: center;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.secondary};
    font-size: ${theme.fontSize.subtitle};

    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.large};
    } 
  `}
`;
const AboutUsDescription = styled.p`
  line-height: 38px;
  text-indent: 50px;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.mediumLarge};

    @media(max-width: ${theme.breakpoints.tablet}){
      font-size: ${theme.fontSize.mediumLarger};
    } 
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
      line-height: 25px;
      text-indent: 30px;
    } 
  `}
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-left: 100px;
  margin-bottom: 38px;

  @media screen and (max-width: 1300px) {
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
