import React from "react";
import {
  FilterContainer,
  SelectItem,
  SortOption,
  FilterItem,
  FilterName,
  FilterWrapper,
  FilterOptions,
  FilterItems,
  FilterCheckbox,
  FilterLabel,
  UncheckFilter,
  CloseIcon,
} from "./FilterElements";
import ExpandMore from "@mui/icons-material/ExpandMore";

function Filter({ toggleFilters, isOpen }) {
  return (
    <FilterContainer>
      <FilterItems>
        <FilterItem isOpen={isOpen} onClick={toggleFilters}>
          <FilterName>Vrsta</FilterName>
          <ExpandMore />
        </FilterItem>
        <FilterItem>
          <FilterName>Sorta</FilterName>
          <ExpandMore />
        </FilterItem>
        <FilterItem>
          <FilterName>Raspon cijena</FilterName>
          <ExpandMore />
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
          <FilterOptions>
            <FilterCheckbox
              type="checkbox"
              id="crno"
              aria-hidden="true"
              value="crno-vino"
            />
            <FilterLabel for="crno">
              Crno vino
              <UncheckFilter>
                <CloseIcon />
              </UncheckFilter>
            </FilterLabel>
          </FilterOptions>
          <FilterOptions>
            <FilterCheckbox
              type="checkbox"
              aria-hidden="true"
              value="bijelo-vino"
              id="bijelo"
            />
            <FilterLabel for="bijelo">
              Bijelo vino
              <UncheckFilter>
                <CloseIcon />
              </UncheckFilter>
            </FilterLabel>
          </FilterOptions>
          <FilterOptions>
            <FilterCheckbox
              type="checkbox"
              aria-hidden="true"
              value="rose-vino"
              id="rose"
            />
            <FilterLabel for="rose">
              Rose vino
              <UncheckFilter>
                <CloseIcon />
              </UncheckFilter>
            </FilterLabel>
          </FilterOptions>
          <FilterOptions>
            <FilterCheckbox
              type="checkbox"
              aria-hidden="true"
              value="pjenusavo-vino"
              id="pjenusavo"
            />
            <FilterLabel for="pjenusavo">
              Pjenušavo vino
              <UncheckFilter>
                <CloseIcon />
              </UncheckFilter>
            </FilterLabel>
          </FilterOptions>
        </FilterWrapper>
      ) : null}
    </FilterContainer>
  );
}

export default Filter;
