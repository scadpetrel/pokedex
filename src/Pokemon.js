// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';  
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";
import Breeding from "./components/Breeding";
import Evolution from "./components/Evolution";
import PokeData from "./components/PokeData";
import { blueGrey, grey } from "@mui/material/colors";
import {
  changeToTitleCase,
  convertToMeeter,
  convertToKilogram,
  convertHeight,
  genderRatio,
} from "./helper";
import "./scss/Pokemon.scss";
import { ThemeContext } from "@emotion/react";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const navigate = useNavigate();
  // let height = convertToMeeter(axiosPoke.height);
  // let name = changeToTitleCase(axiosPoke.name);
  let weight = convertToKilogram(axiosPoke.weight);
  let height2 = convertHeight(axiosPoke.height);
  let gender = genderRatio(pokemonSpecies.gender_rate);
  let api_evolution = "";

  const history = useNavigate();

  const theme = useTheme();
  const lgBreak = useMediaQuery(theme.breakpoints.only('md'));
  const prvNextWidth = (lgBreak ? "66%" : "100%");

  useEffect(() => {
    // fetchPokemons()
    axiosPokemon();
    // getSpecies()
  }, []);

  const axiosPokemon = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        // const { results } = data;
        // console.log(results)
        const newPokemonData = {};
        // console.log(data.name)
        setAxiosPoke(data);
        getSpecies();
        // results.forEach((p, idx) => {
        // axios
        //   .get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`)
        //   .then(function (response) {
        //     const { data } = response;
        //     // console.log(data)
        //     setAxiosPoke(curState => [...curState, data])
        //   })
        //   newPokemonData[idx + 1] = {
        //     id: idx + 1,
        //     name: response.data.name,

        //   }
        // })
        // setAxiosPoke(newPokemonData)
      });
  };

  const getSpecies = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        console.log(data);
        setPokemonSpecies(data);
        api_evolution = data.evolution_chain.url;
        console.log(api_evolution);
        // setTimeout(getEvolution, 500)
        getEvolution();
      });
  };

  // need to rework URL
  const getEvolution = async () => {
    await axios.get(api_evolution).then(function (response) {
      const { data } = response;
      console.log(data);
      // console.log(pokemonSpecies.evolution_chain.url)
      var evoChain = [];
      var evoData = data.chain;

      do {
        var evoDetails = evoData["evolution_details"][0];

        evoChain.push({
          species_name: evoData.species.name,
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      setEvolution(evoChain);
    });
    setIsLoaded(true);
  };

  function handlePrev(){
    history(`/${axiosPoke.id -1}`)
    history(0)
  }

  function handleNext(){
    history(`/${axiosPoke.id +1}`)
    history(0)
  }

  return (
    <div>
      {isLoaded ? (
        <div>
          <PokemonNav
            name={changeToTitleCase(axiosPoke.name)}
            id={axiosPoke.id}
          />
          <Grid container sx={{ mt: 15, mx: "auto" }} height={50} style={{ width: prvNextWidth,  display: "flex", justifyContent: "space-between" }}>
        
          <Button color="inherit" onClick={handlePrev}><ArrowBackIosIcon/>Prev</Button>
          
          <Button color="inherit" onClick={handleNext}>Next<ArrowForwardIosIcon/></Button>
          </Grid>
          <Box
            margin={0}
            marginTop={0}
            style={{ display: "flex", justifyContent: "space-between" }}
            sx={{ p: 0 }}
          >
            {/* <Button color="inherit" onClick={handlePrev}><ArrowBackIosIcon/></Button> */}
            <Grid
              container
              spacing={3}
              justifyContent="center"
              columns={{ xs: 12, md: 12, lg: 6 }}
            >
              <Grid item xs={12} sm={10} md={8} lg={3}>
                <Box
                  // marginRight={2}
                  // width="50%"
                  height="auto"
                  width="auto"
                  style={{ backgroundColor: blueGrey[50] }}
                  sx={{ p: 2, boxShadow: 4 }}
                >
                  <div
                    className={`Pokemon-img-background ${axiosPoke.types[0].type.name}`}
                  >
                    <img
                      src={axiosPoke.sprites.other.dream_world.front_default}
                    />
                  </div>
                  <Stats stats={axiosPoke.stats} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={3}>
                <Box
                  // marginLeft={2}
                  // width="50%"
                  height="auto"
                  width="auto"
                  style={{ backgroundColor: blueGrey[50] }}
                  sx={{ p: 2, boxShadow: 4 }}
                >
                  <PokeData
                    height={height2}
                    weight={weight}
                    category={pokemonSpecies.genera[7].genus}
                    types={axiosPoke.types}
                    abilities={axiosPoke.abilities}
                  />
                  <Evolution evolution={evolution} />
                  <Breeding
                    eggCycle={pokemonSpecies.hatch_counter}
                    gender={gender}
                    // category={pokemonSpecies.genera[7].genus}
                    egg={pokemonSpecies.egg_groups}
                  />
                  
                </Box>
              </Grid>
            </Grid>
            {/* <Button color="inherit" onClick={handleNext}><ArrowForwardIosIcon/></Button> */}
          </Box>
        </div>
      ) : (
        <div>
        <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Pokemon;
