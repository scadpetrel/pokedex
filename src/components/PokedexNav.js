import React, { useState } from "react";
// Material UI imports
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
// Compontent and style imports
import SelectGeneration from "./SelectGeneration.js";
import {
  PokedexToolbar,
  PokedexToolbarButtonContainer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  RandomButton,
} from "./PokedexNavStyles.js";

function PokedexNav({
  generation,
  handleGenerationChange,
  searchLabel,
  handleSearchChange,
  handleGetRandomPokemon,
  setIsLoaded,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <PokedexToolbar color="primary">
      <Box className="menu-container">
        <PokedexToolbarButtonContainer className="button-container">
          <SelectGeneration
            generation={generation}
            handleGenerationChange={handleGenerationChange}
            setIsLoaded={setIsLoaded}
            width={width}
          />
          <RandomButton
            onClick={handleGetRandomPokemon}
            color="secondary"
            variant="contained"
          >
            {width < 600 ? <ShuffleIcon /> : "Random"}
          </RandomButton>
        </PokedexToolbarButtonContainer>
        <Search>
          <SearchIconWrapper>
            <SearchIcon focusable={true} className="icon" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={searchLabel}
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
          />
        </Search>
      </Box>
    </PokedexToolbar>
  );
}

export default PokedexNav;
