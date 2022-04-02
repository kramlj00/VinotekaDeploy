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
  flex-grow: 1;
`

const PriceRangeContainer = styled.div`
  width: 60%;

  @media screen and (max-width: 1100px) {
    width: 65%;
  }

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
  margin-left: 40px;
  cursor: pointer;
`