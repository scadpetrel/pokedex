import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Material UI imports
import Grid from "@mui/material/Grid";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
// Compontent and style imports
import PokedexNav from "./components/PokedexNav";
import { changeToTitleCase } from "./helper.js";
import Pokecard from "./Pokecard";
import Loading from "./components/Loading";

const PokedexGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "80vw",
  margin: "0 auto",
  padding: "0",
}));

const Pokedex = () => {
  const history = useNavigate();
  // All Pokemon data
  const [pokemon, setPokemon] = useState([]);
  // Current displayed generation
  const [generationFilter, setGenerationFilter] = useState([]);
  // Search field
  const [filter, setFilter] = useState("");
  // Generation number for switch statement - could refactor and use something else
  const [generation, setGeneration] = useState(1);
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
    console.log("random pokemon: ", randPokemon);
  }

  useEffect(() => {
    getPokemon();
    console.log("useEffect: getPokemon");
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

  const handleGenerationChange = (value) => {
    console.log("generation change: ", typeof(value));
    switch (value) {
      case 1:
        filterRange(pokemon, 1, 151);
        setSearchLabel("Search Gen I...");
        break;
      case 2:
        filterRange(pokemon, 152, 251);
        setSearchLabel("Search Gen II...");
        break;
      case 3:
        filterRange(pokemon, 252, 386);
        setSearchLabel("Search Gen III...");
        break;
      case 4:
        filterRange(pokemon, 387, 493);
        setSearchLabel("Search Gen IV...");
        break;
      case 5:
        filterRange(pokemon, 494, 649);
        setSearchLabel("Search Gen V...");
        break;
      case 6:
        filterRange(pokemon, 650, 721);
        setSearchLabel("Search Gen VI...");
        break;
      case 7:
        filterRange(pokemon, 722, 809);
        setSearchLabel("Search Gen VII...");
        break;
      case 8:
        filterRange(pokemon, 810, 898);
        setSearchLabel("Search Gen VIII...");
        break;
      default:
        filterRange(pokemon, 1, 898);
        setSearchLabel("Search All...");
    }
    setGeneration(value);
      setIsLoaded(true);
 
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
    }, 100);
  };

  return (
    <>
      <PokedexNav
        generation={generation}
        handleGenerationChange={handleGenerationChange}
        searchLabel={searchLabel}
        handleSearchChange={handleSearchChange}
        handleGetRandomPokemon={handleGetRandomPokemon}
        setIsLoaded={setIsLoaded}
      />
      {isLoaded ? (
        <PokedexGrid
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
        </PokedexGrid>
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
