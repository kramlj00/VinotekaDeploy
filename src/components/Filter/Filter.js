import React, { useState } from "react";
import {
  FilterContainer,
  SelectItem,
  SortOption,
  FilterItem,
  FilterName,
  FilterWrapper,
  FilterItems,
} from "./FilterElements";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import RenderFilter from "./RenderFilter";
import PriceRange from "./PriceRange";

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
      {isOpen ? (
        <FilterWrapper>
          {array.length ? (
            array.map((el, index) => <RenderFilter key={index} el={el} />)
          ) : (
            <PriceRange />
          )}
        </FilterWrapper>
      ) : null}
    </FilterContainer>
  );
}

export default Filter;
