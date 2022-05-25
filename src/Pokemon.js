// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";
import Physical from "./components/Physical";
import TypeAbility from "./components/TypeAbility";

import "./scss/Pokemon.scss";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [axiosPoke, setAxiosPoke] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("useEffect pokemon");
    // fetchPokemons()
    axiosPokemon();
  }, []);

  const axiosPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        // const { results } = data;
        // console.log(results)
        const newPokemonData = {};
        // console.log(data.name)
        setAxiosPoke(data);
        setIsLoaded(true);
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

  return (
    <div>
      {isLoaded ? (
        <div>
          <PokemonNav name={axiosPoke.name} id={axiosPoke.id} />
          <Box
            margin={10}
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
              <Physical height={axiosPoke.height} weight={axiosPoke.weight} />
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
