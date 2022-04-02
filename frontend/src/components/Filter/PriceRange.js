import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

function PriceRange({priceRange, setPriceRange, maxPriceRange}) {
  const [value, setValue] = useState(priceRange);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const handlePriceFilter = () => {
    setPriceRange(value);
  }
  
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
      <FilterByPriceBtn onClick={handlePriceFilter}>Filtriraj po cijeni</FilterByPriceBtn>
    </PriceFilterContainer>
  );
}

export default PriceRange;

const PriceFilterContainer = styled.div`
  display: flex;
  margin-left: -80px;
  width: 100%;

  @media screen and (max-width: 1100px) {
    margin-left: 0;
    width: 100vw;
    justify-content: center;
  }

  @media screen and (max-width: 800px) {
    margin-left: 0;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }
`

const PriceRangeContainer = styled.div`
  width: 60%;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
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
  border: 1px #6c757d solid;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 22px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }


  @media screen and (max-width: 800px) {
    margin-left: 0;
  }
`