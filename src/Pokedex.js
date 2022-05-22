import React, { useState, useEffect } from "react";
import Pokecard from "./Pokecard";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
// import { styled } from "@mui/material/styles";
import "./scss/Pokedex.scss";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState([
    "https://pokeapi.co/api/v2/pokemon",
  ]);
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);
    // console.log(data.results)

    function fetchDetails(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setPokemons((curState) => [...curState, data]);
      });
    }

    fetchDetails(data.results);
  };

  const handleSearchChange = (evt) => {
    setFilter(evt.target.value);
  };

  useEffect(() => {
    console.log("useEffect again");
    // fetchPokemons()
    axiosPokemon();
  }, []);

  const handleLoadMore = () => {
    fetchPokemons();
  };
  // axios fetch from pokeapi.co
  const axiosPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
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
          newPokemonData[idx + 1] = {
            id: idx + 1,
            name: response.data.name,
          };
        });
        setIsLoaded(true);
        // setAxiosPoke(newPokemonData)
      });
  };

  // make first letter toUpperCase
  const changeToTitleCase = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  axiosPoke.map((el) => console.log(el.types[1]));
  return (
    <>
      <Box sx={{ height: 100, flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <Box sx={{ height: 75, display: "flex", alignItems: "flex-end" }}>
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
                </Search>{" "}
                Pokedex
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {isLoaded ? (<Grid container spacing={3}>
        {axiosPoke.map(
          (item) =>
            item.name.includes(filter) && (
              <Pokecard
                key={item.id}
                name={item.name}
                img={item.sprites.other.dream_world.front_default}
                type={item.types[0].type.name}
                type2={item.types[1] ? item.types[1].type.name : ""}
                number={item.id}
              />
            )
        )}
      </Grid>) : (<CircularProgress />)}
      
      {/* <div className="Pokedex"></div> */}
      {/* <button onClick={handleLoadMore}>Load More</button> */}
    </>
  );
};

export default Pokedex;
