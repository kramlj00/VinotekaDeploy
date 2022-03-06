import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animations
const jumpAnimation = keyframes`
0% { transform: translate(-50%, -50%); }
50% { transform: translate(-50%, -65%); }

// 55% { transform: translate(-50%, -60%) rotate(5deg); }
// 60% { transform: translate(-50%, -60%) rotate(-5deg); }
// 65% { transform: translate(-50%, -60%) rotate(5deg); }
// 60% { transform: translate(-50%, -60%) rotate(-5deg); }

100% { transform: translate(-50%, -50%); }
`;

export const HomeContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const TitleWrapper = styled.div``;

export const GoShoppingLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const GoShoppingBtn = styled.button`
  background-color: #b8001f;
  border-radius: 20px;
  border: 1px solid #e83946;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
  }
`;

export const GoShoppingContainer = styled.div``;

export const Image = styled.img`
  height: 85vh;
  width: 100vw;
  object-fit: cover;
  object-position: -40px 0;

  &.active {
    -webkit-filter: blur(3px);
    transition: -webkit-filter 1.5s linear;
  }
`;

export const HomeImageContainer = styled.div`
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
    color: white;

    @media screen and (max-width: 1300px) {
      left: 67%;
    }

    @media screen and (max-width: 1060px) {
      left: 50%;
      top: 55%;
    }
  }

  > ${GoShoppingContainer} {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: whitesmoke;
    margin-top: -40px;
    animation-name: ${jumpAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;

    &:hover {
      animation-play-state: paused;
    }
  }
`;

export const Saying = styled.h1`
  font-size: 60px;
  font-family: "Dancing Script", cursive;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;

  @media screen and (max-width: 1300px) {
    font-size: 55px;
  }

  @media screen and (max-width: 1060px) {
    font-size: 50px;
  }

  @media screen and (max-width: 680px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 35px;
  }
`;

export const SayingAuthor = styled.p`
  font-size: 50px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  font-family: "Dancing Script", cursive;
  padding-top: 25px;

  @media screen and (max-width: 1300px) {
    font-size: 45px;
  }

  @media screen and (max-width: 1060px) {
    font-size: 40px;
  }

  @media screen and (max-width: 680px) {
    font-size: 35px;
  }

  @media screen and (max-width: 480px) {
    font-size: 30px;
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
