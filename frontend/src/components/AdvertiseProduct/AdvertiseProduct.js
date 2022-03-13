import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AdvertiseProduct() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      {!user || user.type_id !== 2 ? (
        <Container>
          <MessageBox>
            Da biste oglasili proizvod morate se prvo prijaviti kao poslovni
            korisnik!
            {!user && <SignInBtn to={"/sign-in"}>Prijavite se</SignInBtn>}
          </MessageBox>
        </Container>
      ) : null}
    </>
  );
}

export default AdvertiseProduct;

const Container = styled.div`
  height: 100vh;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  font-size: 24px;
  background-color: #fcd2e3;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 10px;

  @media screen and (max-width: 1300px) {
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const SignInBtn = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  width: 40%;
  margin-top: 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
  background-color: #e83946;
  border: none;
  transition: transform 80ms ease-in;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 700px) {
    width: 70%;
  }

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;
