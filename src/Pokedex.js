import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// Compontent and style imports
import PokedexNav from "./components/PokedexNav";
import { changeToTitleCase } from "./helper.js";
import Pokecard from "./Pokecard";
import Loading from "./components/Loading";
import { PokedexGrid, PokedexItemWrapperGrid, LoadingContainer } from "./PokedexStyles";
import { NotificationContext } from "./context/notificationContext";

const Pokedex = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const [pokemon, setPokemon] = useState([]); // All Pokemon data
  const [filter, setFilter] = useState("");  // Search field
  const [generation, setGeneration] = useState(id); // Current generation number. Was used for switch statement. Could be regular variable now.
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");   // Generation name for search

  const notificationCtx = useContext(NotificationContext);

  const handleSearchChange = (evt) => {
    setFilter(evt.target.value.toLowerCase());
  };
  function handleGetRandomPokemon() {
    let randPokemon = pickRandomNumber();
    history(`/pokemon/${randPokemon}`);
    console.log("random pokemon: ", randPokemon);
  }
  // **** fetch all pokemon
  useEffect(() => {
    setPokemon([]);
    
    // **** Generation limit, offset and serach label for select menu. Passed to getPokemon function to fetch a genearation and set search label.
  const getApiLimitAndOffset = (value) => {
    switch (value) {
      case 1:
        return { limit: 151, offset: 0, searchLabel: "Search Gen I..." };
      case 2:
        return { limit: 100, offset: 151, searchLabel: "Search Gen II..." };
      case 3:
        return { limit: 135, offset: 251, searchLabel: "Search Gen III..." };
      case 4:
        return { limit: 107, offset: 386, searchLabel: "Search Gen IV..." };
      case 5:
        return { limit: 156, offset: 493, searchLabel: "Search Gen V..." };
      case 6:
        return { limit: 72, offset: 649, searchLabel: "Search Gen VI..." };
      case 7:
        return { limit: 88, offset: 721, searchLabel: "Search Gen VII..." };
      case 8:
        return { limit: 89, offset: 809, searchLabel: "Search Gen VIII..." };
      default:
        return { limit: 898, offset: 0, searchLabel: "Search All..." };
    }
  }

  // **** Main fetch function. Get list from /pokemon using limit and offset. Get details for fetched list by name. Create object and set pokemon state.
  const Query = getApiLimitAndOffset(Number(generation));
    const getPokemon = async () => {
      try {
        // get list of pokemon names
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${Query.limit}&offset=${Query.offset}`);
        let data = await res.data.results;      // get additional details from new endpoint
        data.forEach(async (p, idx) => {
          let details = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${p.name}`
          );
          let pkmn = details.data;
          setSearchLabel(Query.searchLabel);
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
        });
       
      } catch (err) {
        console.error(err);
        notificationCtx.displayMessage({
          title: 'Connection Error',
          message: err.message,
          status: 'error',
          requested: currentID
        });
        history('/error');
        
      }
    };

    const currentID = Number(id);
    if (currentID > 0 && currentID < 10) {
      console.log("valid generation")
      getPokemon();
    }else {
      console.log("bad generation");
      notificationCtx.displayMessage({
        title: 'Invalid generation.',
        message: `${currentID} is not a valid generation number. Please choose a number between 1 and 8.`,
        status: 'error',
        requested: currentID
      });
      history('/error');
    }
    
    console.log("getPokemon");
  }, [generation]);

  // **** set state to loaded after pokemon state is updated. Slight delay to allow for render
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    // window.localStorage.setItem("pokemon", JSON.stringify(pokemon));
    // console.log("Saving to local storage");
  }, [pokemon]);

  useEffect(() => {
  console.log("id changed")
  setGeneration(id)
  setIsLoaded(false)
  }, [id]);


  const pickRandomNumber = () => {
    console.log("in random");
    const randNumber = Math.floor(Math.random() * 898) + 1;
    console.log(randNumber);
    return randNumber;
  };

  

  return (
    <div className="DexContainer" >
      {isLoaded ? (
        <>
      <PokedexNav
        generation={generation}
        searchLabel={searchLabel}
        handleSearchChange={handleSearchChange}
        handleGetRandomPokemon={handleGetRandomPokemon}
        setIsLoaded={setIsLoaded}
      />
      
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
                      img={item.img}
                      imgAlt={item.imgAlt}
                      type={item.types[0].type.name}
                      type2={item.types[1] ? item.types[1].type.name : ""}
                      number={item.id}
                    />
                  </PokedexItemWrapperGrid>
                )
            )}
        </PokedexGrid>
        </>
      ) : (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
      )}
    </div>
  );
};

export default Pokedex;
