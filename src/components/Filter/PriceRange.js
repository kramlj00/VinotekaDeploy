import React from "react";
import {
  PriceRangeContainer,
  MinMaxPrice,
  MinPrice,
  MaxPrice,
} from "./FilterElements";
import Slider from "@material-ui/core/Slider";

function PriceRange() {
  // Our States
  const [value, setValue] = React.useState([1, 600]);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
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
        <MinPrice>{value[0]} HRK</MinPrice>
        <MaxPrice>{value[1]} HRK</MaxPrice>
      </MinMaxPrice>
    </PriceRangeContainer>
  );
}

export default PriceRange;
