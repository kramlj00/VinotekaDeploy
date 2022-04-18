import React, { useEffect, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import RenderFilter from "./RenderFilter";
import PriceRange from "./PriceRange";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { filterProducts, listProducts } from "../../actions/productActions";
import { Fade } from "react-awesome-reveal";

function Filter({ toggleFilters, isOpen, sort, category, maxPriceRange }) {
  const [array, setArray] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [removedFilter, setRemovedFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const sortList = [
    { value: [""], label: "--Sortiraj--" },
    { value: ["price", "ASC"], label: "Od najniže cijene" },
    { value: ["price", "DESC"], label: "Od najviše cijene" },
    { value: ["createdAt", "DESC"], label: "Najnovije" },
  ];

  useEffect(() => {
    setPriceFilter(maxPriceRange);
  }, [maxPriceRange]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (filterArray.length)
      dispatch(filterProducts(filterArray, priceFilter, sortOption));
    else dispatch(listProducts("", priceFilter, sortOption));
  }, [filterArray, dispatch, removedFilter, priceFilter, sortOption]);

  const handleFilters = async (filters) => {
    setFilterArray(filters);
  };

  const handleRemoved = async (removed) => {
    setRemovedFilter(removed);
  };

  const handlePriceRangeChange = (priceRange) => {
    setPriceFilter(priceRange);
  };

  const handleSortingChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <FilterContainer>
      <FilterItems borderBottom={isOpen ? "1px solid #cfcfcf" : "none"}>
        <FilterItem
          className={isOpen && array[0] === category[0] ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray(category);
          }}
        >
          <Fade triggerOnce={true} delay={100}>
            <FilterName>Vrsta</FilterName>
            {isOpen && array[0] === category[0] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Fade>
        </FilterItem>
        <FilterItem
          className={isOpen && array[0] === sort[0] ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray(sort);
          }}
        >
          <Fade triggerOnce={true} delay={100}>
            <FilterName>Sorta</FilterName>
            {isOpen && array[0] === sort[0] ? <ExpandLess /> : <ExpandMore />}
          </Fade>
        </FilterItem>
        <FilterItem
          className={isOpen && array.length === 0 ? "active" : ""}
          onClick={() => {
            toggleFilters();
            setArray([]);
          }}
        >
          <Fade triggerOnce={true} delay={100}>
            <FilterName>Cijena</FilterName>
            {isOpen && array.length === 0 ? <ExpandLess /> : <ExpandMore />}
          </Fade>
        </FilterItem>
        <Fade triggerOnce={true} delay={100}>
          <SelectItem onChange={handleSortingChange}>
            {sortList.map((item, index) => (
              <SortOption key={index} value={item.value}>
                {item.label}
              </SortOption>
            ))}
          </SelectItem>
        </Fade>
      </FilterItems>
      {isOpen && (
        <FilterWrapperContainer>
          <Fade triggerOnce={true} delay={100}>
            <FilterWrapper>
              {array.length ? (
                array.map((el, index) => (
                  <RenderFilter
                    handleRemovedFilter={(removed) => handleRemoved(removed)}
                    key={index}
                    el={el}
                    handleFilters={(filters) => handleFilters(filters)}
                    filter={filterArray}
                  />
                ))
              ) : (
                <PriceRange
                  maxPriceRange={maxPriceRange}
                  priceRange={priceFilter}
                  setPriceRange={handlePriceRangeChange}
                />
              )}
            </FilterWrapper>
          </Fade>
        </FilterWrapperContainer>
      )}
    </FilterContainer>
  );
}

export default Filter;

const FilterContainer = styled.section`
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
  border-bottom: ${(props) => props.borderBottom};

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
  padding: 7px 20px;
  cursor: pointer;

  &.active {
    border: 1px solid #cfcfcf;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #f5f6fa;
    margin-top: -1px;
    margin-bottom: -2px;
    margin-left: -2px;
  }

  @media screen and (max-width: 600px) {
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 10;
  position: absolute;
  margin-top: 70px;
  background-color: #f5f6fa;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 1px;
  font-size: 1rem;
  /* margin-left: 400px; */
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
