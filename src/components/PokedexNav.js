import React, { useState, useEffect } from "react";
// Material UI imports
import Toolbar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ShuffleIcon from "@mui/icons-material/Shuffle";
// Compontent and style imports
import { changeToTitleCase } from "../helper.js";
import "../scss/Pokedex.scss";
import SelectGeneration from "./SelectGeneration.js";

// Component styles
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
  transition: theme.transitions.create("width"),
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    "&:focus-within": {
      width: "100%",
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
    "& .icon:focus-within": {
      color: "red"
    },
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
    <Toolbar
      color="primary"
      style={{
        paddingLeft: "12%",
        paddingRight: "12%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
       
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }} className="menu-container">
      <Box mb={2}  style={{display: "flex", width: "100%", justifyContent: "flex-start"}} className="button-container">
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
        </Box>
        <Search style={{ marginLeft: 20 }}>
          <SearchIconWrapper>
            <SearchIcon focusable={true} className="icon"/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={searchLabel}
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
          />
        </Search>
      </Box>
    </Toolbar>
  );
}

export default PokedexNav;
