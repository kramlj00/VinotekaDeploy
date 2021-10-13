import React from "react";
import {
  FilterOptions,
  FilterCheckbox,
  FilterLabel,
  UncheckFilter,
  CloseIcon,
} from "./FilterElements";

const RenderFilter = ({ el }) => {
  return (
    <FilterOptions>
      <FilterCheckbox type="checkbox" id={el} aria-hidden="true" value={el} />
      <FilterLabel for={el}>
        {el}
        <UncheckFilter>
          <CloseIcon />
        </UncheckFilter>
      </FilterLabel>
    </FilterOptions>
  );
};

export default RenderFilter;
