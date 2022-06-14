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
import { changeToTitleCase } from "./helper.js";
import "./scss/Pokedex.scss";
import Pokecard from "./Pokecard";
import Loading from "./components/Loading";

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

const Pokedex = () => {
  const history = useNavigate();
  // const [pokemons, setPokemons] = useState([]);
  // const [loadMore, setLoadMore] = useState([
  //   "https://pokeapi.co/api/v2/pokemon",
  // ]);

  // All Pokemon data
  const [pokemon, setPokemon] = useState([]);
  // Current displayed generation
  const [generationFilter, setGenerationFilter] = useState([]);
  // Search field
  const [filter, setFilter] = useState("");
  // Generation number for switch statement - could refactor and use something else 
  const [generation, setGeneration] = React.useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  // Generation name for search
  const [searchLabel, setSearchLabel] = useState("");

  const handleSearchChange = (evt) => {
    setFilter(evt.target.value.toLowerCase());
  };

  function handleGetRandomPokemon() {
    let randPokemon = pickRandomNumber();
    history(`pokemon/${randPokemon}`);
    // history(0)
  }

  useEffect(() => {
    getPokemon();
  }, []);

  const pickRandomNumber = () => {
    console.log("in random");
    const randNumber = Math.floor(Math.random() * 898) + 1;
    console.log(randNumber);
    return randNumber;
  };

  const filterRange = (arr, a, b) => {
    let result = arr.filter((item) => a <= item.id && item.id <= b);
    console.log("filtering");
    setGenerationFilter((curState) => [...result]);
  };
  // ****DEPRECIATED****
  const handleFilterClick = (arr, a, b) => {
    filterRange(arr, a, b);
  };

  const handleGenerationChange = (event) => {
    switch (event.target.value) {
      case 1:
        handleFilterClick(pokemon, 1, 151);
        setSearchLabel("Search Gen I...");
        break;
      case 2:
        handleFilterClick(pokemon, 152, 251);
        setSearchLabel("Search Gen II...");
        break;
      case 3:
        handleFilterClick(pokemon, 252, 386);
        setSearchLabel("Search Gen III...");
        break;
      case 4:
        handleFilterClick(pokemon, 387, 493);
        setSearchLabel("Search Gen IV...");
        break;
      case 5:
        handleFilterClick(pokemon, 494, 649);
        setSearchLabel("Search Gen V...");
        break;
      case 6:
        handleFilterClick(pokemon, 650, 721);
        setSearchLabel("Search Gen VI...");
        break;
      case 7:
        handleFilterClick(pokemon, 722, 809);
        setSearchLabel("Search Gen VII...");
        break;
      case 8:
        handleFilterClick(pokemon, 810, 898);
        setSearchLabel("Search Gen VIII...");
        break;
      default: 
        handleFilterClick(pokemon, 1, 898);
        setSearchLabel("Search All...");

    }

    setGeneration(event.target.value);
  };

  const getPokemon = async () => {
    try {
      // get list of pokemon names
      let res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=898");
      // console.log(res.data.results);
      let data = res.data.results;
      // get additional details from new endpoint
      data.forEach(async (p, idx) => {
        let details = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${idx + 1}`
        );
        let pkmn = details.data;
        setPokemon((curState) => [
          ...curState,
          {
            id: pkmn.id,
            name: pkmn.name,
            sprites: pkmn.sprites,
            types: pkmn.types,
          },
        ]);
        // set initial state for gen 1
      });
      for (let i = 0; i <= 150; i++) {
        let loadGroup = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i + 1}`
        );
        setGenerationFilter((curState) => [
          ...curState,
          {
            id: loadGroup.data.id,
            name: loadGroup.data.name,
            sprites: loadGroup.data.sprites,
            types: loadGroup.data.types,
          },
        ]);
      }
      setSearchLabel("Search Gen I...");
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 2300);
  };

  return (
    <>
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
      {isLoaded ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "100px" }}
          className="pokedex"
        >
          {generationFilter
            .sort((a, b) => a.id - b.id)
            .map(
              (item) =>
                item.name.includes(filter) && (
                  <Grid key={item.name + "-" + item.id} item>
                    <Pokecard
                      key={item.id}
                      name={changeToTitleCase(item.name)}
                      img={item.sprites.other.dream_world.front_default}
                      imgAlt={item.sprites.other.home.front_default}
                      type={item.types[0].type.name}
                      type2={item.types[1] ? item.types[1].type.name : ""}
                      number={item.id}
                    />
                  </Grid>
                )
            )}
        </Grid>
      ) : (
        <>
          <Box
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </Box>
        </>
      )}
    </>
  );
};

export default Pokedex;
