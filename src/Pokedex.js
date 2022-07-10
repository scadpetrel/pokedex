import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// Material UI imports
// Compontent and style imports
import PokedexNav from "./components/PokedexNav";
import { changeToTitleCase } from "./helper.js";
import Pokecard from "./Pokecard";
import Loading from "./components/Loading";
import { PokedexGrid, PokedexItemWrapperGrid, LoadingContainer } from "./PokedexStyles";

// use router to get the id from the url

const Pokedex = () => {
  const { id } = useParams();
  // const savePokemon = JSON.parse(localStorage.getItem("pokemon"));
  const history = useNavigate();
  // All Pokemon data
  const [pokemon, setPokemon] = useState([]);
  // Current displayed generation
  const [generationFilter, setGenerationFilter] = useState([]);
  const [generationFilter2, setGenerationFilter2] = useState([]);
  // Search field
  const [filter, setFilter] = useState("");
  // Generation number for switch statement - could refactor and use something else
  const [generation, setGeneration] = useState(id);
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
  // fetch all pokemon
  useEffect(() => {
    getPokemon();
    console.log("getPokemon");
  }, []);

  // filter to selected generation and
  // save api fetch to local storage
  useEffect(() => {
    // console.log(generationId)
    // filterRange(pokemon, 1, 151)
    
    // handleGenerationChange(Number(generation));
   
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    // setGenerationFilter2((curState) => [
    //   ...curState,
    //   {
    //     id: initialPokemon.id,
    //     name: initialPokemon.name,
    //     img: initialPokemon.img,
    //     imgAlt: initialPokemon.imgAlt,
    //     types: initialPokemon.types,
    //   },
    // ]);
    
    window.localStorage.setItem("pokemon", JSON.stringify(pokemon));
    console.log("Saving to local storage");

  }, [pokemon]);

  const pickRandomNumber = () => {
    console.log("in random");
    const randNumber = Math.floor(Math.random() * 898) + 1;
    console.log(randNumber);
    return randNumber;
  };

  // ****DEPRECIATED****
  const filterRange = (arr, a, b) => {
    let result = arr.filter((item) => a <= item.id && item.id <= b);
    console.log("filtering");
    setGenerationFilter((curState) => [...result]);
  };
  // ****DEPRECIATED****
  const handleFilterClick = (arr, a, b) => {
    filterRange(arr, a, b);
  };
  // ****DEPRECIATED****
  const handleGenerationChange = async (value) => {
    console.log("generation change: ", value);
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
      setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
 
  };

  // switch statement to filter by generation using url param to create offset and limit
  const getApiLimitAndOffset = (value) => {
    switch (value) {
      case 1:
        return { limit: 151, offset: 0 };
      case 2:
        return { limit: 100, offset: 151 };
      case 3:
        return { limit: 135, offset: 251 };
      case 4:
        return { limit: 107, offset: 386 };
      case 5:
        return { limit: 156, offset: 493 };
      case 6:
        return { limit: 72, offset: 649 };
      case 7:
        return { limit: 88, offset: 721 };
      case 8:
        return { limit: 89, offset: 809 };
      default:
        return { limit: 898, offset: 0 };
    }
  }

 const apiQuery = getApiLimitAndOffset(Number(generation));
//  console.log(`limit=${apiQuery.limit}&offset=${apiQuery.offset}`);

  // Gen I limit=151&offset=0
  // Gen II limit=100&offset=151
  // Gen III limit=135&offset=251
  // Gen IV limit=107&offset=386
  // Gen V limit=156&offset=493
  // Gen VI limit=72&offset=649
  // Gen VII limit=88&offset=721
  // Gen VIII limit=89&offset=809

  const getPokemon = async () => {
    try {
      // get list of pokemon names
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${apiQuery.limit}&offset=${apiQuery.offset}`);
      let data = await res.data.results;      // get additional details from new endpoint
      data.forEach(async (p, idx) => {
        let details = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${p.name}`
        );
        let pkmn = details.data;
        setPokemon((curState) => [
          ...curState,
          {
            id: pkmn.id,
            name: pkmn.name,
            // sprites: pkmn.sprites,
            types: pkmn.types,
            img: pkmn.sprites.other.dream_world.front_default,
            imgAlt: pkmn.sprites.other.home.front_default,
            // type: pkmn.types[0].type.name,
            // type2: pkmn.types[1].type.name,
          },
        ]);
        // set initial state for gen 1
      });
      // for (let i = 0; i <= 150; i++) {
      //   let loadGroup = await axios.get(
      //     `https://pokeapi.co/api/v2/pokemon/${i + 1}`
      //   );
      //   setGenerationFilter((curState) => [
      //     ...curState,
      //     {
      //       id: loadGroup.data.id,
      //       name: loadGroup.data.name,
      //       sprites: loadGroup.data.sprites,
      //       types: loadGroup.data.types,
      //     },
      //   ]);
      // }
      // setSearchLabel("Search Gen I...");
    } catch (err) {
      console.error(err);
    }
    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 100);
  };

  return (
    <div className="DexContainer" >
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
          className="pokedex"
        >
          {pokemon
            .sort((a, b) => a.id - b.id)
            .map(
              (item) =>
                item.name.includes(filter) && (
                  <PokedexItemWrapperGrid key={item.name + "-" + item.id} item>
                    <Pokecard
                      key={item.id}
                      name={changeToTitleCase(item.name)}
                      // img={item.sprites.other.dream_world.front_default}
                      img={item.img}
                      // imgAlt={item.sprites.other.home.front_default}
                      imgAlt={item.imgAlt}
                      type={item.types[0].type.name}
                      type2={item.types[1] ? item.types[1].type.name : ""}
                      number={item.id}
                    />
                  </PokedexItemWrapperGrid>
                )
            )}
        </PokedexGrid>
      ) : (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
      )}
    </div>
  );
};

export default Pokedex;
