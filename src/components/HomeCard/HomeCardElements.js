import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const AboutUsTitle = styled.h1`
  font-size: 45px;
  font-family: "Dancing Script", cursive;
  font-weight: normal;
  text-align: center;
  margin-bottom: -10px;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
`;
export const AboutUsDescription = styled.p`
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

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-left: 100px;

  @media screen and (max-width: 1200px) {
    margin-left: 0px;
    width: 90%;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-grow: 1;
  width: 50%;
  justify-content: center;
  align-items: center;
  float: left;
`;
