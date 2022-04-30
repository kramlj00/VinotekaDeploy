import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import WineProduct from "../AllWineProducts/WineProduct";
import { Fade } from "react-awesome-reveal";
import Filter from "../Filter/Filter";

function Wines({ props }) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchedTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchedTerm(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleSearchInputChange = (textValue) => {
    if (
      /^[a-z\u0161\u0111\u010D\u0107\u017E\u00EB\u002D ]*$/gi.test(textValue)
    ) {
      setInputValue(textValue);
    }
  };

  return (
    <PageContainer>
      <Image src="/images/vino.jpg" />
      <Fade triggerOnce={true} delay={100}>
        <SearchContainer>
          <SearchIconContainer>
            <SearchIcon />
          </SearchIconContainer>
          <SearchInput
            value={inputValue}
            type="text"
            placeholder="Pretraži vina (npr. Bijelo, Merlot,...)"
            autoFocus
            onChange={(e) => handleSearchInputChange(e.target.value)}
            maxLength={50}
          />
        </SearchContainer>
      </Fade>
      <Filter />
      <WineProduct props={props} inputValue={searchTerm} />
    </PageContainer>
  );
}

export default Wines;

const PageContainer = styled.div`
  min-height: 200vh;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      height: 65vh;
    }
  `}
`;

const SearchContainer = styled.div`
  display: flex;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  height: 35px;
  width: 50%;
  padding-left: 4px;
  margin-top: 30px;
  align-items: center;

  ${({ theme }) => `
    background-color: ${theme.color.main.white};
    border: 2px solid ${theme.color.secondary.darkRed};

    @media(max-width: ${theme.breakpoints.tablet}){
      width: 70%;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
    }

    :focus-within {
      box-shadow: 0 0 5px 1px ${theme.color.main.roseRed};
    }
  `}
`;

const SearchInput = styled.input`
  width: 100%;
  border: 0;
  :focus {
    outline: none;
  }

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
  `}
`;

const SearchIconContainer = styled.div`
  display: flex;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  ${({ theme }) => `
    color: ${theme.color.secondary.rightsGrey};
  `}
`;
