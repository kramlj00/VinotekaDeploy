import React from "react";
import vino from "../../images/vino.jpg";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Image,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
} from "./WinesElements";
import ToggleFilters from "../../features/toggleFilters";
import WineProduct from "../AllWineProducts/WineProduct";

function Wines() {
  return (
    <Container>
      <Image>
        <img src={vino} alt="vino" />
      </Image>
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput type="text" placeholder="Pretraži vina" autoFocus />
      </SearchContainer>
      <ToggleFilters />
      <WineProduct />
    </Container>
  );
}

export default Wines;
