import React from "react";
import TransitionedCardFan from "../TransitionedCardFan/TransitionedCardFan";
import {
  CardContainer,
  AboutUsTitle,
  AboutUsDescription,
  LeftSide,
  RightSide,
} from "./HomeCardElements";

function HomeCard() {
  return (
    <CardContainer id="card">
      <LeftSide>
        <AboutUsTitle>Dobrodošli!</AboutUsTitle>
        <AboutUsDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. <br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
          <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </AboutUsDescription>
      </LeftSide>
      <RightSide>
        <TransitionedCardFan />
      </RightSide>
    </CardContainer>
  );
}

export default HomeCard;
