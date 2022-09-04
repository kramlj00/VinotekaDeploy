import React, { useEffect, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import RenderFilter from "./RenderFilter";
import PriceRange from "./PriceRange";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { filterProducts, listProducts } from "../../actions/productActions";
import { Fade } from "react-awesome-reveal";
import { getFilterArgs, getPriceRange } from "../../api/api";

function Filter() {
  const [sort, setFilterSort] = useState([]);
  const [category, setFilterCategory] = useState([]);
  const [maxPriceRange, setMaxPriceRange] = useState([]);
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
    getFilterArgs(setFilterSort, setFilterCategory);
    getPriceRange(setMaxPriceRange);
  }, []);

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

  const renderFilter = (array) => {
    return array.map((el, index) => (
      <RenderFilter
        handleRemovedFilter={(removed) => handleRemoved(removed)}
        key={index}
        el={el}
        handleFilters={(filters) => handleFilters(filters)}
        filter={filterArray}
      />
    ));
  };

  return (
    <FilterContainer>
      <FilterItems
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="0"
      >
        <FilterItem>
          <FilterName>Vrsta</FilterName>
          <ExpandLessContainer>
            <ExpandLess />
          </ExpandLessContainer>
          <ExpandMoreContainer>
            <ExpandMore />
          </ExpandMoreContainer>
          <FilterWrapperContainer>
            <FilterWrapper>{renderFilter(category)}</FilterWrapper>
          </FilterWrapperContainer>
        </FilterItem>
        <FilterItem>
          <FilterName>Sorta</FilterName>
          <ExpandLessContainer>
            <ExpandLess />
          </ExpandLessContainer>
          <ExpandMoreContainer>
            <ExpandMore />
          </ExpandMoreContainer>
          <FilterWrapperContainer>
            <FilterWrapper>{renderFilter(sort)}</FilterWrapper>
          </FilterWrapperContainer>
        </FilterItem>
        <FilterItem>
          <FilterName>Cijena</FilterName>
          <ExpandLessContainer>
            <ExpandLess />
          </ExpandLessContainer>
          <ExpandMoreContainer>
            <ExpandMore />
          </ExpandMoreContainer>
          <FilterWrapperContainer>
            <FilterWrapper>
              <PriceRange
                maxPriceRange={maxPriceRange}
                priceRange={priceFilter}
                setPriceRange={handlePriceRangeChange}
              />
            </FilterWrapper>
          </FilterWrapperContainer>
        </FilterItem>
        <SelectItem
          onChange={handleSortingChange}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-offset="0"
        >
          {sortList.map((item, index) => (
            <SortOption key={index} value={item.value}>
              {item.label}
            </SortOption>
          ))}
        </SelectItem>
      </FilterItems>
    </FilterContainer>
  );
}

export default Filter;

const ExpandLessContainer = styled.div`
  display: none;
  height: 20px;
  margin-left: 5px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
        margin-left: 0px;
    }
  `}
`;

const ExpandMoreContainer = styled.div`
  height: 20px;
  margin-left: 5px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
        margin-left: 0px;
    }
  `}
`;

const FilterContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const FilterItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 200px;
  padding-right: 200px;
  margin-top: 30px;
  position: relative;
  z-index: 200;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.tablet}){
      padding-left: 50px;
      padding-right: 50px;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      padding-left: 5px;
      padding-right: 5px;
    }
  `}
`;

const FilterName = styled.div`
  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.mediumLarger};
    
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.medium};
      padding-left: 2px;
      text-align: center;
    }
  `}
`;

const SelectItem = styled.select`
  border-radius: 5px;
  padding: 1px 5px 1px 5px;
  outline: none;
  height: 30px;
  cursor: pointer;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.medium};
    border: 1px solid ${theme.color.main.black};
    
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: 1rem;
      text-align: center;
      padding: 0;
      width: 110px;
    }
  `}
`;

const SortOption = styled.option`
  cursor: pointer;
`;

const FilterWrapperContainer = styled.div`
  display: none;
  width: 100%;
  padding-bottom: 20px;
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 8%);
  position: absolute;
  margin-top: 130px;
  position: absolute;
  left: 0;
  height: 80px;

  ${({ theme }) => `
    background-color: ${theme.color.main.dimGrey};
  `};
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 1px;
  margin: auto;
  padding-top: 20px;
  align-items: center;

  ${({ theme }) => `
    font-family: ${theme.fontFamily.main};
    font-size: ${theme.fontSize.medium};
    
    @media(max-width: ${theme.breakpoints.desktop}){
      justify-content: center;
    }
  `}
`;

const FilterItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px;
  cursor: pointer;
  height: 54px;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      padding: 5px;
    }

  `}

  &:hover ${FilterWrapperContainer} {
    display: flex;
  }

  &:hover ${ExpandLessContainer} {
    display: flex;
  }

  &:hover ${ExpandMoreContainer} {
    display: none;
  }
`;
