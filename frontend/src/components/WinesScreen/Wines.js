import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Image,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
} from "./WinesElements";
import ToggleFilters from "../../functions/toggleFilters";
import WineProduct from "../AllWineProducts/WineProduct";

function Wines({ props }) {
  return (
    <>
      <Image src="/images/vino.jpg" />
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput type="text" placeholder="Pretraži vina" autoFocus />
      </SearchContainer>
      <ToggleFilters />
      <WineProduct props={props} />
    </>
  );
}

export default Wines;
