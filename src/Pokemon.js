// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import PokemonNav from "./components/PokemnNav";
import Stats from "./components/Stats";

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
            <Box width="50%" height={800}>
              <div
                className={`Pokemon-img-background ${axiosPoke.types[0].type.name}`}
              >
                <img src={axiosPoke.sprites.other.dream_world.front_default} />
              </div>
            
                <Stats stats={axiosPoke.stats} />
              
            </Box>
            <Box width="50%" height={800}>
              <div>
                <h4>Characteristics</h4>
                <p>height: {axiosPoke.height}</p>
                <p>weight: {axiosPoke.weight}</p>
                <p>gender - get</p>
                <p>category - get</p>
                <h4>abilities:</h4>
                {axiosPoke.abilities.map((ability) => (
                  <p>{ability.ability.name}</p>
                ))}
              </div>
              <div>
                <h4>type:</h4>
                {axiosPoke.types.map((type) => (
                  <p>{type.type.name}</p>
                ))}
              </div>
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
