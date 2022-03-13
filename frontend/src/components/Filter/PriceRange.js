import React from "react";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

function PriceRange() {
  // Our States
  const [value, setValue] = React.useState([1, 600]);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PriceRangeContainer>
      <Slider
        value={value}
        max="600"
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      <MinMaxPrice>
        <>{value[0]} HRK</>
        <MaxPrice>{value[1]} HRK</MaxPrice>
      </MinMaxPrice>
    </PriceRangeContainer>
  );
}

export default PriceRange;

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
