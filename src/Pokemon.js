// ==== React and Node imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// ==== MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
// ==== Component imports
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";
import Breeding from "./components/Breeding";
import Evolution from "./components/Evolution";
import PokeData from "./components/PokeData";
import Loading from "./components/Loading";
import { blueGrey } from "@mui/material/colors";
import {
  changeToTitleCase,
  convertMeter,
  convertToKilogram,
  convertToPounds,
  // genderRatio,
  convertFeetInches,
  genderFemale,
  genderMale,
} from "./helper";
import "./scss/Pokemon.scss";
// import { ThemeContext } from "@emotion/react";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [description, setDescription] = useState("");
  const [nextPrev, setNextPrev] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // ==== Display variables
  let pounds = convertToPounds(axiosPoke.weight);
  let weight = convertToKilogram(axiosPoke.weight);
  let meter = convertMeter(axiosPoke.height);
  let ftIn = convertFeetInches(axiosPoke.height);

  // Evolution variable to pass from get species info to evolution info
  let api_evolution = "";

  // useNavigate
  const history = useNavigate();

  // ==== Theme and layout variables
  const theme = useTheme();
  const lgBreak = useMediaQuery(theme.breakpoints.only("md"));
  const prvNextWidth = lgBreak ? "66%" : "100%";

  // Component styles
  const NavigationPrev = styled(Button)(({ theme }) => ({
    width: "50%",
    marginTop: "10px",
    color: theme.palette.grey[600],
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.up("lg")]: {
      width: "49%",
    },
    "& span": {
      // color: theme.palette.grey[600]
    },
  }));
  const NavigationNext = styled(Button)(({ theme }) => ({
    width: "50%",
    marginTop: "10px",
    color: theme.palette.grey[600],
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.up("lg")]: {
      width: "49%",
    },
  }));

  const NavigationPlaceholder = styled("div")(({ theme }) => ({
    width: "50%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  }));

  useEffect(() => {
    axiosPokemon();
  }, []);

  const axiosPokemon = async () => {
    try {
      await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        // const { results } = data;
        // console.log(results)
        const newPokemonData = {};
        console.log(data.name)
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
    } catch (err) {
      console.log("loading error", err)
      history('/404-pokemon')
    }
    
  };

  const getSpecies = async () => {
    let pullDescription = [];
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemonSpecies(data);
        api_evolution = data.evolution_chain.url;
        // filter out english blue flavor text and set to state
        pullDescription = data.flavor_text_entries.filter(
          (text) => text.language.name == "en"
        );
        // set first english text available
        setDescription(pullDescription[0].flavor_text);
        // Start next get functions
        getEvolution();
        getNextPrevNames();
      });
  };

  // ==== Get evolution chain names
  const getEvolution = async () => {
    await axios.get(api_evolution).then(function (response) {
      const { data } = response;
      let evoChain = [];
      let evoData = data.chain;

      do {
        let evoDetails = evoData["evolution_details"][0];

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

  const getNextPrevNames = async () => {
    const prevNum = Number(pokemonId) - 1;
    const nextNum = Number(pokemonId) + 1;
    let prevRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${prevNum}`
    );
    let nextRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nextNum}`
    );
    // console.log("prev next");
    // console.log(prevRes.data.name);
    setNextPrev({ previous: prevRes.data.name, next: nextRes.data.name });
  };

  // ==== filter english+blue flavor text ***INACTIVE***
  const filterFlavorText = () => {
    let filteredItems = pokemonSpecies.flavor_text_entries.filter(
      (poke) => poke.language.name == "en" && poke.version.name == "blue"
    );
    // console.log("in filter flavor");
    setDescription(filteredItems);
  };

  // Navigation for next and previous links
  function handlePrev() {
    history(`/${axiosPoke.id - 1}`);
    history(0);
  }

  function handleNext() {
    history(`/${axiosPoke.id + 1}`);
    history(0);
  }

  return (
    <div>
      {isLoaded ? (
        <div>
          <PokemonNav
            name={changeToTitleCase(axiosPoke.name)}
            id={axiosPoke.id}
          />
          <Grid
            container
            sx={{ mt: 8, mx: "auto" }}
            height={50}
            style={{
              width: prvNextWidth,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            {axiosPoke.id === 1 ? (
              <NavigationPlaceholder />
            ) : (
              <NavigationPrev
                className="prev"
                color="inherit"
                onClick={handlePrev}
              >
                <ArrowBackIosIcon />
                {nextPrev.previous}
              </NavigationPrev>
            )}
            {axiosPoke.id === 898 ? (
              <NavigationPlaceholder />
            ) : (
              <NavigationNext
                className="next"
                color="inherit"
                onClick={handleNext}
              >
                {nextPrev.next}
                <ArrowForwardIosIcon />
              </NavigationNext>
            )}
          </Grid>
          <Box
            margin={0}
            marginTop={0}
            style={{ display: "flex", justifyContent: "space-between" }}
            sx={{ p: 0 }}
          >
            <Grid
              container
              spacing={3}
              justifyContent="center"
              columns={{ xs: 12, md: 12, lg: 6 }}
            >
              <Grid item xs={12} sm={10} md={8} lg={3}>
                <Box
                  height="auto"
                  width="auto"
                  style={{ backgroundColor: blueGrey[50] }}
                  sx={{ p: 2, boxShadow: 4 }}
                >
                  <div
                    className={`Pokemon-img-background ${axiosPoke.types[0].type.name}`}
                  >
                    {!axiosPoke.sprites.other.dream_world.front_default ? (
                      <img
                        className="imgAlt"
                        src={axiosPoke.sprites.other.home.front_default}
                      />
                    ) : (
                      <img
                        className="imgPrimary"
                        src={axiosPoke.sprites.other.dream_world.front_default}
                      />
                    )}
                  </div>
                  {description.length === 0 ? (
                    "No description found"
                  ) : (
                    <Typography mt={2} variant="body1">
                      {description}
                    </Typography>
                  )}

                  <Stats stats={axiosPoke.stats} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={3}>
                <Box
                  height="auto"
                  width="auto"
                  style={{ backgroundColor: blueGrey[50] }}
                  sx={{ p: 2, boxShadow: 4 }}
                >
                  <PokeData
                    ftIn={ftIn}
                    meter={meter}
                    weight={weight}
                    pounds={pounds}
                    category={pokemonSpecies.genera[7].genus}
                    types={axiosPoke.types}
                    abilities={axiosPoke.abilities}
                  />
                  <Evolution evolution={evolution} />
                  <Breeding
                    eggCycle={pokemonSpecies.hatch_counter}
                    genderRate={pokemonSpecies.gender_rate}
                    genderMale={genderMale(pokemonSpecies.gender_rate)}
                    genderFemale={genderFemale(pokemonSpecies.gender_rate)}
                    egg={pokemonSpecies.egg_groups}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Pokemon;
