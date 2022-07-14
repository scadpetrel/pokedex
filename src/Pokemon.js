// ==== React and Node imports
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// ==== MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
// ==== Component imports
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";
import Breeding from "./components/Breeding";
import Evolution from "./components/Evolution";
import PokeData from "./components/PokeData";
import Loading from "./components/Loading";
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
import { cardGradients } from "./helpers/colorVariables";
import {
  NavigatePrevNextContainer,
  NavigationPrev,
  NavigationNext,
  NavigationPlaceholder,
  PokemonImage,
  PokemonPageContainer,
} from "./PokemonStyles";
import { LoadingContainer } from "./PokedexStyles";
// import { ThemeContext } from "@emotion/react";

const Pokemon = (props) => {
  const { pokemonId } = useParams();
  const [id, setId] = useState(pokemonId);
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
  let api_evolution = useRef();

  // useNavigate
  const navigate = useNavigate();

  // ==== Theme and layout variables
  // const theme = useTheme();
  // const lgBreak = useMediaQuery(theme.breakpoints.only("md"));
  // const prvNextWidth = lgBreak ? "66%" : "100%";
  
  useEffect(() => {
    if (Number(id) > 898 || Number(id) < 1) {
      navigate('/404-pokemon')
    }
    const axiosPokemon = async () => {
      try {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(function (response) {
            const { data } = response;
            setAxiosPoke(data);
          });
        getSpecies();
      } catch (err) {
        console.log("loading error", err);
        navigate("/404-pokemon");
      }
    };
    axiosPokemon();
    const getSpecies = async () => {
      let pullDescription = [];
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then(function (response) {
          const { data } = response;
          setPokemonSpecies(data);
          api_evolution.current = data.evolution_chain.url;
          // filter out english blue flavor text and set to state
          pullDescription = data.flavor_text_entries.filter(
            (text) => text.language.name === "en"
          );
          // set first english text available
          setDescription(pullDescription[0].flavor_text);
          // Start next get functions
        });
      getEvolution();
      getNextPrevNames();
    };
  
    // ==== Get evolution chain names
    const getEvolution = async () => {
      await axios.get(api_evolution.current).then(function (response) {
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
      let pokemonNumber = Number(id);
      const prevNum = Number(id) - 1;
      const nextNum = Number(id) + 1;
      let prevRes = '';
      let nextRes = '';

      async function getPrevious(){
        return prevRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${prevNum}`
        );
      }
      async function getNext(){
        return nextRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nextNum}`
        );
      }
      // do not fetch for previous on 1 and do not fetch next on 898
      switch (pokemonNumber) {
        case 1:
          await getNext()
          setNextPrev({ previous: null, next: nextRes.data.name });
          break;
        case 898:
          await getPrevious()
          setNextPrev({ previous: prevRes.data.name, next: null });
          break;
        default:
          await getNext()
          await getPrevious()
          setNextPrev({ previous: prevRes.data.name, next: nextRes.data.name });
      }
    };
    // for navigate to 404 page
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    // console.log("pokemon ID changed")
    setId(pokemonId);
  }, [pokemonId]);

  

  // Navigation for next and previous links
  function handlePrev() {
    navigate(`/pokemon/${axiosPoke.id - 1}`);
    // navigate(0);
  }

  function handleNext() {
    navigate(`/pokemon/${axiosPoke.id + 1}`);
    // navigate(0);
  }

  return (
    <div>
      {isLoaded ? (
        <div>
          <PokemonNav
            name={changeToTitleCase(axiosPoke.name)}
            id={axiosPoke.id}
          />
          <NavigatePrevNextContainer
            container
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
          </NavigatePrevNextContainer>
          <PokemonPageContainer>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              columns={{ xs: 12, md: 12, lg: 6 }}
            >
              <Grid item xs={12} sm={10} md={8} lg={3}>
                <Box className="Pokemon-info-container">
                  <PokemonImage
                    style={{
                      background: `${
                        cardGradients[axiosPoke.types[0].type.name]
                      }`,
                    }}
                    className={`Pokemon-img-background ${axiosPoke.types[0].type.name}`}
                  >
                    {!axiosPoke.sprites.other.dream_world.front_default ? (
                      <img
                        className="imgAlt"
                        alt={`${axiosPoke.name} artwork`}
                        src={axiosPoke.sprites.other.home.front_default}
                      />
                    ) : (
                      <img
                        className="imgPrimary"
                        alt={`${axiosPoke.name} artwork`}
                        src={axiosPoke.sprites.other.dream_world.front_default}
                      />
                    )}
                  </PokemonImage>
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
                <Box className="Pokemon-info-container">
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
          </PokemonPageContainer>
        </div>
      ) : (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </div>
  );
};

export default Pokemon;
