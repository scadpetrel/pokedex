import React, {useState, useEffect} from "react";
import Pokecard from "./Pokecard";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import './scss/Pokedex.scss'
import axios from "axios";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadMore, setLoadMore ] = useState(['https://pokeapi.co/api/v2/pokemon'])
  const [axiosPoke, setAxiosPoke] = useState([])

  const fetchPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    // console.log(data.results)

    function fetchDetails (result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();

        setPokemons(curState => [...curState, data]
        )
        
      })
      
      }
    
    fetchDetails(data.results)
    
  }

  useEffect(() => {
    console.log("useEffect again")
    // fetchPokemons()
    axiosPokemon()
  }, [])

  const handleLoadMore = () => {
    fetchPokemons()
  }
  // axios fetch from pokeapi.co
  const axiosPokemon = ()=> {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        // console.log(results)
        const newPokemonData = {}
        results.forEach((p, idx) => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`)
          .then(function (response) {
            const { data } = response;
            // console.log(data)
            setAxiosPoke(curState => [...curState, data])
          })
          newPokemonData[idx + 1] = {
            id: idx + 1,
            name: response.data.name,
            
          }
        }) 
        // setAxiosPoke(newPokemonData)
      })
  }

  // make first letter toUpperCase
  const changeToTitleCase = name => 
  name.charAt(0).toUpperCase() + name.slice(1);

  axiosPoke.map(el => (
    console.log(el.types[1])
  ))
  return(
    <>
    <AppBar position="fixed">
      <Toolbar>Pokedex</Toolbar>
    </AppBar>
    
    <Grid container spacing={3}>
    {axiosPoke.map(item => (
        <Pokecard key={item.id} name={item.name} img={item.sprites.other.dream_world.front_default} type={item.types[0].type.name} type2={item.types[1] ? item.types[1].type.name : '' }number={item.id}/>
        ))}
     
    </Grid>
    <div className="Pokedex">
    
     
    </div>
    <button onClick={handleLoadMore}>Load More</button>
    </>
  )
}

export default Pokedex;

