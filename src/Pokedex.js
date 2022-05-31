import React, { useState, useEffect } from "react";
import Pokecard from "./Pokecard";
import Loading from './components/Loading'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
// import CircularProgress from "@mui/material/CircularProgress";
// import { styled } from "@mui/material/styles";
import { changeToTitleCase } from "./helper.js";
import "./scss/Pokedex.scss";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  // const theme = useTheme();
  // const [pokemons, setPokemons] = useState([]);
  // const [loadMore, setLoadMore] = useState([
  //   "https://pokeapi.co/api/v2/pokemon",
  // ]);
  const [pokemon, setPokemon] = useState([]);
  // will decomission axiosPoke after refactor
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [filter, setFilter] = useState("");
  const [generationFilter, setGenerationFilter] = useState([]);
  const [generation, setGeneration] = React.useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayAll, setDisplayAll] = useState(true);

  let displayGroup = displayAll ? pokemon : generationFilter;

  const handleSearchChange = (evt) => {
    setFilter(evt.target.value.toLowerCase());
  };

  useEffect(() => {
    // axiosPokemon();
    getPokemon();
  }, []);

  const filterRange = (arr, a, b) => {
    // setGenerationFilter([]);
    let result = arr.filter((item) => a <= item.id && item.id <= b);
    console.log("filtering");

    setGenerationFilter((curState) => [...result]);
    console.log(result);
    setDisplayAll(false);
  };
// ****DEPRECIATED****
  const handleFilterClick = (arr, a, b) => {
    filterRange(arr, a, b);
  };

  const handleGenerationChange = (event) => {
    switch (event.target.value) {
      case 1:
        handleFilterClick(pokemon, 1, 151);
        break;
      case 2:
        handleFilterClick(pokemon, 152, 251);
        break;
      case 3:
        handleFilterClick(pokemon, 252, 386);
        break;
      case 4:
        handleFilterClick(pokemon, 387, 493);
        break;
      case 5:
        handleFilterClick(pokemon, 494, 649);
        break;
      case 6:
        handleFilterClick(pokemon, 650, 721);
        break;
      case 7:
        handleFilterClick(pokemon, 722, 809);
        break;
      case 8:
        handleFilterClick(pokemon, 810, 898);
        break;
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
        // console.log(pkmn)
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
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      // filterRange(pokemon, 1, 151);
      setIsLoaded(true);
    }, 2300);
  };

  // axios fetch from pokeapi.co ***DEPRECIATED***
  const axiosPokemon = async () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=898")
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        // console.log(results)
        const newPokemonData = {};
        results.forEach((p, idx) => {
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`)
            .then(function (response) {
              const { data } = response;
              // console.log(data)
              setAxiosPoke((curState) => [...curState, data]);
            });
          // newPokemonData[idx + 1] = {
          //   id: idx + 1,
          //   name: response.data.name,
          // };
        });
        // filterRange(axiosPoke, 1, 898)

        // setAxiosPoke(newPokemonData)
      });

    setIsLoaded(true);
  };

  // axiosPoke.map((el) => console.log(el.types[1]));
  return (
    <>
      <AppBar position="fixed">
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
          <Box mb={2} sx={{ width: 220, }}>
            <FormControl fullWidth>
              <InputLabel id="select-pokemon-generation">Generation</InputLabel>
              <Select
                labelId="select-pokemon-generation"
                id="select-generation"
                value={generation}
                label="Generation I"
                onChange={handleGenerationChange}
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
              </Select>
            </FormControl>
          </Box>
          {/* <div> */}
          {/* <Box sx={{ height: 75, display: "flex", alignItems: "flex-end" }}> */}
          {/* <SearchIcon sx={{ color: "action.active", mr: 1, my: 1 }} /> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
          {/* </Box> */}
          {/* </div> */}
          {/* <div> */}
          
          {/* </div> */}
        </Toolbar>
      </AppBar>

      {isLoaded ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "100px" }}
        >
          {generationFilter
            .sort((a, b) => a.id - b.id)
            .map(
              (item) =>
                item.name.includes(filter) && (
                  <Grid item>
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
            {/* <CircularProgress style={{ color: "black" }} /> */}
            <Loading/>
          </Box>
        </>
      )}
    </>
  );
};

export default Pokedex;
