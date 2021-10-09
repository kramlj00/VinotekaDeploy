import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 200px;
  padding-right: 200px;
  margin-top: 30px;
`;

export const FilterItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterName = styled.div`
  font-family: "Quicksand", sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const SelectItem = styled.select`
  border-radius: 5px;
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  padding: 1px 5px 1px 5px;
  border: 1px solid black;
  outline: none;
  height: 30px;
  cursor: pointer;
`;

export const SortOption = styled.option`
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  //visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 1px;
  font-size: 1rem;
  margin-left: 200px;
  margin-top: 20px;
  font-family: "Quicksand", sans-serif;
  width: 50%;
  justify-content: space-between;
  align-items: center;
`;

export const FilterOptions = styled.div`
  input[type=checkbox]: checked + label {
    border: 1px solid gray;
    padding: 3px 5px 3px 5px;
    border-radius: 4px;
    background-color: #cedacd;
    min-width: 120px;

    div {
      visibility: visible;
    }
  }
`;

export const FilterLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterCheckbox = styled.input`
  display: none;
`;

export const UncheckFilter = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseIcon = styled(FaTimes)`
  color: #7a7a7a;
`;
