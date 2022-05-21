import React, {useState, useEffect} from "react";
import Pokecard from "./Pokecard";
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
  // axios fetch
  const axiosPokemon = ()=> {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
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
  axiosPoke.map(el => (
    console.log(el.types[1])
  ))
  return(
    <>
    <div className="Pokedex">
      {axiosPoke.map(item => (
        <Pokecard key={item.id} name={item.name} img={item.sprites.other.dream_world.front_default} type={item.types[0].type.name} type2={item.types[1] ? item.types[1].type.name : '' }number={item.id}/>
        ))}
    </div>
    <button onClick={handleLoadMore}>Load More</button>
    </>
  )
}

export default Pokedex;

