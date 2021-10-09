import styled from "styled-components";

export const HomeContainer = styled.div``;

export const HomeImage = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 20px;
  align-items: center;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutUsTitle = styled.h1`
  font-size: 45px;
  font-family: "Dancing Script", cursive;
  font-weight: normal;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
`;

export const AboutUsDescription = styled.p`
  padding-top: 10px;
  font-family: "Quicksand", sans-serif;
  line-height: 2.2rem;
  text-indent: 50px;
  font-size: 1.5rem;

  @media screen and (max-width: 1300px) {
    font-size: 1.25rem;
    margin-left: 50px;
    margin-right: 50px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    font-size: 1rem;
    line-height: 1.8rem;
    text-indent: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 650px) and (max-width: 1100px) {
    width: 50%;
  }
`;
