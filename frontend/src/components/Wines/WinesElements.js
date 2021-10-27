import styled from "styled-components";

export const Container = styled.div``;

export const Image = styled.div`
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;

    @media screen and (max-width: 600px) {
      height: 40vh;
    }
  }
`;

export const SearchContainer = styled.div`
  background-color: white;
  display: flex;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  height: 35px;
  width: 50%;
  padding-left: 4px;
  border: 2px solid #9f5f5f;
  margin-top: 30px;
  align-items: center;

  :focus-within {
    //box-shadow: 0 0 5px 2px #9f5f5f;
    box-shadow: 0 0 5px 1px #e83946;
  }

  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;

export const SearchInput = styled.input`
  font-size: 17px;
  width: 100%;
  border: 0;
  :focus {
    outline: none;
  }
`;

export const SearchIconContainer = styled.div`
  display: flex;
  color: #6c757d;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
