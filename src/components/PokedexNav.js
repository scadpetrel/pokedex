import React, { useState, useEffect } from "react";
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
      <Box
        className="menu-container"
      >
        <PokedexToolbarButtonContainer className="button-container">
          <SelectGeneration
            generation={generation}
            handleGenerationChange={handleGenerationChange}
            setIsLoaded={setIsLoaded}
            width={width}
          />
          {/* <FormControl fullWidth> */}
          {/* <InputLabel id="select-pokemon-generation">
              Select Generation
            </InputLabel>
            <GenerationSelect
              labelId="select-pokemon-generation"
              id="select-pokemon"
              value={generation}
              label="Generation I"
              onChange={handleGenerationChange}
              color="secondary"
             
            >
              <MenuItem value={1}>Generation I</MenuItem>
              <MenuItem value={2}>Generation II</MenuItem>
              <MenuItem value={3}>Generation III</MenuItem>
              <MenuItem value={4}>Generation IV</MenuItem>
              <MenuItem value={5}>Generation V</MenuItem>
              <MenuItem value={6}>Generation VI</MenuItem>
              <MenuItem value={7}>Generation VII</MenuItem>
              <MenuItem value={8}>Generation VIII</MenuItem>
              <MenuItem value={9}>All Generations</MenuItem>
            </GenerationSelect> */}
          {/* </FormControl> */}
          <RandomButton
            onClick={handleGetRandomPokemon}
            color="secondary"
            variant="contained"
            sx={{ mb: 0 }}
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
