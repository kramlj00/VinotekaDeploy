import styled from "styled-components";

export const Container = styled.div``;

export const Image = styled.div`
  img {
    width: 100%;
    height: 60vh;
    object-fit: cover;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  height: 35px;
  width: 50%;
  padding-left: 4px;
  border: 2px solid #9f5f5f;
  margin-top: 30px;

  :focus-within {
    box-shadow: 0 0 5px 2px #9f5f5f;
  }

  @media screen and (max-width: 750px) {
    width: 80%;
  }
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  border: 0;
  :focus {
    outline: none;
  }
`;

export const SearchIconContainer = styled.div`
  display: flex;
  color: black;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
