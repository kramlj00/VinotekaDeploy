import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

function PriceRange({ priceRange, setPriceRange, maxPriceRange }) {
  const [value, setValue] = useState(priceRange);

  useEffect(() => {
    setValue(priceRange);
  }, [priceRange]);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const handlePriceFilter = () => {
    setPriceRange(value);
  };

  return (
    <PriceFilterContainer>
      <PriceRangeContainer>
        <Slider
          value={value}
          min={maxPriceRange[0]}
          max={maxPriceRange[1]}
          onChange={rangeSelector}
          valueLabelDisplay="auto"
        />
        <MinMaxPrice>
          <>{value[0]} HRK</>
          <MaxPrice>{value[1]} HRK</MaxPrice>
        </MinMaxPrice>
      </PriceRangeContainer>
      <FilterByPriceBtn onClick={handlePriceFilter}>
        Filtriraj po cijeni
      </FilterByPriceBtn>
    </PriceFilterContainer>
  );
}

export default PriceRange;

const PriceFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;

  ${({ theme }) => `
  background-color: ${theme.color.main.dimGrey};
    @media(max-width: ${theme.breakpoints.desktop}){
      margin-left: 0;
      width: 100vw;
      justify-content: center;
    }
    @media(max-width: ${theme.breakpoints.tablet}){
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;
    }
  `}
`;

const PriceRangeContainer = styled.div`
  width: 60%;

  ${({ theme }) => `
    @media(max-width: ${theme.breakpoints.mobile}){
      width: 90%;
    }
  `}
`;

const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MaxPrice = styled.div``;

const FilterByPriceBtn = styled.button`
  margin-left: 45px;
  align-self: center;
  background-color: transparent;
  border-radius: 20px;
  font-weight: bold;
  padding: 10px 22px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    border: 1px solid ${theme.color.secondary.rightsGrey};

    @media(max-width: ${theme.breakpoints.tablet}){
      margin-top: 10px;
      padding: 9px 35px;
      margin-left: 0;
    }
    @media(max-width: ${theme.breakpoints.mobile}){
      font-size: ${theme.fontSize.mediumSmall};
    }
  `}

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;
