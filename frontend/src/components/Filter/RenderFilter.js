import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const RenderFilter = ({ el, handleFilters, filter, handleRemovedFilter }) => {
  const handleFilterSelect = async (value) => {
    if (!filter.includes(value)) {
      handleFilters([...filter, value]);
    } else {
      const removed = await filter.splice(filter.indexOf(value), 1);
      handleFilters(filter);
      handleRemovedFilter(removed);
    }
  };

  return (
    <FilterOptions>
      <FilterCheckbox
        checked={filter.includes(el) ? true : false}
        type="checkbox"
        id={el}
        aria-hidden="true"
        value={el}
        onChange={(e) => handleFilterSelect(e.target.value)}
      />
      <FilterLabel htmlFor={el}>
        {el}
        <UncheckFilter>
          <CloseIcon />
        </UncheckFilter>
      </FilterLabel>
    </FilterOptions>
  );
};

export default RenderFilter;

const FilterOptions = styled.div`
  input[type="checkbox"]:checked + label {
    border: 1px solid gray;
    padding: 3px 5px 3px 5px;
    border-radius: 4px;
    /* background-color: #cedacd; */
    min-width: 120px;
    margin: 1px;

    @media screen and (max-width: 600px) {
      min-width: 110px;
    }

    div {
      visibility: visible;
    }
  }
`;

const FilterLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
  `}

  @media screen and (max-width: 1100px) {
    padding: 2px;
  }
`;

const FilterCheckbox = styled.input`
  display: none;
`;

const UncheckFilter = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(FaTimes)`
  color: #7a7a7a;
`;
