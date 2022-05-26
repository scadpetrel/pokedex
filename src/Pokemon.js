// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";
import Physical from "./components/Physical";
import Evolution from "./components/Evolution";
import TypeAbility from "./components/TypeAbility";
import {
  changeToTitleCase,
  convertToMeeter,
  convertToKilogram,
  convertHeight,
  genderRatio,
} from "./helper";
import "./scss/Pokemon.scss";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const navigate = useNavigate();
  // let height = convertToMeeter(axiosPoke.height);
  let name = changeToTitleCase("bob");
  let weight = convertToKilogram(axiosPoke.weight);
  let height2 = convertHeight(axiosPoke.height);
  let gender = genderRatio(pokemonSpecies.gender_rate);
  let api_evolution = ''

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
        console.log(api_evolution)
        
        // setTimeout(getEvolution, 500)
        getEvolution();
      });
  };

  // need to rework URL
  const getEvolution = async () => {
    // if(isLoaded){
      
    await axios
      .get(api_evolution)
      .then(function (response) {
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
    // }
  };

  return (
    <div>
      {isLoaded ? (
        <div>
          <PokemonNav name={name} id={axiosPoke.id} />
          <Box
            margin={0}
            marginTop={15}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box marginRight={2} width="50%" height={800}>
              <div
                className={`Pokemon-img-background ${axiosPoke.types[0].type.name}`}
              >
                <img src={axiosPoke.sprites.other.dream_world.front_default} />
              </div>
              <Stats stats={axiosPoke.stats} />
            </Box>
            <Box marginLeft={2} width="50%" height={800}>
              <Evolution evolution={evolution}/>
              <Physical
                height={height2}
                weight={weight}
                gender={gender}
                category={pokemonSpecies.genera[7].genus}
              />
              <TypeAbility
                types={axiosPoke.types}
                abilities={axiosPoke.abilities}
              />
            </Box>
          </Box>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Pokemon;
