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

  &.container-active {
    border-bottom: 1px solid #cfcfcf;
  }

  @media screen and (max-width: 1000px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media screen and (max-width: 850px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media screen and (max-width: 600px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

export const FilterItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.active {
    border: 1px solid #cfcfcf;
    border-bottom: 2px solid #eaeded;
    margin-bottom: -2px;
    padding: 5px;
  }
`;

export const FilterName = styled.div`
  font-family: "Quicksand", sans-serif;
  font-size: 1.2rem;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding-left: 2px;
    text-align: center;
  }
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

  @media screen and (max-width: 600px) {
    padding: 0;
    width: 100px;
  }
`;

export const SortOption = styled.option`
  cursor: pointer;
`;

export const FilterWrapperContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  box-shadow: 0 30px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 1px;
  font-size: 1rem;
  //margin-left: 400px;
  margin: auto;
  padding-top: 20px;
  margin-left: 300px;
  font-family: "Quicksand", sans-serif;
  align-items: center;

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    justify-content: center;
  }
`;

export const FilterOptions = styled.div`
  input[type=checkbox]: checked + label {
    border: 1px solid gray;
    padding: 3px 5px 3px 5px;
    border-radius: 4px;
    background-color: #cedacd;
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

export const FilterLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;

  @media screen and (max-width: 1100px) {
    padding: 2px;
  }
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

export const PriceRangeContainer = styled.div`
  width: 60%;

  @media screen and (max-width: 1100px) {
    width: 65%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MinPrice = styled.div``;

export const MaxPrice = styled.div``;
