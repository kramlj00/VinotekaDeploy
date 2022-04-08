import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import ToggleFilters from "../../functions/toggleFilters";
import WineProduct from "../AllWineProducts/WineProduct";

function Wines({ props }) {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchedTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchedTerm(inputValue);
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])


  const handleSearchInputChange = (textValue) => {
    if (/^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(textValue)) {
      setInputValue(textValue);
    }
  }

  return (
    <PageContainer>
      <Image src="/images/vino.jpg" />
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput 
          value={inputValue}
          type="text"
          placeholder="Pretraži vina" 
          autoFocus
          onChange={(e) => handleSearchInputChange(e.target.value)}
          maxLength={50}
        />
      </SearchContainer>
      <ToggleFilters />
      <WineProduct props={props} inputValue={searchTerm}/>
    </PageContainer>
  );
}

export default Wines;

const PageContainer = styled.div`
  min-height: 200vh;
`

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
