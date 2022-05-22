// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

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
          <h3>{`Pokemon ${pokemonId}`}</h3>
          <h2>{axiosPoke.name}</h2>
          <img src={axiosPoke.sprites.other.dream_world.front_default} />
          <div>
            type:
            {axiosPoke.types.map((type) => (
              <p>{type.type.name}</p>
            ))}
          </div>
          <p>height: {axiosPoke.height}</p>
          <p>weight: {axiosPoke.weight}</p>
          <div>
            abilities:
            {axiosPoke.abilities.map((ability) => (
              <p>{ability.name}</p>
            ))}
          </div>
          <div>Stats: {axiosPoke.stats.map(stat => (
            <p>{stat.stat.name}: {stat.base_stat}</p>
          ))}</div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Pokemon;
