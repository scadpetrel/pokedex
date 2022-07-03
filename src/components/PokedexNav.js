import React, { useState, useEffect } from "react";
// Material UI imports
import Toolbar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
// Compontent and style imports
import { changeToTitleCase } from "../helper.js";
import SelectGeneration from "./SelectGeneration.js";

// Component styles

const PokedexToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "0 4rem",
  height: "80px",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  [theme.breakpoints.down("lg")]: {
    padding: "0 3rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0 2rem",
    height: "75px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "65px",
  },
}));

const PokedexToolbarButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginLeft: 0,
  width: "atuo",
  transition: theme.transitions.create(["width", "display"]),
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    "&:focus-within": {
      width: "100%",
      "& svg": {
        display: "none",
      },
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 1.5),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("sm")]: {
      "&:focus-within": {
        paddingLeft: ".6rem",
      },
    },
  },
}));

const RandomButton = styled(Button)(({ theme }) => ({
  width: "auto",
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    // width: "1px",
  },
}));

// const GenerationSelect = styled(Select)(({ theme }) => ({
//   height: 40,
//   width: "10rem",
//   transition: theme.transitions.create("width"),
//   [theme.breakpoints.down("sm")]: {
//     width: "3rem",
//     "&:focus-visible": {
//       width: "10rem",
//     },
//   },
// }));

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
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
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
        <Search style={{ marginLeft: 20 }}>
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
