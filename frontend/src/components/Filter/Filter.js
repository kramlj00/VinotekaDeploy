import React, { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import RenderFilter from "./RenderFilter";
import PriceRange from "./PriceRange";
import styled from "styled-components";

function Filter({ toggleFilters, isOpen }) {
  const vrsta = ["Crno vino", "Bijelo vino", "Rose vino", "Pjenušavo vino"];
  const sorta = [
    "Grk",
    "Malvazija",
    "Debit",
    "Merlot",
    "Plavina",
    "Lasin",
    "Maraština",
    "Cabernet Saugvinon",
  ];

  const [array, setArray] = useState([]);

  return (
    <FilterContainer>
      <FilterItems className={isOpen ? "container-active" : ""}>
        <FilterItem
          className={isOpen && array[0] === vrsta[0] ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray(vrsta);
          }}
        >
          <FilterName>Vrsta</FilterName>
          {isOpen && array[0] === vrsta[0] ? <ExpandLess /> : <ExpandMore />}
        </FilterItem>
        <FilterItem
          className={isOpen && array[0] === sorta[0] ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray(sorta);
          }}
        >
          <FilterName>Sorta</FilterName>
          {isOpen && array[0] === sorta[0] ? <ExpandLess /> : <ExpandMore />}
        </FilterItem>
        <FilterItem
          className={isOpen && array.length === 0 ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray([]);
          }}
        >
          <FilterName>Cijena</FilterName>
          {isOpen && array.length === 0 ? <ExpandLess /> : <ExpandMore />}
        </FilterItem>
        <SelectItem>
          <SortOption value="">--Sortiraj--</SortOption>
          <SortOption value="min-max">Od najniže cijene</SortOption>
          <SortOption value="max-min">Od najviše cijene</SortOption>
          <SortOption value="najnovije">Najnovije</SortOption>
        </SelectItem>
      </FilterItems>
      {isOpen && (
        <FilterWrapperContainer>
          <FilterWrapper>
            {array.length ? (
              array.map((el, index) => <RenderFilter key={index} el={el} />)
            ) : (
              <PriceRange />
            )}
          </FilterWrapper>
        </FilterWrapperContainer>
      )}
    </FilterContainer>
  );
}

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 200px;
  padding-right: 200px;
  margin-top: 30px;

  &.container-active {
    border-bottom: 1px solid #cfcfcf;
  }

  @media screen and (max-width: 1000px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media screen and (max-width: 850px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media screen and (max-width: 600px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const FilterItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.active {
    border: 1px solid #cfcfcf;
    border-bottom: 2px solid #eaeded;
    margin-bottom: -2px;
    padding: 5px;
  }
`;

const FilterName = styled.div`
  font-family: "Quicksand", sans-serif;
  font-size: 1.2rem;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding-left: 2px;
    text-align: center;
  }
`;

const SelectItem = styled.select`
  border-radius: 5px;
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  padding: 1px 5px 1px 5px;
  border: 1px solid black;
  outline: none;
  height: 30px;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    padding: 0;
    width: 100px;
  }
`;

const SortOption = styled.option`
  cursor: pointer;
`;

const FilterWrapperContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  box-shadow: 0 30px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 1px;
  font-size: 1rem;
  //margin-left: 400px;
  margin: auto;
  padding-top: 20px;
  margin-left: 300px;
  font-family: "Quicksand", sans-serif;
  align-items: center;

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    justify-content: center;
  }
`;
