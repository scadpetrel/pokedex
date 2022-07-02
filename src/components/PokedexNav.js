import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
// Compontent and style imports
import { changeToTitleCase } from "../helper.js";
import "../scss/Pokedex.scss";
import Pokecard from "../Pokecard";
import Loading from "../components/Loading";

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
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
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



function PokedexNav({generation, handleGenerationChange, searchLabel, handleSearchChange, handleGetRandomPokemon}) {
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
      justifyContent: "space-between",
     
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box mb={2} sx={{ width: 220 }}>
        <FormControl fullWidth>
          <InputLabel id="select-pokemon-generation">
            Select Generation
          </InputLabel>
          <Select
            labelId="select-pokemon-generation"
            id="select-pokemon"
            value={generation}
            label="Generation I"
            onChange={handleGenerationChange}
            color="secondary"
            style={{ height: 40 }}
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
          </Select>
        </FormControl>
      </Box>
      <Search style={{ marginLeft: 20 }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={searchLabel}
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearchChange}
        />
      </Search>
    </Box>
    <Button
      onClick={handleGetRandomPokemon}
      color="secondary"
      variant="contained"
      sx={{ mb: 2 }}
    >
      Random
    </Button>
  </Toolbar>
  )
}

export default PokedexNav