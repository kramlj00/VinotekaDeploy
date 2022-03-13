import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import ToggleFilters from "../../functions/toggleFilters";
import WineProduct from "../AllWineProducts/WineProduct";

function Wines({ props }) {
  return (
    <>
      <Image src="/images/vino.jpg" />
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput type="text" placeholder="Pretraži vina" autoFocus />
      </SearchContainer>
      <ToggleFilters />
      <WineProduct props={props} />
    </>
  );
}

export default Wines;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;

  @media screen and (max-width: 600px) {
    height: 40vh;
  }
`;

const SearchContainer = styled.div`
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
    box-shadow: 0 0 5px 1px #e83946;
  }

  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  font-size: 17px;
  width: 100%;
  border: 0;
  :focus {
    outline: none;
  }
`;

const SearchIconContainer = styled.div`
  display: flex;
  color: #6c757d;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
